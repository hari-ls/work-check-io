import { useState } from "react";
// handle form change and submission
export const useForm = (cb, initialState = {}) => {
  const [values, setValues] = useState(initialState);

  const onChange = (e) => {
    setValues({
      ...values,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    cb();
  };

  return {
    onChange,
    onSubmit,
    values,
  };
};
