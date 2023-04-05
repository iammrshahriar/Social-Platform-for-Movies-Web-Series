import React from "react";

const FormInput = ({
  type,
  name,
  label,
  errorMessage,
  placeholder,
  register,
  defaultValue,
}) => {
  return (
    <div className="text-white">
      <div
        className={`mb-2 ${
          type === "password" && "flex items-center justify-between"
        }`}
      >
        <label htmlFor={name} className="block mb-2 text-sm">
          {label}
        </label>
        <label
          className={` mb-2 text-sm ${
            type === "password" ? "block text-xs underline" : "hidden"
          }`}
        >
          Forgot Password?
        </label>
      </div>
      <input
        type={type}
        id={name}
        name={name}
        placeholder={placeholder}
        defaultValue={defaultValue}
        {...register}
        className="w-full text-sm px-3 py-2 placeholder:text-sm border rounded-md bg-slate-600"
      />
      <span className="text-sm mt-1 text-red-500 capitalize">
        {errorMessage}
      </span>
    </div>
  );
};

export default FormInput;
