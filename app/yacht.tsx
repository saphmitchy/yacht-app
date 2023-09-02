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
    let e = d.map(x => x);
    e.sort();
    if (e[0] == e[1] && e[3] == e[4] && (e[1] == e[2] || e[2] == e[3])) {
        return d.reduce((a, b) => a + b);
    } else {
        return null;
    }
}

function fourOfAKind(d: Dice) {
    let e = d.map(x => x);
    e.sort();
    if (e[1] == e[2] && e[2] == e[3] && (e[0] == e[1] || e[3] == e[4])) {
        return d.reduce((a, b) => a + b);
    } else {
        return null;
    }
}

function smallStraight(d: Dice) {
    let e = d.map(x => x);
    e.sort();
    let a = 0;
    let b = 0;
    for (let i = 0; i < e.length - 1; i++) {
        if (e[i] == e[i + 1]) {
            a += 1;
        } else if (e[i] + 1 == e[i + 1]) {
            b += 1;
        }
    }
    if ((a == 1 && b == 3) || (a == 0 && b == 4)) {
        return 15;
    } else {
        return null;
    }
}

function largeStraight(d: Dice) {
    let e = d.map(x => x);
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
    { id: "ones", func: ones },
    { id: "twos", func: twos },
    { id: "threes", func: threes },
    { id: "fours", func: fours },
    { id: "fives", func: fives },
    { id: "sixes", func: sixes },
    { id: "choice", func: choice },
    { id: "fourOfAKind", func: fourOfAKind },
    { id: "fullHouse", func: fullHouse },
    { id: "smallStraight", func: smallStraight },
    { id: "largeStraight", func: largeStraight },
    { id: "yacht", func: yacht },
]
