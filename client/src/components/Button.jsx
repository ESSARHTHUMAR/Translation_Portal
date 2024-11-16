import React from "react";

const Button = ({buttonName}) => {
    //Button Component with dynamic property Button Name.
  return (
    <div>
      <button className="bg-bgSecondary px-4 py-2 font-pMedium hover:bg-opacity-80 transition-all ease-in-out duration-300">
        {buttonName}
      </button>
    </div>
  );
};

export default Button;
