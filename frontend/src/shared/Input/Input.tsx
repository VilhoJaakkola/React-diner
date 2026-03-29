import { forwardRef } from 'react';

type InputProps = {
  id: string;
  label: string;
  type?: string;
  placeholder?: string;
  'data-cy'?: string;
};

const Input = forwardRef<HTMLInputElement, InputProps>((props, ref) => {
  return (
    <div className="my-4">
      <label htmlFor={props.id} className="block font-bold mb-2 text-left">
        {props.label}
      </label>
      <input
        ref={ref}
        id={props.id}
        type={props.type}
        placeholder={props.placeholder}
        data-cy={props['data-cy']}
        className="block w-full [font:inherit] border border-[#ccc] bg-[#f8f8f8] py-[0.15rem] px-1 focus:outline-none focus:bg-[#ebebeb] focus:border-[#510077]"
      />
    </div>
  );
});

export default Input;
