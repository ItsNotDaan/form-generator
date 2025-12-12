import React, {memo} from 'react';
import ReactSelect, {
  StylesConfig,
  GroupBase,
  SingleValue,
  MultiValue,
} from 'react-select';
import CreatableSelect from 'react-select/creatable';

export interface SelectOption {
  label: string;
  value: string;
}

interface SelectProps {
  options: SelectOption[];
  value?: SelectOption | SelectOption[] | null;
  onChange?: (value: SingleValue<SelectOption> | MultiValue<SelectOption>) => void;
  placeholder?: string;
  isMulti?: boolean;
  isCreatable?: boolean;
  isDisabled?: boolean;
  isClearable?: boolean;
  className?: string;
  error?: boolean;
}

export const Select = memo<SelectProps>(
  ({
    options,
    value,
    onChange,
    placeholder,
    isMulti = false,
    isCreatable = false,
    isDisabled = false,
    isClearable = true,
    className = '',
    error = false,
  }) => {
    const customStyles: StylesConfig<SelectOption, boolean, GroupBase<SelectOption>> = {
      control: (base, state) => ({
        ...base,
        minHeight: '38px',
        borderColor: error
          ? '#F56565'
          : state.isFocused
          ? '#3D7014'
          : '#DCE7F6',
        boxShadow: state.isFocused
          ? error
            ? '0 0 0 1px #F56565'
            : '0 0 0 1px #3D7014'
          : 'none',
        '&:hover': {
          borderColor: error ? '#F56565' : '#3D7014',
        },
        borderRadius: '6px',
        fontSize: '14px',
      }),
      option: (base, state) => ({
        ...base,
        backgroundColor: state.isSelected
          ? '#3D7014'
          : state.isFocused
          ? '#EFF4FA'
          : 'white',
        color: state.isSelected ? 'white' : '#092253',
        '&:active': {
          backgroundColor: '#3c7014',
        },
        fontSize: '14px',
      }),
      menu: base => ({
        ...base,
        borderRadius: '6px',
        boxShadow: '0px 4px 16px rgba(0, 0, 0, 0.15)',
        border: '1px solid #DCE7F6',
        fontSize: '14px',
      }),
      placeholder: base => ({
        ...base,
        color: '#95ABCC',
        fontSize: '14px',
      }),
      singleValue: base => ({
        ...base,
        color: '#092253',
        fontSize: '14px',
      }),
      multiValue: base => ({
        ...base,
        backgroundColor: '#EFF4FA',
        borderRadius: '4px',
      }),
      multiValueLabel: base => ({
        ...base,
        color: '#092253',
        fontSize: '14px',
      }),
      multiValueRemove: base => ({
        ...base,
        color: '#627BA6',
        '&:hover': {
          backgroundColor: '#DCE7F6',
          color: '#224077',
        },
      }),
    };

    const SelectComponent = isCreatable ? CreatableSelect : ReactSelect;

    return (
      <SelectComponent
        options={options}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        isMulti={isMulti}
        isDisabled={isDisabled}
        isClearable={isClearable}
        className={className}
        styles={customStyles}
        classNamePrefix="react-select"
      />
    );
  }
);

Select.displayName = 'Select';
