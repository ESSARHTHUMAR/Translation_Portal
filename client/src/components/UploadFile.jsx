// import React, { useState } from "react";

// const UploadFile = () => {

//     const [formData, setFormdata] = useState({});

//     const handleChange = (e) => {
//         setFormdata({
//             ...formData,
//             [e.target.id]: [e.target.value]
//         })
//     }

//   const handleSubmit = () => {};

//   return (
//     <div className="h-screen relative flex items-center justify-center">
//       <div className="flex flex-col items-center bg-black w-[50vw] p-10">
//         <h1>Upload File</h1>
//         <form onSubmit={handleSubmit} className="flex flex-col mt-6">
//           <input onChange={handleChange} id="filename" type="text" placeholder="Enter filename" />
//           <input onChange={handleChange} id="originalLang" type="text" placeholder="Enter file language" />
//           <input onChange={handleChange} id="transLang" type="text" placeholder="Enter translation language" />
//           <input onChange={handleChange} id="completeTime" type="text" placeholder="Enter turnaround time" />
//           <input onChange={handleChange} id="file" type="file" name="" />
//           <button className="mt-4">Upload</button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default UploadFile;

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";

const UploadFile = () => {
  const { userdata } = useSelector((state) => state.user);
  const [file, setFile] = useState(null);
  const [fromLanguage, setFromLanguage] = useState("");
  const [toLanguage, setToLanguage] = useState("");
  const [turnaroundTime, setTurnaroundTime] = useState("");
  const [originalFilename, setOriginalFilename] = useState("");
  const [visible, setVisible] = useState(false);

  const handleFileUpload = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("file", file);
    formData.append("fromLanguage", fromLanguage);
    formData.append("toLanguage", toLanguage);
    formData.append("turnaroundTime", turnaroundTime);
    formData.append("originalFilename", originalFilename);
    formData.append("originalFileUrl", file.name);

    try {
      await axios.post("/api/upload", formData, {
        headers: { Authorization: `Bearer ${userdata?.token}` },
      });
      setVisible(true);
      setFromLanguage("");
      setToLanguage("");
      setTurnaroundTime("");
      setFile(null);
    } catch (error) {
      console.error(error);
      setVisible(true);
      setFromLanguage("");
      setToLanguage("");
      setTurnaroundTime("");
      setFile(null);
    }
  };

  return (
    <div className="flex flex-col items-center mt-8 p-6">
      <h1 className="text-3xl font-pSemiBold uppercase text-bgSecondary mb-2">
        Upload File
      </h1>
      {visible ? (
        <div
          className={`bg-bgSecondary px-10 py-2 mb-4 relative cursor-pointer ${
            !visible ? "hidden" : "block"
          }`}
        >
          File is uploaded successfully.
          <span
            className="absolute -top-4 -right-2 bg-white rounded-full text-bgSecondary py-1 px-3 font-pSemiBold text-lg"
            onClick={() => setVisible(!visible)}
          >
            x
          </span>
        </div>
      ) : (
        <div
          className={`text-red-400 mb-4 relative cursor-pointer ${
            !visible ? "hidden" : "block"
          }`}
        >
          can't upload the file.
          <span onClick={() => setVisible(!visible)}>X</span>
        </div>
      )}
      <form
        onSubmit={handleFileUpload}
        className="space-y-4 flex flex-col justify-center items-center bg-black mx-auto p-10 relative rounded-lg w-[350px] md:w-[450px]"
      >
        <input
          className="bg-bgColor text-xs px-4 py-2 rounded-md focus:outline-none"
          type="text"
          placeholder="Enter Filename"
          value={originalFilename}
          onChange={(e) => setOriginalFilename(e.target.value)}
          required
        />
        <input
          className="bg-bgColor text-xs px-4 py-2 rounded-md focus:outline-none"
          type="text"
          placeholder="From language"
          value={fromLanguage}
          onChange={(e) => setFromLanguage(e.target.value)}
          required
        />
        <input
          className="bg-bgColor text-xs px-4 py-2 rounded-md focus:outline-none"
          type="text"
          placeholder="To Language"
          value={toLanguage}
          onChange={(e) => setToLanguage(e.target.value)}
          required
        />
        <input
          className="bg-bgColor text-xs px-4 py-2 rounded-md focus:outline-none"
          type="text"
          placeholder="Turnaround Time (in hrs)"
          value={turnaroundTime}
          onChange={(e) => setTurnaroundTime(e.target.value)}
          required
        />
        <input
          className="bg-bgColor text-xs px-4 py-2 rounded-md focus:outline-none"
          type="file"
          onChange={(e) => setFile(e.target.files[0])}
          required
        />
        <div>
          <button
            type="submit"
            className="mt-4 text-center bg-bgSecondary w-full py-2 px-4 text-md font-pMedium hover:opacity-80 transition-all duration-300"
          >
            Upload
          </button>
        </div>
      </form>
    </div>
  );
};

export default UploadFile;
