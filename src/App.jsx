import { useAction, useAtom } from '@reatom/react';
import React, { useEffect } from 'react';
import ControlButtons from './components/Buttons/ControlButtons';
import SettingsModal from './components/SettingsModal/SettingsModal';
import countdownTimerAtom, { initTimerAction } from './store/atoms/countdownAtom';
import Timer from './components/Timer/Timer';
import './App.css';

const App = () => {
  const {onBreak} = useAtom(countdownTimerAtom);
  const initTimer = useAction(initTimerAction);

  useEffect(() => {
    initTimer();
  }, [])

  const red = "linear-gradient(90deg, #F78CA0 0%, #F9748F 20.31%, #FD868C 66.67%, #FE9A8B 100%)";
  const blue = "linear-gradient(180deg, #48C6EF 0%, #6F86D6 100%)";

  return (
    <React.Fragment>
      <div className='App' style={{background: onBreak ? blue : red}}>
        <Timer />
        <ControlButtons/>
        <SettingsModal/>
      </div>    
    </React.Fragment>
  );
}

export default App;
