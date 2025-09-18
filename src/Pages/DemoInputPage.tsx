import React, { useState } from 'react';
import { InputField } from '../components/InputField';

export const DemoInputPage: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  return (
    <div className="p-8 max-w-md mx-auto space-y-8">
      <h1 className="text-3xl font-bold text-center">InputField Component Demo</h1>

      <InputField
        label="Username"
        placeholder="Enter username"
        value={username}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setUsername(e.target.value)}
        helperText="Your username"
        showClearButton
      />

      <InputField
        label="Password"
        placeholder="Enter password"
        value={password}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
        passwordToggle
        helperText="Toggle password visibility"
      />




      <InputField
        label="Disabled Input"
        placeholder="You cannot edit this"
        disabled
      />

      <InputField
        label="Invalid Input"
        placeholder="Try to enter something"
        invalid
        errorMessage="Input has errors"
      />

      <InputField
        label="Filled Variant"
        variant="filled"
      />

      <InputField
        label="Ghost Variant"
        variant="ghost"
      />

      <InputField
        label="Large Size"
        size="lg"
      />


    </div>
  );
};
