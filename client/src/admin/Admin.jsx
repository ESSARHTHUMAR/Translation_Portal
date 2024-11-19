import { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";

const Admin = () => {
  const { userdata } = useSelector((state) => state.user);
  const [files, setFiles] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const [status, setStatus] = useState("")

  useEffect(() => {
    const fetchFiles = async () => {
      const res = await axios.get("/api/admin/files", {
        headers: { Authorization: `Bearer ${userdata?.token}` },
      });
      setFiles(res.data);
    };
    fetchFiles();
  }, [userdata]);

  // Function to download the original file
  const handleDownload = async (fileId) => {
    try {
      const response = await axios.get(`/api/admin/download/${fileId}`, {
        headers: { Authorization: `Bearer ${userdata?.token}` },
        responseType: "blob",
      });

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      const filename = response.headers["content-disposition"]
        ? response.headers["content-disposition"].split("filename=")[1]
        : "downloaded-file";

      link.href = url;
      link.setAttribute("download", filename);
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (error) {
      console.error("Download error:", error);
      alert("Failed to download file. Please check the server logs.");
    }
  };

  // Function to handle translated file upload
  const handleUploadTranslatedFile = async (fileId) => {
    if (!selectedFile) {
      setStatus("Please select a file first.");
      return;
    }

    const formData = new FormData();
    formData.append("file", selectedFile);

    try {
      const res = await axios.post(`/api/admin/upload/${fileId}`, formData, {
        headers: {
          Authorization: `Bearer ${userdata?.token}`,
          "Content-Type": "multipart/form-data",
        },
      });
      setStatus("Translated file uploaded successfully!");
      setFiles((prevFiles) =>
        prevFiles.map((file) => (file._id === res.data._id ? res.data : file))
      );
    } catch (error) {
      console.error("Upload error:", error);
      setStatus("Failed to upload translated file.");
    }
  };

  const handleSendEmail = async (fileId) => {
    try {
      const response = await axios.post(`/api/admin/send-translated-email/${fileId}`, null, {
        headers: {
          Authorization: `Bearer ${userdata?.token}`,
        },
      });
      setStatus('Email sent successfully!');
    } catch (error) {
      console.error('Error sending email:', error);
      if (error.response) {
        console.error('Backend error:', error.response.data);
      } else if (error.request) {
        console.error('No response from server:', error.request);
      } else {
        console.error('Error setting up the request:', error.message);
      }
      setStatus('Failed to send email.');
    }
  };
  
  useEffect(() => {
    const clearStatus = setTimeout(() => {
      setStatus(null)
    }, 5000)

    return clearTimeout(() => clearStatus)
  }, [status])
  

  return (
    <div className="flex flex-col mt-8 p-6 overflow-x-auto">
      <h2 className="text-3xl font-pSemiBold uppercase text-bgSecondary text-center">
        All Uploaded Files
      </h2>
      {status ? <div className="bg-bgSecondary px-4 py-2"><p className="text-center">{status}</p></div> : ""}
      <table className="min-w-full bg-black border border-gray-200 mt-6">
        <thead>
          <tr className="bg-bgSecondary bg-opacity-90 uppercase text-sm text-center">
            <th className="px-4 py-2">Username</th>
            <th className="px-4 py-2">Filename</th>
            <th className="px-4 py-2">Original Language</th>
            <th className="px-4 py-2">Translation Language</th>
            <th className="px-4 py-2">Expected Time</th>
            <th className="px-4 py-2">Status</th>
            <th className="px-4 py-2">Original file</th>
            <th className="px-4 py-2">Upload Translated File</th>
            <th className="px-4 py-2">Send mail</th>
          </tr>
        </thead>
        <tbody>
          {files.map((file) => (
            <tr key={file._id} className="border-b text-center">
              <td className="px-4 py-2 uppercase ">{file?.userId.username}</td>
              <td className="px-4 py-2 capitalize ">
                {file?.originalFilename}
              </td>
              <td className="px-4 py-2 capitalize ">{file?.fromLanguage}</td>
              <td className="px-4 py-2 capitalize ">{file?.toLanguage}</td>
              <td className="px-4 py-2 capitalize ">{file?.turnaroundTime}</td>
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
              <td className="px-2 py-1 text-xs">
                <button
                  onClick={() => handleDownload(file._id)}
                  className="bg-bgSecondary text-white px-3 py-1 rounded"
                >
                  Download
                </button>
              </td>
              <td className="px-2 py-2 text-center flex items-center justify-center gap-0">
                <input
                  type="file"
                  onChange={(e) => setSelectedFile(e.target.files[0])}
                  className="text-2xs"
                />
                <button
                  onClick={() => handleUploadTranslatedFile(file._id)}
                  className="bg-white text-bgColor bg-opacity-90 hover:bg-opacity-80 px-2 py-1 text-2xs rounded"
                >
                  Upload
                </button>
              </td>
              <td className="px-2 py-1 text-xs">
                <button
                  disabled={
                      file?.status === "Uploaded" ||
                      file?.status === "In Progress"
                    }
                  onClick={() => handleSendEmail(file._id)}
                  className={`bg-bgSecondary text-white px-3 py-1 rounded hover:opacity-80 ${
                      file?.status === "Uploaded" ||
                      file?.status === "In Progress"
                        ? "bg-gray-500"
                        : "bg-bgSecondary"
                    }`}
                >
                  Send
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Admin;
