import React from "react";
import InputMask from "react-input-mask";

export interface InputProps {
  step?: number | undefined;
  pattern?: string | undefined;
  label: string;
  name: string;
  type: React.HTMLInputTypeAttribute | undefined;
  value: string | number;
  mask?: string;
  min?: number;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export const Input = (props: InputProps) => {
  return (
    <div className="flex flex-col items-start w-full">
      <label htmlFor={props.name}>{props.label}</label>
      {props.mask ? (
        <InputMask
          step={props.step}
          pattern={props.pattern}
          min={props.min}
          type={props.type}
          mask={props.mask}
          value={props.value}
          onChange={props.onChange}
          className="rounded-md p-2 outline-none border focus:border-blue-500 w-full shadow-md shadow-gray-100"
        />
      ) : (
        <input
          className="rounded-md p-2 outline-none border focus:border-blue-500 w-full shadow-md shadow-gray-100"
          type={props.type}
          step={props.step}
          pattern={props.pattern}
          min={props.min}
          name={props.name}
          value={props.value}
          onChange={props.onChange}
        />
      )}
    </div>
  );
};
