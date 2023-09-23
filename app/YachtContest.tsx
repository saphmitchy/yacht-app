'use client'

import { Dispatch, createContext, useContext, useEffect, useReducer } from 'react';
import { Yacht } from './yacht';

const YachtContext = createContext<Yacht | null>(null);
const YachtDispatchContext = createContext<Dispatch<YachtAction> | null>(null);
const yacht_key = 'yacht';

type YachtAction = { type: 'throw' } | { type: 'lock', id: number } | { type: 'fill', id: number } | { type: 'reset' } | { type: 'set', content: Yacht };

function get_yacht_from_storage() {
  const storage = window.localStorage.getItem(yacht_key);
  if (storage === null) {
    return new Yacht();
  }
  try {
    const res = Object.assign(
      new Yacht(),
      JSON.parse(storage));
    return res;
  } catch {
    return new Yacht();
  }
}

export function YachtProvider({ children }: { children: JSX.Element[] }) {
  const [yacht, dispatch] = useReducer(
    yachtReducer,
    Yacht.gen_server_yacht()
  );

  useEffect(() => {
    if (yacht.state == 'loading') {
      let content = get_yacht_from_storage();
      if (content.state == 'loading') {
        content = new Yacht();
      }
      dispatch({
        type: 'set',
        content
      });
      window.localStorage.setItem(yacht_key, JSON.stringify(content));
    } else {
      window.localStorage.setItem(yacht_key, JSON.stringify(yacht));
    }
  }, [yacht])

  return (
    <YachtContext.Provider value={yacht}>
      <YachtDispatchContext.Provider value={dispatch}>
        {children}
      </YachtDispatchContext.Provider>
    </YachtContext.Provider>
  )
}

export function useYacht() {
  return useContext(YachtContext)!;
}

export function useYachtDispatch() {
  return useContext(YachtDispatchContext)!;
}

function yachtReducer(yacht: Yacht, action: YachtAction) {
  switch (action.type) {
    case 'throw': {
      const res = yacht.throw_dice();
      if (res) {
        return res;
      } else {
        return yacht;
      }
    }
    case 'lock': {
      const isLocked = yacht.dice[action.id].locked;
      if (isLocked) {
        return yacht.unlock_dice(action.id);
      } else {
        return yacht.lock_dice(action.id);
      }
    }
    case 'fill': {
      const res = yacht.fill_box(action.id);
      if (res) {
        return res;
      } else {
        return yacht;
      }
    }
    case 'reset': {
      const res = new Yacht();
      return res;
    }
    case 'set': {
      return action.content;
    }
  }
}