import { useAction } from '@reatom/react';
import React from 'react';
import { clearTimerAction, pauseTimerAction, resumeIntervalAction, startIntervalAction } from '../../store/atoms/countdownAtom';

const ControlButtons = () => {
    const start = useAction(startIntervalAction);
    const pause = useAction(pauseTimerAction);
    const clear = useAction(clearTimerAction);
    const resume = useAction(resumeIntervalAction);
    
    return (
        <div className="control-buttons">
            <button className='button' onClick={pause}>pause</button>
            <button className='button' onClick={start}>start</button>
            <button className='button' onClick={resume}>resume</button>
            <button className='button' onClick={clear}>clear</button>
        </div>
    );
};

export default ControlButtons;