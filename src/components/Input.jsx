import { forwardRef, useId } from "react";

// eslint-disable-next-line react/prop-types
const Input = forwardRef(function Input(
  // eslint-disable-next-line react/prop-types
  { label, type = "text", className = "", ...props },
  ref
) {
  const id = useId();
  return (
    <div className="md:flex md:gap-1 items-center my-2 max-sm:my-0">
      {label && (
        <label
          className="shrink-0 grow-0 basis-[7rem]  md:text-xl text-base w-full "
          htmlFor={id}
        >
          {label}
        </label>
      )}
      <input
        className={`focus:outline-none focus:ring-primary-pink-variant focus:ring-2 focus:ring-offset-2 focus:ring-offset-dark-primary-black rounded-lg w-full px-3 py-2 
         bg-dark-variant-gray text-white font-sans max-sm:text-base max-sm:mt-1 ${className}`}
        type={type}
        id={id}
        ref={ref}
        {...props}
      />
    </div>
  );
});

export default Input;
