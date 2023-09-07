import { test, expect } from "@jest/globals";
import { Yacht, box } from "../app/yacht";

test("ones", () => {
    const f = box[0].func;
    expect(f([1, 2, 4, 3, 1])).toBe(2);
    expect(f([1, 1, 1, 1, 1])).toBe(5);
    expect(f([3, 5, 4, 6, 2])).toBe(0);
})

test("twos", () => {
    const f = box[1].func;
    expect(f([1, 2, 4, 2, 1])).toBe(4);
    expect(f([2, 2, 2, 2, 2])).toBe(10);
    expect(f([3, 5, 4, 4, 1])).toBe(0);
})

test("threes", () => {
    const f = box[2].func;
    expect(f([1, 2, 3, 2, 3])).toBe(6);
    expect(f([3, 3, 3, 3, 3])).toBe(15);
    expect(f([2, 5, 6, 4, 1])).toBe(0);
})

test("fours", () => {
    const f = box[3].func;
    expect(f([2, 4, 3, 2, 4])).toBe(8);
    expect(f([4, 4, 4, 4, 4])).toBe(20);
    expect(f([5, 5, 6, 2, 1])).toBe(0);
})

test("fives", () => {
    const f = box[4].func;
    expect(f([1, 5, 6, 5, 4])).toBe(10);
    expect(f([5, 5, 5, 5, 5])).toBe(25);
    expect(f([3, 2, 6, 2, 1])).toBe(0);
})

test("sixes", () => {
    const f = box[5].func;
    expect(f([2, 6, 6, 5, 4])).toBe(12);
    expect(f([6, 6, 6, 6, 6])).toBe(30);
    expect(f([4, 2, 5, 2, 1])).toBe(0);
})

test("choice", () => {
    const f = box[6].func;
    expect(f([4, 5, 1, 4, 3])).toBe(17);
    expect(f([5, 2, 2, 4, 6])).toBe(19);
})

test("fourOfAKind", () => {
    const f = box[7].func;
    expect(f([5, 4, 5, 5, 5])).toBe(24);
    expect(f([1, 1, 2, 1, 1])).toBe(6);
    expect(f([1, 1, 1, 1, 1])).toBe(5);
    expect(f([2, 1, 2, 1, 1])).toBeNull();
    expect(f([2, 1, 2, 3, 3])).toBeNull();
})

test("fullHouse", () => {
    const f = box[8].func;
    expect(f([5, 4, 5, 5, 4])).toBe(23);
    expect(f([1, 1, 4, 1, 4])).toBe(11);
    expect(f([1, 1, 4, 1, 1])).toBeNull();
    expect(f([1, 1, 1, 1, 1])).toBe(5);
    expect(f([1, 2, 2, 3, 1])).toBeNull();
})

test("smallStraight", () => {
    const f = box[9].func;;
    expect(f([5, 4, 3, 2, 4])).toBe(15);
    expect(f([1, 3, 4, 2, 4])).toBe(15);
    expect(f([5, 4, 2, 3, 6])).toBe(15);
    expect(f([2, 3, 1, 4, 6])).toBe(15);
    expect(f([6, 1, 3, 2, 5])).toBeNull();
    expect(f([1, 2, 2, 5, 6])).toBeNull();
})

test("largeStraight", () => {
    const f = box[10].func;;
    expect(f([5, 1, 3, 2, 4])).toBe(30);
    expect(f([5, 4, 2, 3, 6])).toBe(30);
    expect(f([1, 3, 4, 2, 4])).toBeNull();
    expect(f([6, 1, 3, 2, 5])).toBeNull();
    expect(f([1, 2, 2, 5, 6])).toBeNull();
})

test("yacht", () => {
    const f = box[11].func;;
    expect(f([4, 4, 4, 4, 4])).toBe(50);
    expect(f([1, 1, 1, 1, 1])).toBe(50);
    expect(f([4, 3, 4, 4, 4])).toBeNull();
    expect(f([1, 1, 3, 2, 5])).toBeNull();
    expect(f([1, 2, 3, 5, 6])).toBeNull();
})

test("get_round", () => {
    let y = new Yacht();
    expect(y.get_round()).toBe(0);
    y.points[0] = 4;
    y.points[11] = 4;
    expect(y.get_round()).toBe(2);
})

test("throw_dice", () => {
    const y = new Yacht();
    let z = y.throw_dice()!;
    expect(z.turn).toBe(1);
    expect(z.points === y.points).toBe(true);
    expect(z.dice === y.dice).toBe(false);
    z = z.unlock_dice(0);
    z = z.throw_dice()!;
    expect(z.turn).toBe(2);
    z = z.unlock_dice(0);
    z = z.throw_dice()!;
    expect(z.turn).toBe(3);
})

test("lock_dice", () => {
    const y = new Yacht();
    const z = y.lock_dice(2);
    expect(z.dice[2].locked).toBe(true);
    expect(z.points === y.points).toBe(true);
    expect(z.dice === y.dice).toBe(false);
    expect(z.turn === y.turn).toBe(true);
})

test("fill_box", () => {
    const y = new Yacht();
    y.turn = 2;
    const z = y.fill_box(0)!;
    expect(z.points === y.points).toBe(false);
    expect(z.turn === y.turn).toBe(false);
    expect(z.points[0]).toBe(5);
    expect(z.fill_box(0)).toBeNull();
})
