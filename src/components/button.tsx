import { type ReactNode } from "react";

type ButtonProps = {
  text: string;
  icon: ReactNode;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  onClick?: () => void;
};

const Button = ({
  text,
  icon,
  type = "button",
  disabled,
  onClick,
}: ButtonProps) => {
  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className="w-full flex items-center justify-center gap-3 bg-primary text-white font-medium py-3 px-4 rounded-lg hover:opacity-90 transition-opacity cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
    >
      {icon}
      {text}
    </button>
  );
};

export default Button;
