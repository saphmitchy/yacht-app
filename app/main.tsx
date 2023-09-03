'use client'

import Image from 'next/image'
import { YachtContext } from './YachtContest'
import { useContext } from 'react'
import { Yacht, box } from './yacht'

export function Main() {
  return (
    <div className='flex justify-center p-10'>
      <DiceArea />
      <TableArea />
    </div>
  )
}

function TableArea() {
  const state = useContext(YachtContext);
  const score = state.calc_score();
  let summery = state.points.map((x, i) => { return {name: box[i].id, value: x}; });
  summery = [...summery.slice(0, 6),
  { name: "Boanus", value: score.boanus },
  ...summery.slice(6, 12),
  { name: "Total", value: score.total },
  ];
  const items = summery.map((x, id) =>
    <>
      <div className='p-1 border-r-2 border-t-2 border-zinc-800' key={id * 2}>{x.name}</div>
      <div className='p-1 border-t-2 border-zinc-800' key={id * 2 + 1}>{x.value ? x.value : 0}</div>
    </>
  );
  return (
    <div className='bg-yellow-100 rounded-lg grid grid-cols-2 grid-rows-15 text-gray-900 text-base text-right border-0 shadow-md'>
      <div className='p-1 b-1 border-r-2 border-zinc-800'>役</div>
      <div className='p-1'>得点</div>
      {items}
    </div>
  )
}

function DiceArea() {
  return (
    <div className='w-90'>
      <div className='flex justify-between'>
        <Dice n={1} />
        <Dice n={1} />
        <Dice n={1} />
      </div>
      <div className='flex justify-around'>
        <Dice n={1} />
        <Dice n={1} />
      </div>
      <div className='flex justify-around'>
        <button className='rounded-full p-10 mt-10 text-slate-800 bg-teal-400 shadow-md text-xl'>サイコロを投げる</button>
      </div>
    </div>
  )
}

function Dice({ n }: { n: number }) {
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
  return (
    <div className='mx-5'>
      <button onClick={() => console.log("clicked!")}>
        <Image className='rounded-lg shadow-md'
          src={fileName}
          alt={alt}
          width="100"
          height="100" />
      </button>
    </div>
  )
}