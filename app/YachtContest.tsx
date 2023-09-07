import { Dispatch, createContext, useContext, useReducer } from 'react';
import { Yacht } from './yacht';

const YachtContext = createContext<Yacht | null>(null);
const YachtDispatchContext = createContext<Dispatch<YachtAction> | null>(null);

type YachtAction = { type: 'throw' } | { type: 'lock', id: number } | { type: 'fill', id: number } | { type: 'reset' };

export function YachtProvider({ children }: { children: JSX.Element }) {
  const [yacht, dispatch] = useReducer(
    yachtReducer,
    new Yacht()
  );

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
  }
}