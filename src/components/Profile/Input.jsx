export const Input = ({ label, id, value, onChange, type }) => (
  <div className="mb-4">
    <label htmlFor={id} className="mb-2 block text-sm font-bold text-gray-700">
      {label}
    </label>
    <input
      type={type}
      id={id}
      name={id}
      value={value}
      onChange={onChange}
      className="w-full rounded border px-3 py-2"
    />
  </div>
);
