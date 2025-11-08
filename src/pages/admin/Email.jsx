import React, { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { FilePond, registerPlugin } from "react-filepond";
import "filepond/dist/filepond.min.css";
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css";
import FilePondPluginImagePreview from "filepond-plugin-image-preview";
import FilePondPluginFileEncode from "filepond-plugin-file-encode";

// Register the plugins for FilePond
registerPlugin(FilePondPluginImagePreview, FilePondPluginFileEncode);

const Email = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isValid },
    reset,
    watch,
  } = useForm({
    mode: "onChange",
  });

  const [files, setFiles] = useState([]);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showError, setShowError] = useState(false);

  const watchedFields = watch();

  const onSubmit = async (data) => {
    console.log("Files being sent:", files);

    const formData = new FormData();
    formData.append("to", data.to);
    formData.append("subject", data.subject);
    formData.append("message", data.message);

    files.forEach((fileItem) => {
      formData.append("files", fileItem.file);
    });

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_LINK}/email-send`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        }
      );

      if (response.status === 200) {
        setShowSuccess(true);
        reset();
        setFiles([]);
        setTimeout(() => setShowSuccess(false), 5000);
      }
    } catch (error) {
      console.error("Error sending email:", error);
      setShowError(true);
      setTimeout(() => setShowError(false), 5000);
    }
  };

  const messageLength = watch("message")?.length || 0;

  return (
    <div className="max-w-4xl mx-auto p-4 h-screen flex flex-col">
      {/* Header - Compact */}
      <div className="text-center mb-4 flex-shrink-0">
        <h2 className="text-2xl font-bold text-gray-800 mb-1">Send Email</h2>
        <p className="text-gray-600 text-sm">
          Compose and send emails with attachments
        </p>
      </div>

      {/* Success/Error Messages */}
      {showSuccess && (
        <div className="mb-3 p-3 bg-green-50 border border-green-200 rounded-lg flex items-center text-sm flex-shrink-0">
          <div className="flex-shrink-0">
            <svg
              className="w-4 h-4 text-green-400"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          <div className="ml-2">
            <p className="text-sm font-medium text-green-800">
              Email sent successfully!
            </p>
          </div>
        </div>
      )}

      {showError && (
        <div className="mb-3 p-3 bg-red-50 border border-red-200 rounded-lg flex items-center text-sm flex-shrink-0">
          <div className="flex-shrink-0">
            <svg
              className="w-4 h-4 text-red-400"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          <div className="ml-2">
            <p className="text-sm font-medium text-red-800">
              Failed to send email. Please try again.
            </p>
          </div>
        </div>
      )}

      {/* Form Container - Flexible height */}
      <div className="bg-white shadow-lg rounded-xl border border-gray-100 flex-1 min-h-0">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="h-full flex flex-col p-4"
        >
          {/* Compact Grid Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 mb-3 flex-shrink-0">
            <div>
              <label
                className="block text-sm font-medium text-gray-700 mb-1"
                htmlFor="to"
              >
                To *
              </label>
              <input
                type="email"
                id="to"
                {...register("to", {
                  required: "Email is required",
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "Invalid email",
                  },
                })}
                className={`w-full px-3 py-2 text-sm border rounded-lg focus:outline-none focus:ring-1 transition-colors ${
                  errors.to
                    ? "border-red-300 focus:ring-red-500"
                    : watchedFields.to
                    ? "border-green-300 focus:ring-green-500"
                    : "border-gray-300 focus:ring-blue-500"
                }`}
                placeholder="recipient@example.com"
              />
              {errors.to && (
                <p className="mt-1 text-xs text-red-600 flex items-center">
                  <svg
                    className="w-3 h-3 mr-1"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                      clipRule="evenodd"
                    />
                  </svg>
                  {errors.to.message}
                </p>
              )}
            </div>

            <div>
              <label
                className="block text-sm font-medium text-gray-700 mb-1"
                htmlFor="subject"
              >
                Subject *
              </label>
              <input
                type="text"
                id="subject"
                {...register("subject", {
                  required: "Subject is required",
                  minLength: {
                    value: 3,
                    message: "Minimum 3 characters",
                  },
                })}
                className={`w-full px-3 py-2 text-sm border rounded-lg focus:outline-none focus:ring-1 transition-colors ${
                  errors.subject
                    ? "border-red-300 focus:ring-red-500"
                    : watchedFields.subject
                    ? "border-green-300 focus:ring-green-500"
                    : "border-gray-300 focus:ring-blue-500"
                }`}
                placeholder="Email subject"
              />
              {errors.subject && (
                <p className="mt-1 text-xs text-red-600 flex items-center">
                  <svg
                    className="w-3 h-3 mr-1"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                      clipRule="evenodd"
                    />
                  </svg>
                  {errors.subject.message}
                </p>
              )}
            </div>
          </div>

          {/* Message - Compact */}
          <div className="mb-3 flex-shrink-0">
            <div className="flex justify-between items-center mb-1">
              <label
                className="block text-sm font-medium text-gray-700"
                htmlFor="message"
              >
                Message *
              </label>
              <span
                className={`text-xs ${
                  messageLength > 300 ? "text-amber-600" : "text-gray-500"
                }`}
              >
                {messageLength}/300
              </span>
            </div>
            <textarea
              id="message"
              {...register("message", {
                required: "Message is required",
                maxLength: {
                  value: 300,
                  message: "Max 300 characters",
                },
              })}
              maxLength={300}
              className={`w-full px-3 py-2 text-sm border rounded-lg focus:outline-none focus:ring-1 transition-colors resize-none ${
                errors.message
                  ? "border-red-300 focus:ring-red-500"
                  : watchedFields.message
                  ? "border-green-300 focus:ring-green-500"
                  : "border-gray-300 focus:ring-blue-500"
              }`}
              rows="3"
              placeholder="Write your message here..."
            ></textarea>
            {errors.message && (
              <p className="mt-1 text-xs text-red-600 flex items-center">
                <svg
                  className="w-3 h-3 mr-1"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                    clipRule="evenodd"
                  />
                </svg>
                {errors.message.message}
              </p>
            )}
          </div>

          {/* Attachments - Compact */}
          <div className="mb-4 flex-1 min-h-0">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Attachments
              <span className="text-gray-500 font-normal ml-1 text-xs">
                (Optional, max 5 files - Images & PDFs)
              </span>
            </label>
            <div className="h-full max-h-32">
              {" "}
              {/* Limit height */}
              <FilePond
                files={files}
                onupdatefiles={setFiles}
                allowMultiple={true}
                maxFiles={5}
                name="files"
                labelIdle='<div class="flex flex-col items-center justify-center p-4 text-gray-500 text-sm"><svg class="w-8 h-8 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path></svg><div>Drag & Drop or <span class="text-blue-500 cursor-pointer">Browse</span></div></div>'
                allowFileEncode={true}
                acceptedFileTypes={["image/*", "application/pdf"]}
                className="border-2 border-dashed border-gray-300 rounded-lg hover:border-gray-400 transition-colors h-full"
              />
            </div>
            {files.length > 0 && (
              <p className="mt-1 text-xs text-gray-600">
                {files.length} file{files.length !== 1 ? "s" : ""} selected
              </p>
            )}
          </div>

          {/* Submit Button */}
          <div className="flex justify-end pt-2 border-t border-gray-200 flex-shrink-0">
            <button
              type="submit"
              disabled={isSubmitting || !isValid}
              className={`px-6 py-2 text-sm rounded-lg font-semibold text-white transition-all duration-200 flex items-center ${
                isSubmitting || !isValid
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 shadow hover:shadow-md"
              }`}
            >
              {isSubmitting ? (
                <>
                  <svg
                    className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Sending...
                </>
              ) : (
                <>
                  <svg
                    className="w-4 h-4 mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                    ></path>
                  </svg>
                  Send Email
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Email;
