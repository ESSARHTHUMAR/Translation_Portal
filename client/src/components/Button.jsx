import React from "react";

const Button = ({buttonName,loading}) => {
    //Button Component with dynamic property Button Name.
  return (
    <div>
      <button disabled={loading} className="bg-bgSecondary px-4 py-2 font-pMedium hover:bg-opacity-80 transition-all ease-in-out duration-300 disabled:bg-opacity-50">
        {loading ? "Loading..." : buttonName}
      </button>
    </div>
  );
};

export default Button;
