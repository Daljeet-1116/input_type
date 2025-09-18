import React, { useState, useEffect } from 'react';
import type { InputFieldProps } from './InputField.types';

const variantStyles = {
  filled: 'bg-gray-100 border border-gray-300 focus:border-blue-500',
  outlined: 'bg-white border border-gray-400 focus:border-blue-600',
  ghost: 'bg-transparent border-b border-gray-300 focus:border-blue-500 rounded-none',
};

const sizeStyles = {
  sm: 'text-sm py-1 px-2',
  md: 'text-base py-2 px-3',
  lg: 'text-lg py-3 px-4',
};

const themeStyles = {
  light: '',
  dark: 'bg-gray-800 text-gray-200 placeholder-gray-400',
};

export const InputField: React.FC<InputFieldProps> = ({
  value = '',
  onChange,
  label,
  placeholder,
  helperText,
  errorMessage,
  disabled = false,
  invalid = false,
  variant = 'outlined',
  size = 'md',
  showClearButton = false,
  passwordToggle = false,
  theme = 'light',
}) => {
  const [inputType, setInputType] = useState(passwordToggle ? 'password' : 'text');
  const [internalValue, setInternalValue] = useState(value);

  useEffect(() => {
    setInternalValue(value || '');
  }, [value]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInternalValue(e.target.value);
    if (onChange) onChange(e);
  };

  const clearInput = () => {
    setInternalValue('');
    if (onChange) onChange({ target: { value: '' } } as React.ChangeEvent<HTMLInputElement>);
  };

  const togglePasswordVisibility = () => {
    setInputType(inputType === 'password' ? 'text' : 'password');
  };

  const inputClasses = `
    ${variantStyles[variant]} 
    ${sizeStyles[size]} 
    ${disabled ? 'cursor-not-allowed opacity-50' : 'focus:outline-none'} 
    ${invalid ? 'border-red-500 focus:border-red-600' : ''}
    ${themeStyles[theme]}
    rounded-md
    transition
    w-full
  `;

  return (
    <div className={`flex flex-col mb-4 font-sans ${theme === 'dark' ? 'bg-gray-900 p-3 rounded' : ''}`}>
      {label && <label className="mb-1 font-semibold">{label}</label>}
      <div className="flex items-center relative">
        <input
          type={inputType}
          value={internalValue}
          onChange={handleInputChange}
          placeholder={placeholder}
          disabled={disabled}
          aria-invalid={invalid}
          className={inputClasses}
        />
        {showClearButton && internalValue && !disabled && (
          <button
            type="button"
            onClick={clearInput}
            aria-label="Clear input"
            className="absolute right-8 text-gray-500 hover:text-gray-700"
          >
            &times;
          </button>
        )}
        {passwordToggle && !disabled && (
          <button
            type="button"
            onClick={togglePasswordVisibility}
            aria-label={inputType === 'password' ? 'Show password' : 'Hide password'}
            className="absolute right-2 text-gray-500 hover:text-gray-700 select-none"
          >
            {inputType === 'password' ? '👁️' : '🙈'}
          </button>
        )}
      </div>
      {helperText && !invalid && <p className="text-xs text-gray-500 mt-1">{helperText}</p>}
      {invalid && errorMessage && <p className="text-xs text-red-600 mt-1">{errorMessage}</p>}
    </div>
  );
};
