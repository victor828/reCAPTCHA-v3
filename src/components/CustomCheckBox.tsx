interface CustomCheckBox {
  name: string;
  label: string;
  className?: string;
  required?: boolean;
  id: string;
}

const CustomCheckBox = (props: CustomCheckBox) => {
  return (
    <div className="col-span-6">
      <label htmlFor={props.id} className={`flex gap-4 ${props.className}`}>
        <input
          type="checkbox"
          id={props.id}
          name={props.name}
          className="size-5 rounded-md border-gray-200 bg-white shadow-sm"
          required={props.required}
        />
        <span className="text-sm text-gray-700">{props.label}</span>
      </label>
    </div>
  );
};

export default CustomCheckBox;
