export const Input = ({ label, id, angle, ...props }) => {
  return (
    <div className="input_container">
      <label className="label" htmlFor={id}>
        {label}
      </label>
      <input className="input" id={id} type="text" {...props} />
    </div>
  );
};
