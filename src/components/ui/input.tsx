
import React from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  icon?: React.ReactNode;
}

const Input: React.FC<InputProps> = ({
  label,
  error,
  icon,
  className = "",
  id,
  ...props
}) => {
  const inputId = id ?? label?.toLowerCase().replace(/\s+/g, "-");

  return (
    <div className="flex flex-col gap-1 w-full">
      {label && (
        <label htmlFor={inputId} className="text-sm font-medium text-gray-700">
          {label}
        </label>
      )}
      <div className="relative">
        {icon && (
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
            {icon}
          </span>
        )}
        <input
          id={inputId}
          className={[
            "w-full rounded-xl border bg-white px-4 py-2.5 text-sm text-gray-900",
            "placeholder:text-gray-400 transition-all duration-150",
            "focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent",
            error ? "border-red-400" : "border-gray-200 hover:border-gray-300",
            icon ? "pl-10" : "",
            className,
          ].join(" ")}
          {...props}
        />
      </div>
      {error && <p className="text-xs text-red-500 mt-0.5">{error}</p>}
    </div>
  );
};

export default Input;