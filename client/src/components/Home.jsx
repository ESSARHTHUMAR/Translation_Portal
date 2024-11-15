import React from "react";
import Button from "./Button";

const Home = () => {
  return (
    <div className="app__container relative h-[80vh] flex flex-col items-center justify-center">
      <h1 className="text-3xl uppercase font-p700 max-w-fit text-center text-bgSecondary">
        Your Gateway to Seamless Translations
      </h1>
      <p className="text-md max-w-[45vw] text-center font-pRegular">
        Unlock language barriers with fast, accurate, and professional
        translation services tailored to your needs. Experience a hassle-free, user-friendly
        platform designed to bridge the gap between cultures and expand your
        global reach.
      </p>
    </div>
  );
};

export default Home;