import React, { useState, useEffect, useRef } from "react";
import client from "../../utils/client";
import { notifyError, formatDate } from "../../utils/Helpers";
import { MdMoreVert, MdEdit } from "react-icons/md";
import ContactModal from "../../components/Admin/Modal/ContactModal";

const Contact = () => {
  const [contacts, setContacts] = useState([]);
  const [selectedContact, setSelectedContact] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [openMenuId, setOpenMenuId] = useState(null);
  const menuRef = useRef(null);

  const fetchContacts = async () => {
    await client
      .get("/contact-list/")
      .then((response) => {
        setContacts(response.data);
      })
      .catch(() => {
        notifyError("Error fetching contacts");
      });
  };

  const openModal = (contact = null) => {
    setSelectedContact(contact);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedContact(null);
  };

  const toggleMenu = (contactId) => {
    setOpenMenuId(openMenuId === contactId ? null : contactId);
  };

  const handleEdit = (contact) => {
    openModal(contact);
    setOpenMenuId(null);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setOpenMenuId(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    fetchContacts();
  }, []);

  return (
    <>
      <div className="px-3 mt-8">
        <h1 className="font-bold font-serif text-2xl">List of Contacts</h1>
        <div className="mt-4 bg-white p-4 shadow-md rounded-lg overflow-x-auto">
          <table className="min-w-full bg-white border-collapse text-sm">
            <thead>
              <tr className="bg-gray-100">
                <th className="py-2 px-4 border-b text-left">ID</th>
                <th className="py-2 px-4 border-b text-left">Name</th>
                <th className="py-2 px-4 border-b text-left">Email</th>
                <th className="py-2 px-4 border-b text-left">Message</th>
                <th className="py-2 px-4 border-b text-left">Sent at</th>
                <th className="py-2 px-4 border-b text-left">Updated at</th>
                <th className="py-2 px-4 border-b text-left">Action</th>
              </tr>
            </thead>
            <tbody>
              {contacts.map((contact) => (
                <tr
                  key={contact.id}
                  className="hover:bg-gray-50 transition-colors"
                >
                  <td className="py-2 px-4 border-b">{contact.id}</td>
                  <td className="py-2 px-4 border-b">{contact.name}</td>
                  <td className="py-2 px-4 border-b">{contact.email}</td>
                  <td className="py-2 px-4 border-b">{contact.message}</td>
                  <td className="py-2 px-4 border-b">
                    {formatDate(contact.created_at)}
                  </td>
                  <td className="py-2 px-4 border-b">
                    {formatDate(contact.updated_at)}
                  </td>
                  <td className="py-2 px-4 border-b relative">
                    <button
                      onClick={() => toggleMenu(contact.id)}
                      className="p-1 rounded-full text-gray-500 hover:text-black hover:bg-gray-100 transition"
                    >
                      <MdMoreVert size={20} />
                    </button>

                    {/* Dropdown Menu */}
                    {openMenuId === contact.id && (
                      <div
                        ref={menuRef}
                        className="absolute right-4 mt-2 w-32 bg-white border border-gray-200 rounded-md shadow-md z-10"
                      >
                        <button
                          onClick={() => handleEdit(contact)}
                          className="flex items-center w-full px-3 py-2 text-sm hover:bg-gray-100 transition-colors"
                        >
                          <MdEdit className="mr-2 text-gray-600" size={16} />
                          Edit
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Contact Modal */}
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
