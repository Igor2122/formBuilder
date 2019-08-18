import React from 'react';

export interface IToastNotifications {
  message: string;
  success?: boolean;
  fail?: boolean;
}

const ToastNotifications: React.FC<IToastNotifications> = ({
  message,
  success
}) => {
  return (
    <div className={`toast ${success ? 'toast--success' : 'toast--fail'}`}>
      {message}
    </div>
  );
};

export default ToastNotifications;
