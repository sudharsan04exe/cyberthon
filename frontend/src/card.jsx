// card.jsx
export const Card = ({ children }) => {
    return <div className="rounded-xl shadow-md p-4 bg-white">{children}</div>;
  };
  
  export const CardContent = ({ children }) => {
    return <div className="p-2">{children}</div>;
  };
  