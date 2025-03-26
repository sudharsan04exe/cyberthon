// select.jsx
export const Select = ({ options = [], className = "", ...props }) => {
    return (
      <select
        className={`border border-gray-300 px-3 py-2 rounded-md ${className}`}
        {...props}
      >
        {options.map((opt, i) => (
          <option key={i} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    );
  };
  