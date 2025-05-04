import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { FilePond, registerPlugin } from "react-filepond";
import "filepond/dist/filepond.min.css";
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css";
import FilePondPluginImagePreview from "filepond-plugin-image-preview";
import FilePondPluginFileEncode from "filepond-plugin-file-encode";
import client from "../../utils/client";

// Register the plugins for FilePond
registerPlugin(FilePondPluginImagePreview, FilePondPluginFileEncode);

const Email = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const [files, setFiles] = useState([]);

  // This function will handle the form submission
  const onSubmit = async (data) => {
    // Create a FormData object
    const formData = new FormData();

    // Append fields to the FormData
    formData.append("to", data.to);
    formData.append("subject", data.subject);
    formData.append("message", data.message);

    // Append files to the FormData
    files.forEach((fileItem) => {
      formData.append("files", fileItem.file); // Use the actual File object
    });

    try {
      await client
        .post("/email-send", formData, {
          headers: {
            "Content-Type": "multipart/form-data", // Use multipart/form-data
          },
          withCredentials: true,
        })
        .then((res) => {
          if (res.status === 200) {
            notifySuccess("Email sent successfully!");
          }
        });
    } catch (error) {
      console.error("Error sending email:", error);
      alert("Failed to send email.");
    }
  };

  return (
    <div className="container mx-auto  p-4">
      <h2 className="text-2xl font-semibold mb-4 ">Send Email</h2>
      <div className="px-4 py-6 bg-white shadow-md rounded-lg">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex justify-between space-x-4">
            <div className="mb-4 w-[48%]">
              <label className="block text-gray-700 mb-2" htmlFor="to">
                To:
              </label>
              <input
                type="email"
                id="to"
                {...register("to", { required: "Recipient email is required" })}
                className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                placeholder="recipient@example.com"
              />
              {errors.to && (
                <p className="text-red-500 text-sm">{errors.to.message}</p>
              )}
            </div>

            <div className="mb-4 w-[48%]">
              <label className="block text-gray-700 mb-2" htmlFor="subject">
                Subject:
              </label>
              <input
                type="text"
                id="subject"
                {...register("subject", { required: "Subject is required" })}
                className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                placeholder="Subject of the email"
              />
              {errors.subject && (
                <p className="text-red-500 text-sm">{errors.subject.message}</p>
              )}
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 mb-2" htmlFor="message">
              Message:
            </label>
            <textarea
              id="message"
              {...register("message", { required: "Message is required" })}
              className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
              rows="4"
              placeholder="Your message here..."
            ></textarea>
            {errors.message && (
              <p className="text-red-500 text-sm">{errors.message.message}</p>
            )}
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Attachments:</label>
            <FilePond
              files={files}
              onupdatefiles={setFiles}
              allowMultiple={true}
              maxFiles={5}
              name="files"
              labelIdle='Drag & Drop your files or <span class="filepond--label-action">Browse</span>'
              allowFileEncode={true}
              acceptedFileTypes={["image/*", "application/pdf"]}
            />
          </div>

          <button
            type="submit"
            className="px-4 py-2 rounded-md font-semibold border-2 text-green-500 border-green-500 hover:bg-green-500 hover:text-white"
          >
            Send Email
          </button>
        </form>
      </div>
    </div>
  );
};

export default Email;
