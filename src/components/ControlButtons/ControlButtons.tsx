import { useAction, useAtom } from '@reatom/react';
import React from 'react';
import { clearTimer, pauseTimer, resumeTimer, startTimer } from '../../store/actions/countdownActions';
import { openModalAction } from '../../store/actions/countdownModalActions';
import { couuntDownStatusAtom, TIMER_STATUS } from '../../store/atoms/countDownStatusAtom';

const useButtons = () => {
    const status = useAtom(couuntDownStatusAtom);
    const openModal = useAction(openModalAction);
    const pause = useAction(pauseTimer);
    const clear = useAction(clearTimer);
    const resume = useAction(resumeTimer);

    if (status === TIMER_STATUS.STOPPED) {
        return (
            <button className='button' onClick={openModal}>start</button>
        )
    } else if (status === TIMER_STATUS.STARTED) {
        return (
            <button className='button' onClick={pause}>pause</button>
        )
    } else {
        return (
            <React.Fragment>
                <button className='button' onClick={resume}>resume</button>
                <button className='button' onClick={clear}>clear</button>
            </React.Fragment>
        )
    }
}

const ControlButtons = () => {
    const buttons = useButtons();
    
    return (
        <div className="control-buttons">
            {buttons}
        </div>
    );
};

export default ControlButtons;