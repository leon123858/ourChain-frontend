import React from "react";

interface FloatButtonProps {
  value: string;
  onClick: () => void;
}

const FloatButton: React.FC<FloatButtonProps> = ({ value, onClick }) => {
  return (
    <button
      className="p-4 bg-blue-500 text-white rounded-full shadow-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
      onClick={onClick}
    >
      {value}
    </button>
  );
};

export default FloatButton;
