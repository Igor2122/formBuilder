import React from 'react';
import classNames from 'classnames';

export enum ButtonType {
  RegButton,
  InputSubmit
}

export interface IButton {
  value?: string;
  type: ButtonType;
  buttonRegular?: boolean;
  buttonSuccess?: boolean;
  buttonDanger?: boolean;
  generateForm?: () => void;
}

const Button: React.FC<IButton> = ({
  value,
  buttonRegular,
  generateForm,
  type,
  buttonSuccess,
  buttonDanger
}) => {
  const classPropMap = {
    button__regular: buttonRegular,
    'button__input-btn-success': buttonSuccess,
    'button__input-btn-danger': buttonDanger
  };

  const btnClass = classNames(`button`, classPropMap);

  return (
    <>
      {type === ButtonType.RegButton ? (
        <button className={btnClass} onClick={generateForm && generateForm}>
          {value}
        </button>
      ) : (
        <input className={btnClass} type="button" value={value} />
      )}
    </>
  );
};

export default Button;
