import React, { ReactNode } from "react";

export const RadioGroupContext = React.createContext(null);

interface RadioGroupProps<T> {
  onChange: (value: T) => any | void;
  selectedValue: T;
  children?: ReactNode;
}

function RadioGroup<T>({
  onChange,
  selectedValue,
  ...otherProps
}: RadioGroupProps<T>) {
  return (
    <RadioGroupContext.Provider
      value={{ onChange, selectedValue }}
      {...otherProps}
    />
  );
}

export { RadioGroup };
