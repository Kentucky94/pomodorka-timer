import { useAction, useAtom } from '@reatom/react';
import React, { SyntheticEvent, useState } from 'react';
import { setLongBreakLength, setPomodoroLength, setPomodorosBeforeLongBreak, setShortBreakLength } from '../../store/actions/countdownSettingsActions';
import { setTimerAction } from '../../store/atoms/countdownAtom';
import countdownSettingsAtom from '../../store/atoms/countDownSettingsAtom';
import TimeParser from '../../utils/TimeParser';
import SettingsModalInput from './SettingsModalInput';

const SettingsModal = () => {
    const timeParser = TimeParser.getParser();

    const {
        pomodoroLength, 
        shortBreakLength, 
        longBreakLength, 
        pomodorosBeforeLongBreak
    } = useAtom(countdownSettingsAtom);

    type FormStateType = {
        inputPomodoroLength: number,
        inputShortBreakLength: number,
        inputLongBreakLength: number,
        inputPomodoroBeforeLongBreak: number,
    }

    const [state, setState] = useState<FormStateType>({
        inputPomodoroLength: timeParser.getSecondsInMinutes(pomodoroLength),
        inputShortBreakLength: timeParser.getSecondsInMinutes(shortBreakLength),
        inputLongBreakLength: timeParser.getSecondsInMinutes(longBreakLength),
        inputPomodoroBeforeLongBreak: pomodorosBeforeLongBreak,
    })

    const submitPomodoroLength = useAction(value => 
        setPomodoroLength(value ? timeParser.getMinutesinSeconds(parseInt(value)) : 0)
    )
    const submitShortBreakLength = useAction(value => 
        setShortBreakLength(value ? timeParser.getMinutesinSeconds(parseInt(value)) : 0)
    )
    const submitLongBreakLength = useAction(value => 
        setLongBreakLength(value ? timeParser.getMinutesinSeconds(parseInt(value)) : 0)
    )
    const submitPomodoroBeforeLongBreak = useAction(value => 
        setPomodorosBeforeLongBreak(value ? (parseInt(value)) : 0)
    )

    const setTimer = useAction(value => setTimerAction(value));

    const onChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        setState({...state, [event.target.name]: event.target.value || 0})
    }

    const onSubmitHandler = (event: SyntheticEvent<HTMLFormElement>) => {
        event.preventDefault();

        submitPomodoroLength(state.inputPomodoroLength);
        submitShortBreakLength(state.inputShortBreakLength);
        submitLongBreakLength(state.inputLongBreakLength);
        submitPomodoroBeforeLongBreak(state.inputPomodoroBeforeLongBreak);

        setTimer(timeParser.getMinutesinSeconds(state.inputPomodoroLength));
    }

    const inputsData: {label: string, name: keyof FormStateType}[] = [
        {
            label: "Pomodoro",
            name: "inputPomodoroLength"
        },
        {
            label: "Short Break",
            name: "inputShortBreakLength"
        },
        {
            label: "Long Break",
            name: "inputLongBreakLength"
        },
        {
            label: "Number of pomodoro between break",
            name: "inputPomodoroBeforeLongBreak"
        },
    ]

    return (
        <form className="settings-form" onSubmit={onSubmitHandler}>
            {inputsData.map(data => (
                <SettingsModalInput 
                    key={data.label}
                    label={data.label}
                    name={data.name}
                    value={state[data.name]}
                    onChangeHandler={onChangeHandler}
                />   
            ))}
            <div className="settings-form_buttons">
                <button className='button' type="submit">Save</button>
                <button className='button' type="button">Close</button>
            </div>
        </form>
    );
};

export default SettingsModal;