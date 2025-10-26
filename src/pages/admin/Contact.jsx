import React, { useState, useEffect } from "react";
import client from "../../utils/client";
import { notifyError, formatDate } from "../../utils/Helpers";
import { MdEdit, MdContacts } from "react-icons/md";
import ContactModal from "../../components/Admin/Modal/ContactModal";

const Contact = () => {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedContact, setSelectedContact] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const fetchContacts = async () => {
    setLoading(true);
    try {
      const response = await client.get("/contacts/");
      setContacts(response.data.data || []);
    } catch {
      notifyError("Error fetching contacts");
    } finally {
      setLoading(false);
    }
  };

  const openModal = (contact = null) => {
    setSelectedContact(contact);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedContact(null);
  };

  useEffect(() => {
    fetchContacts();
  }, []);

  const renderSkeletonRows = () => {
    return Array(5)
      .fill()
      .map((_, index) => (
        <tr key={index} className="animate-pulse">
          <td className="py-3 px-4">
            <div className="h-4 w-6 bg-gray-200 rounded"></div>
          </td>
          <td className="py-3 px-4">
            <div className="h-4 w-24 bg-gray-200 rounded"></div>
          </td>
          <td className="py-3 px-4">
            <div className="h-4 w-32 bg-gray-200 rounded"></div>
          </td>
          <td className="py-3 px-4">
            <div className="h-4 w-40 bg-gray-200 rounded"></div>
          </td>
          <td className="py-3 px-4">
            <div className="h-4 w-20 bg-gray-200 rounded"></div>
          </td>
          <td className="py-3 px-4">
            <div className="h-4 w-20 bg-gray-200 rounded"></div>
          </td>
          <td className="py-3 px-4">
            <div className="h-4 w-16 bg-gray-200 rounded"></div>
          </td>
          <td className="py-3 px-4 text-center">
            <div className="h-6 w-14 bg-gray-200 rounded mx-auto"></div>
          </td>
        </tr>
      ));
  };

  return (
    <>
      <div className="px-6 mt-8">
        {/* 🔹 Breadcrumb Header */}
        <div className="mb-6">
          <p className="text-sm text-gray-500 mb-5">
            <span className="text-blue-600 font-medium cursor-pointer hover:underline">
              Dashboard
            </span>{" "}
            / <span className="text-gray-700 font-medium">Contact</span>
          </p>

          <div className="flex items-center gap-2">
            <MdContacts className="text-blue-600 text-3xl" />
            <h1 className="font-serif font-bold text-2xl text-gray-800">
              Contact Messages
            </h1>
          </div>
        </div>

        {/* 🔹 Table Section */}
        <div className="bg-white p-6 rounded-2xl shadow-md border border-gray-100">
          <div className="overflow-x-auto rounded-lg">
            <table className="min-w-full border-collapse text-sm">
              <thead>
                <tr className="bg-gradient-to-r from-yellow-100 to-red-100 text-gray-700 uppercase text-xs font-semibold tracking-wide">
                  <th className="py-3 px-4 text-left rounded-tl-lg">No.</th>
                  <th className="py-3 px-4 text-left">Name</th>
                  <th className="py-3 px-4 text-left">Email</th>
                  <th className="py-3 px-4 text-left">Subject</th>
                  <th className="py-3 px-4 text-left">Message</th>
                  <th className="py-3 px-4 text-left">Sent At</th>
                  <th className="py-3 px-4 text-left">Updated At</th>
                  <th className="py-3 px-4 text-center">Status</th>
                  <th className="py-3 px-4 text-center rounded-tr-lg">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {loading ? (
                  renderSkeletonRows()
                ) : contacts.length > 0 ? (
                  contacts.map((contact, index) => (
                    <tr
                      key={contact.id}
                      className="hover:bg-gray-50 transition-all duration-200"
                    >
                      <td className="py-3 px-4 text-gray-700 font-medium">
                        {index + 1}
                      </td>
                      <td className="py-3 px-4 text-gray-800 font-semibold">
                        {contact.name}
                      </td>
                      <td className="py-3 px-4 text-gray-600">
                        {contact.email}
                      </td>
                      <td className="py-3 px-4 text-gray-600">
                        {contact.subject}
                      </td>
                      <td
                        className="py-3 px-4 text-gray-600 max-w-xs cursor-pointer"
                        title={contact.message}
                      >
                        <div className="truncate">{contact.message}</div>
                      </td>
                      <td className="py-3 px-4 text-gray-500">
                        {formatDate(contact.created_at)}
                      </td>
                      <td className="py-3 px-4 text-gray-500">
                        {contact.updated_at
                          ? formatDate(contact.updated_at)
                          : "N/A"}
                      </td>

                      {/* ✅ Status Column */}
                      <td className="py-3 px-4 text-center">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-medium ${
                            contact.status === "resolved"
                              ? "bg-green-100 text-green-700"
                              : "bg-yellow-100 text-yellow-700"
                          }`}
                        >
                          {contact.status
                            ? contact.status.charAt(0).toUpperCase() +
                              contact.status.slice(1)
                            : "Pending"}
                        </span>
                      </td>

                      <td className="py-3 px-4 text-center">
                        <button
                          onClick={() => openModal(contact)}
                          className="flex items-center justify-center gap-1 mx-auto px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white text-sm rounded-lg transition"
                        >
                          <MdEdit size={16} />
                          Edit
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan="9"
                      className="text-center text-gray-500 py-6 italic"
                    >
                      No contact messages found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {isModalOpen && (
        <ContactModal
          open={isModalOpen}
          contact={selectedContact}
          onClose={closeModal}
          onSuccess={fetchContacts}
        />
      )}
    </>
  );
};

export default Contact;
