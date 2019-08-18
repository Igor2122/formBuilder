import React from 'react';
import { ReactNodeType } from '../../types/types';

export interface IForm {
  children: ReactNodeType;
}

const FormComponent: React.FC = ({ children }) => {
  return (
    <form onSubmit={e => e.preventDefault()} className={`form`}>
      {children}
    </form>
  );
};

export default FormComponent;
