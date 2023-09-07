export type Dice = Array<number>;

function count(d: Dice, n: number) {
    return d.filter(x => n == x).length;
}

function ones(d: Dice) {
    return count(d, 1);
}

function twos(d: Dice) {
    return count(d, 2) * 2;
}

function threes(d: Dice) {
    return count(d, 3) * 3;
}

function fours(d: Dice) {
    return count(d, 4) * 4;
}

function fives(d: Dice) {
    return count(d, 5) * 5;
}

function sixes(d: Dice) {
    return count(d, 6) * 6;
}

function fullHouse(d: Dice) {
    let e = [...d];
    e.sort();
    if (e[0] == e[1] && e[3] == e[4] && (e[1] == e[2] || e[2] == e[3])) {
        return d.reduce((a, b) => a + b);
    } else {
        return null;
    }
}

function fourOfAKind(d: Dice) {
    let e = [...d];
    e.sort();
    if (e[1] == e[2] && e[2] == e[3] && (e[0] == e[1] || e[3] == e[4])) {
        return d.reduce((a, b) => a + b);
    } else {
        return null;
    }
}

function smallStraight(d: Dice) {
    let e = [...d];
    e.sort();
    let a = 0;
    let b = 0;
    for (let i = 0; i < e.length - 1; i++) {
        if (e[i] + 1 == e[i + 1]) {
            a += 1;
        } else if (e[i] != e[i + 1]) {
            if(b < a) {
                b = a;
                a = 0;
            }
        }
    }
    if (3 <= a || 3 <= b) {
        return 15;
    } else {
        return null;
    }
}

function largeStraight(d: Dice) {
    let e = [...d];
    e.sort();
    if (e[0] + 1 == e[1] && e[1] + 1 == e[2] && e[2] + 1 == e[3] && e[3] + 1 == e[4]) {
        return 30;
    } else {
        return null;
    }
}

function yacht(d: Dice) {
    if (d[0] == d[1] && d[1] == d[2] && d[2] == d[3] && d[3] == d[4]) {
        return 50;
    } else {
        return null;
    }
}

function choice(d: Dice) {
    return d.reduce((a, b) => a + b);
}

export const box = [
    { id: "Ones", func: ones },
    { id: "Twos", func: twos },
    { id: "Threes", func: threes },
    { id: "Fours", func: fours },
    { id: "Fives", func: fives },
    { id: "Sixes", func: sixes },
    { id: "Choice", func: choice },
    { id: "Four of a Kind", func: fourOfAKind },
    { id: "Full House", func: fullHouse },
    { id: "Small Straight", func: smallStraight },
    { id: "Large Straight", func: largeStraight },
    { id: "Yacht", func: yacht },
]

function init_dice() {
    const dice = new Array(5);
    for (let i = 0; i < dice.length; i++) {
        dice[i] = { value: 1, locked: false };
    }
    return dice;
}

export class Yacht {
    public readonly dice: {
        value: number,
        locked: boolean,
    }[];
    public readonly points: Array<number | null>;
    public readonly turn: number;

    constructor() {
        this.dice = init_dice();
        this.points = new Array(box.length);
        this.turn = 0;
        this.points.fill(null);
    }

    get_round(): number {
        return this.points.map<number>(x => (x == null) ? 0 : 1).reduce((a, b) => a + b);
    }

    throw_dice() {
        if (this.get_round() == this.points.length ||
            !this.dice.some(x => !x.locked)) {
            return null;
        }
        let res: Yacht = Object.assign(
            Object.create(Yacht.prototype),
            this,
            {
                dice: [...this.dice],
                turn: this.turn + 1,
            }
        );
        for (let i = 0; i < this.dice.length; i++) {
            const nextValue = res.dice[i].locked ? res.dice[i].value : Math.floor(Math.random() * 6) + 1;
            res.dice[i] = {
                value: nextValue,
                locked: true,
            }
        }
        return res;
    }

    lock_dice(index: number): Yacht {
        let dice = [...this.dice];
        dice[index] = {
            ...this.dice[index],
            locked: true,
        }
        return Object.assign(
            Object.create(Yacht.prototype),
            this,
            {
                dice,
            }
        );
    }

    unlock_dice(index: number): Yacht {
        let dice = [...this.dice];
        dice[index] = {
            ...this.dice[index],
            locked: false,
        }
        return Object.assign(
            Object.create(Yacht.prototype),
            this,
            {
                dice,
            }
        )
    }

    get_score(index: number): number {
        const res = box[index].func(this.dice.map(x => x.value));
        return res == null ? 0 : res;
    }

    fill_box(index: number): Yacht | null {
        if (this.points[index] != null) {
            return null;
        }
        let res: Yacht = Object.assign(
            Object.create(Yacht.prototype),
            this,
            {
                dice: init_dice(),
                points: [...this.points],
                turn: 0,
            });
        res.points[index] = this.get_score(index);
        return res;
    }

    calc_score() {
        const f = (a: number | null, b: number | null) => (a == null ? 0 : a) + (b == null ? 0 : b);
        const upper = this.points.slice(0, 6).reduce(f)!;
        const lower = this.points.slice(6, 12).reduce(f)!;
        const boanus = (upper >= 63) ? 35 : 0;
        return {
            upper,
            lower,
            boanus,
            total: upper + lower + boanus,
        }
    }

    is_end(): boolean {
        return this.get_round() == box.length;
    }
}
