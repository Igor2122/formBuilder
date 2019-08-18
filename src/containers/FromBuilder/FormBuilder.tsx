import React, { useState } from 'react';
import TabWrapper from '../../components/TabWrapper/TabWrapper';
import Tab from '../../components/Tab/Tab';
import FormComponent from '../../components/Form/Form';
import Input, { IInputConfig } from '../../components/Input/Input';
import Button, { ButtonType } from '../../components/Button/Button';
import ToastNotifications from '../../components/ToastNotifications/ToastNotifications';
var uniqid = require('uniqid');

export type ConfigValueType = string;

export interface IFormBuilderState {
  activeTab: string;
  showToast: boolean;
  formCreated: boolean;
  toastMessage: string;
  configValue: ConfigValueType;
  generatedFormFields: IInputConfig[];
}

const FormBuilder: React.FC = () => {
  const [state, setState] = useState<IFormBuilderState>({
    activeTab: 'formConfig',
    showToast: false,
    formCreated: false,
    toastMessage: '',
    configValue: '',
    generatedFormFields: []
  });

  const setActiveTab = (tabName: string) => {
    setState({ ...state, activeTab: tabName });
  };

  const getInputValues = (value: ConfigValueType) => {
    setState({
      ...state,
      configValue: value
    });
  };

  const generateForm = () => {
    try {
      const generatedFormValue = Object.values(JSON.parse(state.configValue));
      const mandatoryFields = ['inputType', 'name', 'type'];
      // TODO: fix the ignore
      //@ts-ignore
      const missingFormConfigs: string[] = generatedFormValue.reduce(
        (acc: any, val: any) => {
          const providedFields = Object.keys(val);
          const missingVal = mandatoryFields.filter(
            key => !providedFields.includes(key)
          );
          return acc.concat(missingVal);
        },
        [] as string[]
      );

      if (missingFormConfigs.length === 0) {
        setState({
          ...state,
          generatedFormFields: [
            ...state.generatedFormFields.concat(JSON.parse(state.configValue))
          ],
          showToast: true,
          formCreated: true,
          toastMessage: 'Form Created'
        });
      } else {
        setState({
          ...state,
          showToast: true,
          formCreated: false,
          toastMessage: `mandatory missing: ${missingFormConfigs
            .join(', ')
            .toString()}`
        });

        throw new Error('some mandatory form fields are missing');
      }
    } catch (e) {
      console.log(e.message);
    }
  };

  return (
    <div>
      {state.showToast && (
        <ToastNotifications
          success={state.formCreated}
          message={state.toastMessage}
        />
      )}

      <TabWrapper
        formState={state}
        setActiveTab={setActiveTab}
        getInputValues={getInputValues}
        children={
          <>
            <Tab
              active={state.activeTab}
              setActiveTab={setActiveTab}
              tabName={`formConfig`}
              children={
                <FormComponent
                  children={
                    <>
                      <Input
                        inputType="textArea"
                        name="formConfig"
                        type="text"
                        label="Paste config file"
                        getInputValues={getInputValues}
                        rows={30}
                      />
                      <Button
                        type={ButtonType.RegButton}
                        buttonRegular
                        value={`Build Form`}
                        generateForm={generateForm}
                      />
                    </>
                  }
                />
              }
            />
            <Tab
              active={state.activeTab}
              setActiveTab={setActiveTab}
              tabName={`generatedForm`}
              children={
                <FormComponent>
                  <>
                    {state.generatedFormFields.map(
                      formField =>
                        formField.inputType !== 'submitButton' && (
                          <Input
                            key={uniqid()}
                            inputType={formField.inputType}
                            name={formField.name}
                            type={formField.type}
                            label={formField.label}
                            value={formField.value}
                          />
                        )
                    )}
                    <div className={`form--form-buttons`}>
                      {state.generatedFormFields.map(
                        formField =>
                          formField.inputType === 'submitButton' && (
                            <Input
                              buttonSuccess={formField.type === 'success'}
                              buttonDanger={formField.type === 'danger'}
                              key={uniqid()}
                              inputType={formField.inputType}
                              name={formField.name}
                              type={formField.type}
                              label={formField.label}
                              value={formField.value}
                            />
                          )
                      )}
                    </div>
                  </>
                </FormComponent>
              }
            />
          </>
        }
      />
    </div>
  );
};

export default FormBuilder;
