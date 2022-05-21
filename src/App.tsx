import React, {FC, useEffect, useState} from 'react';
import { useAction, useAtom } from '@reatom/react';
import countdownTimerAtom from './store/atoms/countdownAtom';
import { decrementTimerAction } from './store/actions/countdownActions';
import './App.css';

const App:FC = () => {
  const countDown = useAtom(countdownTimerAtom);  
  const decrement = useAction(decrementTimerAction);

  return (
      <div className='App'>
        {countDown}
      </div>    
  );
}

export default App;
