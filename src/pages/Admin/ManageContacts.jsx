import { useState, useEffect } from "react";
import Layout from "../../components/Layout/Layout";
import AdminMenu from "../../components/Layout/AdminMenu";
import axios from "axios";
import toast from "react-hot-toast";
import { API_URL } from "../../api";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaEnvelope,
  FaPhone,
  FaUser,
  FaClock,
  FaCheckCircle,
  FaEye,
  FaTrash,
  FaFilter,
  FaSearch,
} from "react-icons/fa";

const ManageContacts = () => {
  const [contacts, setContacts] = useState([]);
  const [stats, setStats] = useState({
    total: 0,
    new: 0,
    read: 0,
    responded: 0,
    resolved: 0,
  });
  const [selectedContact, setSelectedContact] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [statusFilter, setStatusFilter] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
    total: 0,
    pages: 1,
  });
  const [loading, setLoading] = useState(false);

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isModalOpen]);

  // Get auth token
  const getAuthToken = () => {
    const auth = localStorage.getItem("auth");
    if (auth) {
      const parsedAuth = JSON.parse(auth);
      return parsedAuth.token;
    }
    return null;
  };

  // Fetch all contacts
  const fetchContacts = async (page = 1, status = "", search = "") => {
    try {
      setLoading(true);
      const token = getAuthToken();
      const { data } = await axios.get(`${API_URL}/api/contact/all`, {
        headers: { Authorization: `Bearer ${token}` },
        params: {
          page,
          limit: pagination.limit,
          status,
          sortBy: "createdAt",
          order: "desc",
        },
      });

      if (data.success) {
        // Filter by search term if provided
        let filteredContacts = data.contacts;
        if (search) {
          filteredContacts = data.contacts.filter(
            (contact) =>
              contact.name.toLowerCase().includes(search.toLowerCase()) ||
              contact.email.toLowerCase().includes(search.toLowerCase()) ||
              contact.phone.includes(search)
          );
        }

        setContacts(filteredContacts);
        setStats(data.stats);
        setPagination(data.pagination);
      }
    } catch (error) {
      console.error("Error fetching contacts:", error);
      toast.error("Failed to load contacts");
    } finally {
      setLoading(false);
    }
  };

  // View contact details
  const viewContact = async (id) => {
    try {
      const token = getAuthToken();
      const { data } = await axios.get(`${API_URL}/api/contact/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (data.success) {
        setSelectedContact(data.contact);
        setIsModalOpen(true);
        // Refresh list to update status
        fetchContacts(pagination.page, statusFilter, searchTerm);
      }
    } catch (error) {
      console.error("Error fetching contact:", error);
      toast.error("Failed to load contact details");
    }
  };

  // Update contact status
  const updateStatus = async (id, newStatus, notes = "") => {
    try {
      const token = getAuthToken();
      const { data } = await axios.put(
        `${API_URL}/api/contact/${id}/status`,
        { status: newStatus, adminNotes: notes },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (data.success) {
        toast.success("Status updated successfully");
        setSelectedContact(data.contact);
        fetchContacts(pagination.page, statusFilter, searchTerm);
      }
    } catch (error) {
      console.error("Error updating status:", error);
      toast.error("Failed to update status");
    }
  };

  // Delete contact
  const deleteContact = async (id) => {
    if (!window.confirm("Are you sure you want to delete this contact?"))
      return;

    try {
      const token = getAuthToken();
      const { data } = await axios.delete(`${API_URL}/api/contact/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (data.success) {
        toast.success("Contact deleted successfully");
        setIsModalOpen(false);
        fetchContacts(pagination.page, statusFilter, searchTerm);
      }
    } catch (error) {
      console.error("Error deleting contact:", error);
      toast.error("Failed to delete contact");
    }
  };

  useEffect(() => {
    fetchContacts(pagination.page, statusFilter, searchTerm);
  }, []);

  // Handle filter change
  const handleFilterChange = (status) => {
    setStatusFilter(status);
    setPagination({ ...pagination, page: 1 });
    fetchContacts(1, status, searchTerm);
  };

  // Handle search
  const handleSearch = (e) => {
    const term = e.target.value;
    setSearchTerm(term);
    fetchContacts(pagination.page, statusFilter, term);
  };

  // Format date
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-IN", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  // Status badge color
  const getStatusColor = (status) => {
    switch (status) {
      case "new":
        return "bg-blue-100 text-blue-800 border-blue-300";
      case "read":
        return "bg-yellow-100 text-yellow-800 border-yellow-300";
      case "responded":
        return "bg-purple-100 text-purple-800 border-purple-300";
      case "resolved":
        return "bg-green-100 text-green-800 border-green-300";
      default:
        return "bg-gray-100 text-gray-800 border-gray-300";
    }
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="lg:w-1/4">
            <AdminMenu />
          </div>

          <div className="lg:w-3/4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              {/* Header */}
              <div className="bg-white rounded-lg shadow-md p-6 mb-6">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">
                  Contact Form Submissions
                </h2>

                {/* Stats */}
                <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-6">
                  <div className="bg-gray-50 p-4 rounded-lg text-center">
                    <p className="text-2xl font-bold text-gray-900">
                      {stats.total}
                    </p>
                    <p className="text-sm text-gray-600">Total</p>
                  </div>
                  <div
                    className="bg-blue-50 p-4 rounded-lg text-center cursor-pointer hover:bg-blue-100"
                    onClick={() => handleFilterChange("new")}
                  >
                    <p className="text-2xl font-bold text-blue-600">
                      {stats.new}
                    </p>
                    <p className="text-sm text-blue-600">New</p>
                  </div>
                  <div
                    className="bg-yellow-50 p-4 rounded-lg text-center cursor-pointer hover:bg-yellow-100"
                    onClick={() => handleFilterChange("read")}
                  >
                    <p className="text-2xl font-bold text-yellow-600">
                      {stats.read}
                    </p>
                    <p className="text-sm text-yellow-600">Read</p>
                  </div>
                  <div
                    className="bg-purple-50 p-4 rounded-lg text-center cursor-pointer hover:bg-purple-100"
                    onClick={() => handleFilterChange("responded")}
                  >
                    <p className="text-2xl font-bold text-purple-600">
                      {stats.responded}
                    </p>
                    <p className="text-sm text-purple-600">Responded</p>
                  </div>
                  <div
                    className="bg-green-50 p-4 rounded-lg text-center cursor-pointer hover:bg-green-100"
                    onClick={() => handleFilterChange("resolved")}
                  >
                    <p className="text-2xl font-bold text-green-600">
                      {stats.resolved}
                    </p>
                    <p className="text-sm text-green-600">Resolved</p>
                  </div>
                </div>

                {/* Search and Filter */}
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="flex-1 relative">
                    <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Search by name, email, or phone..."
                      value={searchTerm}
                      onChange={handleSearch}
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    />
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleFilterChange("")}
                      className={`px-4 py-2 rounded-lg flex items-center gap-2 ${
                        statusFilter === ""
                          ? "bg-blue-600 text-white"
                          : "bg-gray-200 text-gray-700"
                      }`}
                    >
                      <FaFilter /> All
                    </button>
                  </div>
                </div>
              </div>

              {/* Contacts List */}
              {loading ? (
                <div className="text-center py-12">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
                  <p className="mt-4 text-gray-600">Loading contacts...</p>
                </div>
              ) : contacts.length > 0 ? (
                <>
                  <div className="space-y-4">
                    {contacts.map((contact) => (
                      <motion.div
                        key={contact._id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
                      >
                        <div className="flex justify-between items-start">
                          <div className="flex-1">
                            <div className="flex items-center gap-4 mb-3">
                              <h3 className="text-xl font-semibold text-gray-900">
                                {contact.name}
                              </h3>
                              <span
                                className={`px-3 py-1 rounded-full text-xs font-semibold border ${getStatusColor(
                                  contact.status
                                )}`}
                              >
                                {contact.status.toUpperCase()}
                              </span>
                            </div>

                            <div className="space-y-2 text-sm text-gray-600">
                              <div className="flex items-center gap-2">
                                <FaEnvelope className="text-gray-400" />
                                <span>{contact.email}</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <FaPhone className="text-gray-400" />
                                <span>{contact.phone}</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <FaClock className="text-gray-400" />
                                <span>{formatDate(contact.createdAt)}</span>
                              </div>
                            </div>

                            <p className="mt-3 text-gray-700 line-clamp-2">
                              {contact.message}
                            </p>
                          </div>

                          <div className="flex gap-2">
                            <button
                              onClick={() => viewContact(contact._id)}
                              className="p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                              title="View Details"
                            >
                              <FaEye />
                            </button>
                            <button
                              onClick={() => deleteContact(contact._id)}
                              className="p-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                              title="Delete"
                            >
                              <FaTrash />
                            </button>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>

                  {/* Pagination */}
                  {pagination.pages > 1 && (
                    <div className="mt-6 flex justify-center gap-2">
                      {Array.from(
                        { length: pagination.pages },
                        (_, i) => i + 1
                      ).map((page) => (
                        <button
                          key={page}
                          onClick={() =>
                            fetchContacts(page, statusFilter, searchTerm)
                          }
                          className={`px-4 py-2 rounded-lg ${
                            pagination.page === page
                              ? "bg-blue-600 text-white"
                              : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                          }`}
                        >
                          {page}
                        </button>
                      ))}
                    </div>
                  )}
                </>
              ) : (
                <div className="bg-white rounded-lg shadow-md p-12 text-center">
                  <FaEnvelope className="text-6xl text-gray-300 mx-auto mb-4" />
                  <p className="text-xl text-gray-600">No contacts found</p>
                  <p className="text-gray-500 mt-2">
                    Contacts will appear here once users submit the contact form
                  </p>
                </div>
              )}
            </motion.div>
          </div>
        </div>
      </div>

      {/* Contact Details Modal */}
      <AnimatePresence>
        {isModalOpen && selectedContact && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
            onClick={() => setIsModalOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-6 border-b border-gray-200">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900">
                      {selectedContact.name}
                    </h3>
                    <span
                      className={`inline-block mt-2 px-3 py-1 rounded-full text-xs font-semibold border ${getStatusColor(
                        selectedContact.status
                      )}`}
                    >
                      {selectedContact.status.toUpperCase()}
                    </span>
                  </div>
                  <button
                    onClick={() => setIsModalOpen(false)}
                    className="text-gray-400 hover:text-gray-600 text-2xl"
                  >
                    ×
                  </button>
                </div>
              </div>

              <div className="p-6 space-y-6">
                {/* Contact Info */}
                <div>
                  <h4 className="font-semibold text-gray-900 mb-3">
                    Contact Information
                  </h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2">
                      <FaEnvelope className="text-gray-400" />
                      <span className="text-gray-700">
                        {selectedContact.email}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <FaPhone className="text-gray-400" />
                      <span className="text-gray-700">
                        {selectedContact.phone}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <FaClock className="text-gray-400" />
                      <span className="text-gray-700">
                        Submitted on {formatDate(selectedContact.createdAt)}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Message */}
                <div>
                  <h4 className="font-semibold text-gray-900 mb-3">Message</h4>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="text-gray-700 whitespace-pre-wrap">
                      {selectedContact.message}
                    </p>
                  </div>
                </div>

                {/* Admin Notes */}
                <div>
                  <h4 className="font-semibold text-gray-900 mb-3">
                    Admin Notes
                  </h4>
                  <textarea
                    value={selectedContact.adminNotes}
                    onChange={(e) =>
                      setSelectedContact({
                        ...selectedContact,
                        adminNotes: e.target.value,
                      })
                    }
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    rows="4"
                    placeholder="Add internal notes about this contact..."
                  />
                </div>

                {/* Status Actions */}
                <div>
                  <h4 className="font-semibold text-gray-900 mb-3">
                    Update Status
                  </h4>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                    {["new", "read", "responded", "resolved"].map((status) => (
                      <button
                        key={status}
                        onClick={() =>
                          updateStatus(
                            selectedContact._id,
                            status,
                            selectedContact.adminNotes
                          )
                        }
                        className={`px-4 py-2 rounded-lg font-semibold ${
                          selectedContact.status === status
                            ? "bg-blue-600 text-white"
                            : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                        }`}
                      >
                        {status.charAt(0).toUpperCase() + status.slice(1)}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-3 pt-4 border-t border-gray-200">
                  <button
                    onClick={() =>
                      window.open(`mailto:${selectedContact.email}`, "_blank")
                    }
                    className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Reply via Email
                  </button>
                  <button
                    onClick={() => deleteContact(selectedContact._id)}
                    className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </Layout>
  );
};

export default ManageContacts;
