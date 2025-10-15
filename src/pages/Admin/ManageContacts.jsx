import { useState, useEffect } from "react";
import Layout from "../../components/Layout/Layout";
import AdminMenu from "../../components/Layout/AdminMenu";
import axios from "axios";
import toast from "react-hot-toast";
import { API_URL } from "../../api";
import { Mail, Phone, User, Clock, CheckCircle, Eye, Trash2, Filter, Search, X } from "lucide-react";

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

  const getAuthToken = () => {
    const auth = localStorage.getItem("auth");
    if (auth) {
      const parsedAuth = JSON.parse(auth);
      return parsedAuth.token;
    }
    return null;
  };

  const fetchContacts = async (page = 1, status = "", search = "") => {
    try {
      setLoading(true);
      const token = getAuthToken();
      const { data } = await axios.get(`${API_URL}/api/contact/all`, {
        params: { page, limit: pagination.limit, status, search },
        headers: { Authorization: `Bearer ${token}` },
      });

      if (data.success) {
        setContacts(data.contacts);
        setStats(data.stats);
        setPagination({
          ...pagination,
          page: data.pagination.page,
          total: data.pagination.total,
          pages: data.pagination.pages,
        });
      }
    } catch (error) {
      console.error("Error fetching contacts:", error);
      toast.error("Failed to fetch contacts");
    } finally {
      setLoading(false);
    }
  };

  const viewContact = async (id) => {
    try {
      const token = getAuthToken();
      const { data } = await axios.get(`${API_URL}/api/contact/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (data.success) {
        setSelectedContact(data.contact);
        setIsModalOpen(true);

        if (data.contact.status === "new") {
          updateStatus(id, "read", data.contact.adminNotes);
        }
      }
    } catch (error) {
      console.error("Error viewing contact:", error);
      toast.error("Failed to load contact details");
    }
  };

  const updateStatus = async (id, status, adminNotes = "") => {
    try {
      const token = getAuthToken();
      const { data } = await axios.put(
        `${API_URL}/api/contact/${id}/status`,
        { status, adminNotes },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (data.success) {
        toast.success("Status updated successfully");
        setIsModalOpen(false);
        fetchContacts(pagination.page, statusFilter, searchTerm);
      }
    } catch (error) {
      console.error("Error updating status:", error);
      toast.error("Failed to update status");
    }
  };

  const deleteContact = async (id) => {
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

  const handleFilterChange = (status) => {
    setStatusFilter(status);
    setPagination({ ...pagination, page: 1 });
    fetchContacts(1, status, searchTerm);
  };

  const handleSearch = (e) => {
    const term = e.target.value;
    setSearchTerm(term);
    fetchContacts(pagination.page, statusFilter, term);
  };

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

  const getStatusColor = (status) => {
    switch (status) {
      case "new":
        return "bg-blue-950 border-blue-600 text-blue-400";
      case "read":
        return "bg-amber-950 border-amber-600 text-amber-400";
      case "responded":
        return "bg-purple-950 border-purple-600 text-purple-400";
      case "resolved":
        return "bg-emerald-950 border-emerald-600 text-emerald-400";
      default:
        return "bg-slate-800 border-slate-600 text-slate-400";
    }
  };

  return (
    <Layout>
      <div className="min-h-screen bg-slate-950">
        <div className="flex flex-col lg:flex-row">
          <div className="lg:w-1/4">
            <AdminMenu />
          </div>

          <div className="lg:w-3/4 p-8">
            {/* Header */}
            <div className="mb-8">
              <h1 className="text-4xl font-black text-white mb-2 flex items-center">
                <Mail className="w-10 h-10 mr-3 text-indigo-500" />
                Contact Submissions
              </h1>
              <p className="text-slate-400 text-lg">
                Manage customer inquiries and support requests
              </p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
              <div className="bg-slate-900 border-2 border-slate-800 p-6 hover:border-indigo-600 transition-all cursor-pointer" onClick={() => handleFilterChange("")}>
                <p className="text-3xl font-black text-white">{stats.total}</p>
                <p className="text-sm text-slate-400 font-bold">Total</p>
              </div>
              <div className="bg-slate-900 border-2 border-slate-800 p-6 hover:border-blue-500 transition-all cursor-pointer" onClick={() => handleFilterChange("new")}>
                <p className="text-3xl font-black text-blue-400">{stats.new}</p>
                <p className="text-sm text-blue-400 font-bold">New</p>
              </div>
              <div className="bg-slate-900 border-2 border-slate-800 p-6 hover:border-amber-500 transition-all cursor-pointer" onClick={() => handleFilterChange("read")}>
                <p className="text-3xl font-black text-amber-400">{stats.read}</p>
                <p className="text-sm text-amber-400 font-bold">Read</p>
              </div>
              <div className="bg-slate-900 border-2 border-slate-800 p-6 hover:border-purple-500 transition-all cursor-pointer" onClick={() => handleFilterChange("responded")}>
                <p className="text-3xl font-black text-purple-400">{stats.responded}</p>
                <p className="text-sm text-purple-400 font-bold">Responded</p>
              </div>
              <div className="bg-slate-900 border-2 border-slate-800 p-6 hover:border-emerald-500 transition-all cursor-pointer" onClick={() => handleFilterChange("resolved")}>
                <p className="text-3xl font-black text-emerald-400">{stats.resolved}</p>
                <p className="text-sm text-emerald-400 font-bold">Resolved</p>
              </div>
            </div>

            {/* Search and Filter */}
            <div className="bg-slate-900 border-2 border-slate-800 p-6 mb-8">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
                  <input
                    type="text"
                    placeholder="Search by name, email, or phone..."
                    value={searchTerm}
                    onChange={handleSearch}
                    className="w-full pl-10 pr-4 py-3 bg-slate-950 border-2 border-slate-800 text-white placeholder-slate-500 focus:border-indigo-600 focus:outline-none transition-colors"
                  />
                </div>
                <button
                  onClick={() => handleFilterChange("")}
                  className={`px-6 py-3 font-black border-2 flex items-center gap-2 transition-all ${
                    statusFilter === ""
                      ? "bg-indigo-600 text-white border-indigo-500"
                      : "bg-slate-950 text-slate-400 border-slate-800 hover:border-indigo-600"
                  }`}
                >
                  <Filter className="w-4 h-4" /> All
                </button>
              </div>
            </div>

            {/* Contacts List */}
            {loading ? (
              <div className="text-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto"></div>
                <p className="mt-4 text-slate-400">Loading contacts...</p>
              </div>
            ) : contacts.length > 0 ? (
              <>
                <div className="space-y-4">
                  {contacts.map((contact) => (
                    <div key={contact._id} className="bg-slate-900 border-2 border-slate-800 p-6 hover:border-indigo-600 transition-all">
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <div className="flex items-center gap-4 mb-3">
                            <h3 className="text-xl font-black text-white">{contact.name}</h3>
                            <span className={`px-3 py-1 text-xs font-black border-2 ${getStatusColor(contact.status)}`}>
                              {contact.status.toUpperCase()}
                            </span>
                          </div>

                          <div className="space-y-2 text-sm text-slate-400">
                            <div className="flex items-center gap-2">
                              <Mail className="w-4 h-4 text-cyan-500" />
                              <span>{contact.email}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Phone className="w-4 h-4 text-emerald-500" />
                              <span>{contact.phone}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Clock className="w-4 h-4 text-amber-500" />
                              <span>{formatDate(contact.createdAt)}</span>
                            </div>
                          </div>

                          <p className="mt-3 text-slate-300 line-clamp-2">{contact.message}</p>
                        </div>

                        <div className="flex gap-2">
                          <button
                            onClick={() => viewContact(contact._id)}
                            className="p-3 bg-cyan-950 border-2 border-cyan-600 text-cyan-400 hover:bg-cyan-600 hover:text-white transition-all"
                            title="View Details"
                          >
                            <Eye className="w-5 h-5" />
                          </button>
                          <button
                            onClick={() => {
                              if (window.confirm("Delete this contact?")) {
                                deleteContact(contact._id);
                              }
                            }}
                            className="p-3 bg-red-950 border-2 border-red-600 text-red-400 hover:bg-red-600 hover:text-white transition-all"
                            title="Delete"
                          >
                            <Trash2 className="w-5 h-5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Pagination */}
                {pagination.pages > 1 && (
                  <div className="mt-6 flex justify-center gap-2">
                    {Array.from({ length: pagination.pages }, (_, i) => i + 1).map((page) => (
                      <button
                        key={page}
                        onClick={() => fetchContacts(page, statusFilter, searchTerm)}
                        className={`px-4 py-2 font-black border-2 transition-all ${
                          pagination.page === page
                            ? "bg-indigo-600 text-white border-indigo-500"
                            : "bg-slate-900 text-slate-400 border-slate-800 hover:border-indigo-600"
                        }`}
                      >
                        {page}
                      </button>
                    ))}
                  </div>
                )}
              </>
            ) : (
              <div className="bg-slate-900 border-2 border-slate-800 p-12 text-center">
                <Mail className="w-16 h-16 text-slate-700 mx-auto mb-4" />
                <p className="text-xl text-white font-bold">No contacts found</p>
                <p className="text-slate-500 mt-2">Contacts will appear here once users submit the contact form</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Contact Details Modal */}
      {isModalOpen && selectedContact && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4" onClick={() => setIsModalOpen(false)}>
          <div className="bg-slate-900 border-2 border-slate-800 max-w-2xl w-full max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <div className="sticky top-0 bg-slate-900 border-b-2 border-slate-800 p-6 flex justify-between items-start">
              <div>
                <h3 className="text-2xl font-black text-white">{selectedContact.name}</h3>
                <span className={`inline-block mt-2 px-3 py-1 text-xs font-black border-2 ${getStatusColor(selectedContact.status)}`}>
                  {selectedContact.status.toUpperCase()}
                </span>
              </div>
              <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-white transition-colors">
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="p-6 space-y-6">
              {/* Contact Info */}
              <div>
                <h4 className="font-black text-white mb-3">Contact Information</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2 text-slate-300">
                    <Mail className="w-4 h-4 text-cyan-500" />
                    <span>{selectedContact.email}</span>
                  </div>
                  <div className="flex items-center gap-2 text-slate-300">
                    <Phone className="w-4 h-4 text-emerald-500" />
                    <span>{selectedContact.phone}</span>
                  </div>
                  <div className="flex items-center gap-2 text-slate-300">
                    <Clock className="w-4 h-4 text-amber-500" />
                    <span>Submitted on {formatDate(selectedContact.createdAt)}</span>
                  </div>
                </div>
              </div>

              {/* Message */}
              <div>
                <h4 className="font-black text-white mb-3">Message</h4>
                <div className="bg-slate-950 border-2 border-slate-800 p-4">
                  <p className="text-slate-300 whitespace-pre-wrap">{selectedContact.message}</p>
                </div>
              </div>

              {/* Admin Notes */}
              <div>
                <h4 className="font-black text-white mb-3">Admin Notes</h4>
                <textarea
                  value={selectedContact.adminNotes || ""}
                  onChange={(e) => setSelectedContact({ ...selectedContact, adminNotes: e.target.value })}
                  className="w-full p-3 bg-slate-950 border-2 border-slate-800 text-white placeholder-slate-500 focus:border-indigo-600 focus:outline-none transition-colors"
                  rows="4"
                  placeholder="Add internal notes about this contact..."
                />
              </div>

              {/* Status Actions */}
              <div>
                <h4 className="font-black text-white mb-3">Update Status</h4>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                  {["new", "read", "responded", "resolved"].map((status) => (
                    <button
                      key={status}
                      onClick={() => updateStatus(selectedContact._id, status, selectedContact.adminNotes)}
                      className={`px-4 py-2 font-black border-2 transition-all ${
                        selectedContact.status === status
                          ? "bg-indigo-600 text-white border-indigo-500"
                          : "bg-slate-950 text-slate-400 border-slate-800 hover:border-indigo-600"
                      }`}
                    >
                      {status.charAt(0).toUpperCase() + status.slice(1)}
                    </button>
                  ))}
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-3 pt-4 border-t-2 border-slate-800">
                <button
                  onClick={() => window.open(`mailto:${selectedContact.email}`, "_blank")}
                  className="flex-1 px-4 py-3 bg-gradient-to-r from-cyan-600 to-cyan-700 hover:from-cyan-700 hover:to-cyan-800 text-white font-black border-2 border-cyan-500 transition-all"
                >
                  Reply via Email
                </button>
                <button
                  onClick={() => {
                    if (window.confirm("Delete this contact?")) {
                      deleteContact(selectedContact._id);
                    }
                  }}
                  className="px-4 py-3 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-black border-2 border-red-500 transition-all"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
};

export default ManageContacts;
