import React from 'react';
import { ReactNodeType } from '../../types/types';
import {
  IFormBuilderState,
  ConfigValueType
} from '../../containers/FromBuilder/FormBuilder';

export interface ITabState {
  formState: IFormBuilderState;
  children: ReactNodeType;
  setActiveTab?: (tabName: string) => void;
  getInputValues?: (value: ConfigValueType) => void;
}

const TabWrapper: React.FC<ITabState> = ({ formState, children }) => {
  return <div className={`tabs`}>{children}</div>;
};

export default TabWrapper;
