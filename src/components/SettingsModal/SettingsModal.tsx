import { useAction } from '@reatom/react';
import React, { SyntheticEvent, useState } from 'react';
import { setTimerAction } from '../../store/atoms/countdownAtom';
import TimeParser from '../../utils/TimeParser';

const SettingsModal = () => {
    const timeParser = TimeParser.getParser();
    const [state, setState] = useState({
        timerCount: 0,
    })

    const setTimer = useAction(value => setTimerAction(value));

    const onChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        setState({...state, [event.target.name]: event.target.value})
    }

    const onSubmitHandler = (event: SyntheticEvent<HTMLFormElement>) => {
        event.preventDefault();

        const minutesInSeconds = timeParser.getMinutesinSeconds(state.timerCount);
        setTimer(minutesInSeconds);
    }

    return (
        <form onSubmit={onSubmitHandler}>
            <input 
                type="number" 
                name="timerCount" 
                value={state.timerCount} 
                onChange={onChangeHandler} 
                placeholder="Enter time in minutes"
            />
            <button>SET</button>
        </form>
    );
};

export default SettingsModal;