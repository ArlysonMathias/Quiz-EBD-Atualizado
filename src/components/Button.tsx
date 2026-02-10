import type { ComponentProps, ReactNode } from "react";

interface ButtonProps extends ComponentProps<"button"> {
  children: ReactNode;
  variant?: "easy" | "medium" | "hard";
}
export const Button = ({ children, variant = "easy", className, ...rest }: ButtonProps) => {
  const variants = {
    easy: "bg-green-600 hover:bg-green-700",
    medium: "bg-yellow-500 hover:bg-yellow-600",
    hard: "bg-red-600 hover:bg-red-700"
  };
  return (
    <button
      {...rest}
      className={`py-3
        rounded-xl
        text-white
        font-semibold
        transition
        cursor-pointer
        ${variants[variant]}
         ${className || ""}
        `}>
      {children}
    </button>
  );
};
