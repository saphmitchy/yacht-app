'use client'

import Image from 'next/image'
import { box } from './yacht'
import { YachtProvider, useYacht, useYachtDispatch } from './YachtContest'

export function Main() {
  return (
    <YachtProvider>
      <div className='flex justify-center p-10'>
        <DiceArea />
        <TableArea />
      </div>
    </YachtProvider>
  )
}

type ValueState = 'decided' | 'candidate' | 'disabled'

function TableCell({ label, value, state, clickHandler }:
  { label: string, value: string | number | null, state: ValueState, clickHandler: (() => void) | null }) {
  const valueColor = state != 'candidate' ? ' text-gray-900' : ' text-gray-400';
  const hover = state == 'candidate' ? ' hover:bg-yellow-200' : '';
  return (
    <button className={'flex border-t-2  border-zinc-800 first:border-t-0 text-right' + hover} key={label} disabled={state != 'candidate'} onClick={clickHandler ? clickHandler : () => { }}>
      <div className='basis-1/2 p-1 border-r-2 border-zinc-800'>{label}</div>
      <div className={'basis-1/2 p-1' + valueColor}>{state == 'disabled' ? '' : value}</div>
    </button>);
}

function TableArea() {
  const state = useYacht();
  const disptch = useYachtDispatch();
  const score = state.calc_score();
  const summery1 = state.points.map((x, i) => {
    const value = x == null ? state.get_score(i) : x;
    const s: ValueState = (x != null) ? 'decided' : (state.turn == 0) ? 'disabled' : 'candidate';
    return {
      name: box[i].id, value: value, state: s, handler: () => {
        disptch({ type: 'fill', id: i });
      }
    };
  });
  const summery2 = [
    ...summery1.slice(0, 6),
  { name: "Boanus", value: score.boanus, state: 'decided' as ValueState , handler: null },
  ...summery1.slice(6, 12),
  { name: "Total", value: score.total, state: 'decided' as ValueState, handler: null },
  ];
  const items = summery2.map((x) =>
    <TableCell label={x.name} value={x.value} state={x.state} key={x.name} clickHandler={x.handler} />
  );
  return (
    <div className='w-60 bg-yellow-100 rounded-lg grid grid-cols-1 grid-rows-15 text-gray-900 text-base text-right border-0 shadow-m border-2 border-black auto-rows-max'>
      <TableCell label="役" value="得点" state={'decided'} clickHandler={null} key={"hoge"} />
      {items}
    </div>
  )
}

function DiceArea() {
  const yacht = useYacht();
  return (
    <div className='w-90'>
      <div className='flex justify-between' key={"upper"}>
        <Dice n={yacht.dice[0].value} id={0} key={1} />
        <Dice n={yacht.dice[1].value} id={1} key={2} />
        <Dice n={yacht.dice[2].value} id={2} key={3} />
      </div>
      <div className='my-5 flex justify-center' key={"lower"} >
        <Dice n={yacht.dice[3].value} id={3} key={4} />
        <Dice n={yacht.dice[4].value} id={4} key={5} />
      </div>
      <ThrowButton />
    </div>
  )
}

function ThrowButton() {
  const yacht = useYacht();
  const dispatch = useYachtDispatch();
  const clickHandler = () => {
    dispatch({ type: 'throw' });
  }
  const isDisable = yacht.turn >= 3;
  const className = 'rounded-full p-10 mt-10 text-slate-800 shadow-md text-xl';
  const option = isDisable ? ' bg-gray-400' : ' bg-teal-400 hover:bg-teal-500 active:bg-teal-600'
  return (<div className='flex justify-around' key={"button"}>
    <button className={className + option}
      onClick={clickHandler}
      disabled={isDisable}>
      サイコロを投げる<br />(残り{3 - yacht.turn}回)
    </button>
  </div>)
}

function Dice({ n, id }: { n: number, id: number }) {
  const yacht = useYacht();
  const dispatch = useYachtDispatch();
  let diceName = "";
  switch (n) {
    case 1:
      diceName = "one";
      break;
    case 2:
      diceName = "two";
      break;
    case 3:
      diceName = "three";
      break;
    case 4:
      diceName = "four";
      break;
    case 5:
      diceName = "five";
      break;
    case 6:
      diceName = "six";
      break;
  }
  const fileName = "/" + diceName + ".svg";
  const alt = "dice of " + diceName;
  const isLocked = yacht.dice[id].locked;
  const isDisable = yacht.turn == 0 || yacht.turn == 3;
  const className = 'rounded-lg';
  const shadow = isLocked ? " shadow-all-locked" : " shadow-all-unlocked";
  const hover = isLocked ? " hover:shadow-allx-locked" : " hover:shadow-allx-unlocked";
  const clickHandler = () => {
    dispatch({ type: 'lock', id: id });
  }
  return (
    <div className='mx-5' key={id}>
      <button onClick={clickHandler} disabled={isDisable}>
        <Image className={className + shadow + (isDisable ? '' : hover)}
          src={fileName}
          alt={alt}
          width="100"
          height="100"
          unoptimized  />
      </button>
    </div>
  )
}