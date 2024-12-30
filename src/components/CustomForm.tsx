interface CustomFormProps {
  name: string;
  type: string;
  label: string;
  className?: string;
  otherProps?: React.InputHTMLAttributes<HTMLInputElement>;
  required?: boolean;
}

const CustomForm = (props: CustomFormProps) => {
  return (
    <div className={`col-span-6 sm:col-span-3 ${props.className}`}>
      <label
        htmlFor={props.name}
        className="block text-sm font-medium text-gray-700"
      >
        {props.label}
      </label>

      <input
        {...props.otherProps}
        type={props.type}
        id={props.name}
        name={props.name}
        required={props.required}
        className="mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
      />
    </div>
  );
};

export default CustomForm;
