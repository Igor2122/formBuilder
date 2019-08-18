import React from 'react';
import { InputEvent } from '../../types/types';
import { ConfigValueType } from '../../containers/FromBuilder/FormBuilder';
import Button, { ButtonType } from '../Button/Button';

export interface IInputConfig {
  inputType: string;
  name: string;
  type: string;
  label: string;
  value?: string;
  rows?: number;
  cols?: number;
  accept?: string;
  isMultiple?: boolean;
  buttonSuccess?: boolean;
  buttonDanger?: boolean;
  getInputValues?: (value: ConfigValueType) => void;
}

const Input: React.FC<IInputConfig> = ({
  inputType,
  name,
  type,
  label,
  value,
  rows,
  cols,
  getInputValues,
  accept,
  isMultiple,
  buttonSuccess,
  buttonDanger
}) => {
  const generateInput = () => {
    switch (inputType) {
      case 'input':
        return (
          <input
            type={type}
            name={name}
            onChange={(e: InputEvent) =>
              getInputValues && getInputValues(e.target.value)
            }
            className={`form__input`}
          />
        );
      case 'textArea':
        return (
          <textarea
            rows={rows}
            cols={cols}
            name={name}
            onChange={(e: InputEvent) =>
              getInputValues && getInputValues(e.target.value)
            }
          />
        );
      case 'fileUpload':
        return (
          <input
            id={name}
            accept={accept}
            multiple={isMultiple}
            type="file"
            // onChange={handleFilesChange}
          />
        );
      case 'radioButton':
        return <input type="radio" name={name} value={value} />;
      case 'checkbox':
        return <input type="checkbox" name={name} value={value} />;
      case 'submitButton':
        return (
          <div className={`form--form-buttons`}>
            <Button
              buttonSuccess={buttonSuccess}
              buttonDanger={buttonDanger}
              type={ButtonType.InputSubmit}
              value={value}
            />
          </div>
        );
      default:
        break;
    }
  };

  return (
    <div className={`form__input-button-wrapper`}>
      {inputType !== 'submitButton' && <label htmlFor={name}>{label}</label>}
      {generateInput()}
    </div>
  );
};

export default Input;
