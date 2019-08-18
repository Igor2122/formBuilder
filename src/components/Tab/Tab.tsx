import React, { ReactChild } from 'react';

export interface ITabProps {
  tabName: string;
  active: string;
  setActiveTab: (tagName: string) => void;
  children: ReactChild;
}

const Tab: React.FC<ITabProps> = ({
  active,
  setActiveTab,
  tabName,
  children
}) => {
  return (
    <>
      <button
        className={`tabs--label ${
          active === tabName ? '' : 'tabs__not-active'
        }`}
        onClick={() => setActiveTab(tabName)}
      >
        {tabName}
      </button>
      <div
        className={`tab  ${
          active === tabName ? 'tab__active' : 'tab__not-active'
        } `}
      >
        <h1>{tabName}</h1>
        {children}
      </div>
    </>
  );
};

export default Tab;
