import { useAction, useAtom } from '@reatom/react';
import React, { useEffect } from 'react';
import { initTimerAction, startIntervalAction, pauseTimerAction, clearTimerAction } from './store/atoms/countdownAtom';
import SettingsModal from './components/SettingsModal/SettingsModal';
import countdownTimerAtom from './store/atoms/countdownAtom';
import TimeParser from './utils/TimeParser';
import './App.css';

const App = () => {
  const timeParser = TimeParser.getParser();
  const {secondsLeft, onBreak} = useAtom(countdownTimerAtom);
  const initTimer = useAction(initTimerAction)
  const start = useAction(startIntervalAction);
  const pause = useAction(pauseTimerAction);
  const clear = useAction(clearTimerAction)

  useEffect(() => {
    initTimer();
  }, [])

  return (
    <React.Fragment>
      <div className='App' style={{background: onBreak ? "lightblue" : "pink"}}>
        {timeParser.getParsedSeconds(secondsLeft)}
        <button onClick={pause}>pause</button>
        <button onClick={start}>start</button>
        <button onClick={clear}>clear</button>
        <SettingsModal/>
      </div>    
    </React.Fragment>
  );
}

export default App;
