import { useAction } from '@reatom/react';
import React from 'react';
import { clearTimer, pauseTimer, resumeTimer, startTimer } from '../../store/actions/countdownActions';

const ControlButtons = () => {
    const start = useAction(startTimer)
    const pause = useAction(pauseTimer);
    const clear = useAction(clearTimer);
    const resume = useAction(resumeTimer);
    
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