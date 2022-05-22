import { useAtom } from '@reatom/react';
import React from 'react';
import countdownTimerAtom from '../../store/atoms/countdownAtom';
import countdownSettingsAtom from '../../store/atoms/countDownSettingsAtom';
import TimeParser from '../../utils/TimeParser';

const Timer = () => {
    const timeParser = TimeParser.getParser();
    const {secondsLeft, pomodoroCount} = useAtom(countdownTimerAtom);
    const {pomodorosBeforeLongBreak} = useAtom(countdownSettingsAtom);
    const countPercentage = Math.floor(pomodoroCount / pomodorosBeforeLongBreak * 100)
    const gradientStyle = `conic-gradient(
        var(--white) 0%, 
        var(--white) ${countPercentage}%, 
        var(--faded) ${countPercentage}%, 
        var(--faded) 100%
    )`

    return (
        <div className="timer">
          {timeParser.getParsedSeconds(secondsLeft)}
          <div className="timer-circle" style={{background: gradientStyle} }></div>
        </div>
    );
};

export default Timer;