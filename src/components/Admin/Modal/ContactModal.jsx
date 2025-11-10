import React, { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import Select from "react-select";
import { notifySuccess, notifyError } from "../../../utils/Helpers";
import { ToastContainer } from "react-toastify";
import client from "../../../utils/client";
import { useSelector } from "react-redux";

const ContactModal = ({ onClose, open, contact, onSuccess }) => {
  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm();
  const user = useSelector((state) => state.user.user);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    reset({
      name: contact?.name || "",
      email: contact?.email || "",
      message: contact?.message || "",
      status: contact?.status || null,
    });
  }, [contact, reset]);

  const onSubmit = async (data) => {
    data.user = user;

    try {
      setIsSubmitting(true); // ⏳ disable button while updating
      await client.put(`/contacts/${contact.id}/`, data, {
        headers: { "Content-Type": "application/json" },
      });

      notifySuccess("Contact updated successfully!");
      onClose();
      onSuccess();
    } catch (error) {
      const errorMessage = error.response
        ? error.response.data.msg
        : error.message;
      notifyError(errorMessage);
    } finally {
      setIsSubmitting(false); // ✅ re-enable after request
    }
  };

  const statusOptions = [
    { value: "pending", label: "Pending" },
    { value: "resolved", label: "Resolved" },
  ];

  if (!open) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center backdrop-blur-sm bg-black/10 z-50">
      {/* Modal Container */}
      <div className="bg-white/90 backdrop-blur-md border border-gray-200 shadow-2xl rounded-2xl w-full max-w-lg p-6 animate-fadeIn">
        <h2 className="text-2xl font-semibold text-gray-800 mb-5 border-b pb-2">
          Contact Details
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Name */}
          <div>
            <label
              htmlFor="name"
              className="block text-gray-700 mb-1 font-medium"
            >
              Name
            </label>
            <input
              id="name"
              type="text"
              readOnly
              className="w-full px-4 py-2 border rounded-lg bg-gray-100 text-gray-700"
              {...register("name")}
            />
          </div>

          {/* Email */}
          <div>
            <label
              htmlFor="email"
              className="block text-gray-700 mb-1 font-medium"
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              readOnly
              className="w-full px-4 py-2 border rounded-lg bg-gray-100 text-gray-700"
              {...register("email")}
            />
          </div>

          {/* Message */}
          <div>
            <label
              htmlFor="message"
              className="block text-gray-700 mb-1 font-medium"
            >
              Message
            </label>
            <textarea
              id="message"
              rows="3"
              readOnly
              className="w-full px-4 py-2 border rounded-lg bg-gray-100 text-gray-700 resize-none"
              {...register("message")}
            />
          </div>

          {/* Status */}
          <div>
            <label
              htmlFor="status"
              className="block text-gray-700 mb-1 font-medium"
            >
              Status
            </label>
            <Controller
              name="status"
              control={control}
              defaultValue={contact?.status || "pending"}
              render={({ field }) => (
                <Select
                  {...field}
                  options={statusOptions}
                  value={statusOptions.find(
                    (option) => option.value === field.value
                  )}
                  onChange={(selectedOption) =>
                    field.onChange(selectedOption.value)
                  }
                  styles={{
                    control: (base) => ({
                      ...base,
                      borderRadius: "0.5rem",
                      padding: "2px",
                      borderColor: "#d1d5db",
                      boxShadow: "none",
                    }),
                  }}
                />
              )}
            />
          </div>

          {/* Buttons */}
          <div className="flex justify-end gap-3 pt-4 border-t mt-4">
            <button
              type="button"
              onClick={onClose}
              disabled={isSubmitting}
              className={`px-5 py-2 rounded-lg border border-gray-300 text-gray-600 hover:bg-gray-100 transition-all ${
                isSubmitting ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className={`px-5 py-2 rounded-lg font-semibold text-white transition-all
              ${
                isSubmitting
                  ? "bg-blue-400 cursor-not-allowed"
                  : "bg-blue-600 hover:bg-blue-700"
              }`}
            >
              {isSubmitting ? "Updating..." : "Update"}
            </button>
          </div>
        </form>
      </div>

      <ToastContainer />
    </div>
  );
};

export default ContactModal;
