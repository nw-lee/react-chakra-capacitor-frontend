import { useState } from 'react';

const useInput = () => {
  const [value, setValue] = useState('');
  const onChange = (e: any) => {
    e.preventDefault();
    setValue(e.target.value);
  };
  const clearValue = () => setValue('');
  return {
    state: {
      value,
      onChange,
    },
    clearValue,
  };
};

export default useInput;
