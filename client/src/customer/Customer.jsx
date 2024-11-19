import { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Customer = () => {
  const { userdata } = useSelector((state) => state.user);
  const [files, setFiles] = useState([]);

  useEffect(() => {
    console.log("useEffect triggered");
    console.log("User Data:", userdata);
    const fetchFiles = async () => {
      try {
        const res = await axios.get("/api/user/files", {
          headers: {
            Authorization: `Bearer ${userdata?.token}`,
          },
        });
        console.log("Response Data:", res.data);
        setFiles(res.data);
      } catch (error) {
        console.error("Failed to fetch files:", error.response?.data?.message);
      }
    };
    if (userdata?.token) fetchFiles();
  }, [userdata]);

  const handleDownload = async (fileId, status) => {
    try {
      const url =
        status === "Completed" && `/api/download/translated/${fileId}`;

      window.open(url, "_blank");
    } catch (error) {
      console.error("Error downloading file:", error);
      alert("Failed to download file. Please try again.");
    }
  };

  return (
    <div className="flex flex-col mt-8 p-6 overflow-x-auto">
      <h2 className="text-3xl font-pSemiBold uppercase text-bgSecondary text-center">
        All Uploaded Files
      </h2>
      {files.length != 0 ? (
        <table className="min-w-full bg-black border border-gray-200 mt-6">
          <thead>
            <tr className="bg-bgSecondary bg-opacity-90 uppercase text-sm text-center">
              <th className="px-4 py-2">Username</th>
              <th className="px-4 py-2">Filename</th>
              <th className="px-4 py-2">Original Language</th>
              <th className="px-4 py-2">Translation Language</th>
              <th className="px-4 py-2">Expected Time</th>
              <th className="px-4 py-2">Status</th>
              <th className="px-4 py-2">Translated File</th>
            </tr>
          </thead>
          <tbody>
            {files.map((file) => (
              <tr key={file._id} className="border-b text-center">
                <td className="px-4 py-2 uppercase">{userdata.username}</td>
                <td className="px-4 py-2 capitalize">
                  {file?.originalFilename}
                </td>
                <td className="px-4 py-2 capitalize">{file?.fromLanguage}</td>
                <td className="px-4 py-2 capitalize">{file?.toLanguage}</td>
                <td className="px-4 py-2 capitalize">{file?.turnaroundTime}</td>
                <td className="px-2 py-0 capitalize">
                  <p
                    className={`px-2 text-xs capitalize rounded ${
                      file?.status === "Completed"
                        ? "bg-bgSecondary"
                        : file?.status === "In Progress"
                        ? "bg-yellow-600"
                        : file?.status === "Uploaded"
                        ? "bg-gray-600"
                        : ""
                    }`}
                  >
                    {file?.status}
                  </p>
                </td>
                <td className="px-4 py-2 capitalize">
                  <button
                    disabled={
                      file?.status === "Uploaded" ||
                      file?.status === "In Progress"
                    }
                    onClick={() => handleDownload(file._id, file.status)}
                    className={` text-white text-xs px-3 py-1 rounded ${
                      file?.status === "Uploaded" ||
                      file?.status === "In Progress"
                        ? "bg-gray-500"
                        : "bg-bgSecondary"
                    }`}
                  >
                    Download
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <div className="mt-6 bg-black py-4 w-[600px] flex flex-col mx-auto px-10 items-center justify-center">
          <p className="text-center">
            You haven't uploaded any files yet.
          </p>
          <p>Please upload a file.</p>
          <Link to="/customer/upload" className="bg-bgSecondary px-4 py-2 mt-4 font-pMedium hover:opacity-80 transition-all duration-300">Upload a file</Link>
        </div>
      )}
    </div>
  );
};

export default Customer;
