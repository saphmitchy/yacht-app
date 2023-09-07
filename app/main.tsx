'use client'

import Image from 'next/image'
import { box } from './yacht'
import { YachtProvider, useYacht, useYachtDispatch } from './YachtContest'

export function Main() {
  return (
    <div className='text-gray-800'>
      <h1 className='text-center p-5 text-6xl'>Yacht Game</h1>
      <YachtProvider>
        <Messages/>
        <div className='flex justify-center p-10 flex-col sm:flex-row'>
          <DiceArea />
          <TableArea />
        </div>
      </YachtProvider>
    </div>
  )
}

function Messages() {
  const yacht = useYacht();
  const className = 'text-center text-3xl h-10';
  if(yacht.is_end()) {
    return <p className={className} >You get <b className='text-red-500'>{yacht.calc_score().total}</b> points🎉</p>;
  } else if(yacht.turn == 3) {
    return <p className={className}>Select hands!</p>;
  } else if(yacht.turn == 0) {
    return <p className={className}>Throw the Dice!</p>;
  } else {
    return <p className={className}>Select hands, or select dices and throw again</p>;
  }
}

type ValueState = 'decided' | 'candidate' | 'disabled'

function TableCell({ label, value, state, clickHandler }:
  { label: string, value: string | number | null, state: ValueState, clickHandler: (() => void) | null }) {
  const valueColor = state != 'candidate' ? ' text-gray-900' : ' text-gray-400';
  const first = ' first:border-t-0 first:font-bold first:bg-yellow-300';
  const last = ' last:border-t-4'
  const hover = state == 'candidate' ? ' hover:bg-yellow-200' : '';
  return (
    <button className={'flex border-t-2 border-zinc-700 text-right' + hover + first + last} key={label} disabled={state != 'candidate'} onClick={clickHandler ? clickHandler : () => { }}>
      <div className='basis-1/2 p-1 border-r-2 border-zinc-700'>{label}</div>
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
    { name: "Boanus", value: score.boanus, state: 'decided' as ValueState, handler: null },
    ...summery1.slice(6, 12),
    { name: "Total", value: score.total, state: 'decided' as ValueState, handler: null },
  ];
  const items = summery2.map((x) =>
    <TableCell label={x.name} value={x.value} state={x.state} key={x.name} clickHandler={x.handler} />
  );
  return (
    <div className='w-60 bg-yellow-100 rounded grid grid-cols-1 grid-rows-15 text-gray-900 text-base text-right border-0 shadow-m border-2 border-zinc-700 auto-rows-max m-auto sm:mx-0'>
      <TableCell label="Hands" value="Points" state={'decided'} clickHandler={null} key={"hoge"} />
      {items}
    </div>
  )
}

function DiceArea() {
  const yacht = useYacht();
  return (
    <div className='flex flex-col'>
      <div className='flex justify-between' key={"upper"}>
        <Dice n={yacht.dice[0].value} id={0} key={1} />
        <Dice n={yacht.dice[1].value} id={1} key={2} />
        <Dice n={yacht.dice[2].value} id={2} key={3} />
      </div>
      <div className='flex justify-center' key={"lower"} >
        <Dice n={yacht.dice[3].value} id={3} key={4} />
        <Dice n={yacht.dice[4].value} id={4} key={5} />
      </div>
      <Buttons />
    </div>
  )
}

function Buttons() {
  return (<div className='py-10 flex justify-around' key={"button"}>
    <ResetButton />
    <ThrowButton />
  </div>)
}

function ResetButton() {
  const dispatch = useYachtDispatch();
  const className = 'rounded-full p-7 shadow-md text-lg h-min mt-auto';
  const clickHandler = () => {
    dispatch({ type: 'reset' });
  }
  const option = ' bg-cyan-400 hover:bg-cyan-500 active:bg-cyan-600'
  return (
    <button className={className + option}
      onClick={clickHandler}>
      Reset
    </button>)
}

function ThrowButton() {
  const yacht = useYacht();
  const dispatch = useYachtDispatch();
  const className = 'rounded-full p-10 shadow-md text-xl';
  const clickHandler = () => {
    dispatch({ type: 'throw' });
  }
  const isDisable = yacht.turn >= 3 || !yacht.dice.some(x => !x.locked);
  const option = isDisable ? ' bg-gray-400' : ' bg-teal-400 hover:bg-teal-500 active:bg-teal-600'
  return (
    <button className={className + option}
      onClick={clickHandler}
      disabled={isDisable}>
      Throw dices<br />(remain {3 - yacht.turn} times)
    </button>)
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
  const fileName = "./" + diceName + ".svg";
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
    <div className='basis-1/3 shrink-0 grow-0 px-5 py-2' key={id}>
      <button className={className + shadow + (isDisable ? '' : hover)} onClick={clickHandler} disabled={isDisable}>
        <Image className={className}
          src={fileName}
          alt={alt}
          width="100"
          height="100"
          priority={true} />
      </button>
    </div>
  )
}