import { useState } from 'react';

export const useField = (type, label) => {
  const [value, setValue] = useState('');

  const onChange = (event) => {
    setValue(event.target.value);
  };

  return {
    input: { type, value, onChange, label },
    setValue,
  };
};
