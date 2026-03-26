import { forwardRef, type InputHTMLAttributes } from "react";

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  error?: string;
};

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, id, ...props }, ref) => {
    return (
      <div className="flex flex-col gap-1">
        <label htmlFor={id} className="text-sm font-medium text-black">
          {label}
        </label>
        <input
          ref={ref}
          id={id}
          {...props}
          className="border border-gray-300 rounded-lg px-4 py-3 text-sm outline-none focus:border-primary transition-colors"
        />
        {error && <span className="text-xs text-red-500">{error}</span>}
      </div>
    );
  },
);

Input.displayName = "Input";

export default Input;
