import React from 'react';

type SettingsModalInputType = {
    key: string,
    label: string, 
    name: string, 
    value: number, 
    onChangeHandler: (event: React.ChangeEvent<HTMLInputElement>) => void
}

const SettingsModalInput = ({label, name, value, onChangeHandler}: SettingsModalInputType) => {
    return (
        <label className="settings-form__input-label">
            <span className="settings-form__input-label-name">{label}</span>
            <input
                className="settings-form__input" 
                type="number" 
                name={name}
                value={value} 
                onChange={onChangeHandler} 
            />
        </label>
    );
};

export default SettingsModalInput;