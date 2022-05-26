import { useAtom } from '@reatom/react';
import React, { createContext, useState } from 'react';
import ControlButtons from './components/ControlButtons/ControlButtons';
import SettingsModal from './components/SettingsModal/SettingsModal';
import Timer from './components/Timer/Timer';
import countdownAtom from './store/atoms/countdownAtom';
import './App.css';
import { countdownModalAtom } from './store/atoms/countdownModalAtom';

const App = () => {
  const {onBreak} = useAtom(countdownAtom);
  const isModalOpen = useAtom(countdownModalAtom);

  const red = "linear-gradient(90deg, #F78CA0 0%, #F9748F 20.31%, #FD868C 66.67%, #FE9A8B 100%)";
  const blue = "linear-gradient(180deg, #48C6EF 0%, #6F86D6 100%)";

  return (
    <React.Fragment>
        <div className='App' style={{background: onBreak ? blue : red}}>
          <div className="wrapper" style={{display: isModalOpen ? "none" : "flex"}}>
            <Timer/>
            <ControlButtons/>
          </div>
          <div className="wrapper" style={{display: isModalOpen ? "flex" : "none"}}>
            <SettingsModal/>
          </div>
        </div>    
    </React.Fragment>
  );
}

export default App;
