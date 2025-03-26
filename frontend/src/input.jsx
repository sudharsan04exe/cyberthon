// input.jsx
export const Input = ({ type = "text", className = "", ...props }) => {
    return (
      <input
        type={type}
        className={`border border-gray-300 px-3 py-2 rounded-md ${className}`}
        {...props}
      />
    );
  };
  