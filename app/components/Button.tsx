import React from "react";

type Variant = "primary" | "secondary";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant: Variant;
}

const Button: React.FC<ButtonProps> = ({
  children,
  className = "",
  variant = "primary",
  ...props
}) => {
  return (
    <button
      className={`
        text-(--white)
        px-6 py-2 
        font-bold text-md 
        rounded-md 
        cursor-pointer 
        hover:opacity-80 
        transition-all 
        disabled:opacity-50 disabled:cursor-not-allowed
        ${variant === "primary" ? "bg-(--blue)" : "bg-(--light-gray) "}
        ${className}
      `}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
