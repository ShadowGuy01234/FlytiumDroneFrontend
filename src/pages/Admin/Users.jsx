import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import AdminMenu from "../../components/Layout/AdminMenu";
import Layout from "../../components/Layout/Layout";
import axios from "axios";
import toast from "react-hot-toast";
import { API_URL } from "../../api";
import { useAuth } from "../../Context/auth";
import {
  FaUserCircle,
  FaSearch,
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaTimes,
} from "react-icons/fa";
import moment from "moment";

// StatCard Component with PropTypes
const StatCard = ({ title, value, bgColor }) => (
  <div
    className={`${bgColor} rounded-lg p-6 text-white shadow-md transform transition-transform hover:scale-105`}
  >
    <h3 className="text-lg font-semibold mb-2 text-white/90">{title}</h3>
    <p className="text-3xl font-bold">{value}</p>
  </div>
);

StatCard.propTypes = {
  title: PropTypes.string.isRequired,
  value: PropTypes.number.isRequired,
  bgColor: PropTypes.string.isRequired,
};

// Modal Component with PropTypes
const UserModal = ({ user, onClose }) => (
  <div
    className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
    onClick={onClose}
  >
    <div
      className="bg-white rounded-lg p-8 max-w-md w-full m-4 relative shadow-xl"
      onClick={(e) => e.stopPropagation()}
    >
      <button
        onClick={onClose}
        className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 transition-colors"
      >
        <FaTimes size={24} />
      </button>

      <div className="text-center mb-6">
        <FaUserCircle className="w-24 h-24 text-gray-400 mx-auto" />
        <h2 className="text-2xl font-bold mt-4">{user.name}</h2>
        <span
          className={`px-3 py-1 rounded-full text-sm font-semibold ${
            user.role === 1
              ? "bg-purple-100 text-purple-800"
              : "bg-green-100 text-green-800"
          }`}
        >
          {user.role === 1 ? "Admin" : "Customer"}
        </span>
      </div>

      <div className="space-y-4">
        <InfoRow icon={<FaEnvelope />} label="Email" value={user.email} />
        <InfoRow icon={<FaPhone />} label="Phone" value={user.phone} />
        <InfoRow
          icon={<FaMapMarkerAlt />}
          label="Address"
          value={user.address}
        />

        <div className="pt-4 border-t">
          <p className="text-sm text-gray-500">Member Since</p>
          <p className="text-gray-900 font-medium">
            {moment(user.createdAt).format("MMMM DD, YYYY")}
          </p>
        </div>
      </div>
    </div>
  </div>
);

UserModal.propTypes = {
  user: PropTypes.shape({
    name: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    phone: PropTypes.string.isRequired,
    address: PropTypes.string.isRequired,
    role: PropTypes.number.isRequired,
    createdAt: PropTypes.string.isRequired,
  }).isRequired,
  onClose: PropTypes.func.isRequired,
};

// InfoRow Component with PropTypes
const InfoRow = ({ icon, label, value }) => (
  <div className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50">
    <div className="text-gray-400">{icon}</div>
    <div className="flex-1">
      <p className="text-sm text-gray-500">{label}</p>
      <p className="text-gray-900 font-medium">{value}</p>
    </div>
  </div>
);

InfoRow.propTypes = {
  icon: PropTypes.node.isRequired,
  label: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
};

const Users = () => {
  const [users, setUsers] = useState([]);
  const [stats, setStats] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedUser, setSelectedUser] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const { auth } = useAuth();

  const getAllUsers = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${API_URL}/api/auth/users`, {
        headers: {
          Authorization: `Bearer ${auth?.token}`,
        },
      });
      if (response.data.success) {
        setUsers(response.data.users);
      }
    } catch (error) {
      console.error("Error fetching users:", error);
      toast.error("Error fetching users");
    } finally {
      setLoading(false);
    }
  };

  const getUserStats = async () => {
    try {
      const response = await axios.get(`${API_URL}/api/auth/user-stats`, {
        headers: {
          Authorization: `Bearer ${auth?.token}`,
        },
      });
      if (response.data.success) {
        setStats(response.data.stats);
      }
    } catch (error) {
      console.error("Error fetching user stats:", error);
      toast.error("Error fetching user statistics");
    }
  };

  useEffect(() => {
    getAllUsers();
    getUserStats();
  }, [auth?.token]);

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Layout title={"Users Management"} description={"Manage Users"}>
      <div className="min-h-screen bg-gray-50">
        <div className="flex flex-col md:flex-row">
          <div className="md:w-1/4 bg-white shadow-md">
            <AdminMenu />
          </div>

          <div className="md:w-3/4 p-6">
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-6">
                <div className="flex items-center gap-3">
                  <FaUserCircle className="text-blue-500 text-3xl" />
                  <h1 className="text-2xl font-bold text-gray-800">
                    Users Management
                  </h1>
                </div>
                <div className="relative w-full md:w-auto">
                  <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search users..."
                    className="w-full md:w-64 pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>

              {stats && (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                  <StatCard
                    title="Total Users"
                    value={stats.total}
                    bgColor="bg-gradient-to-r from-blue-500 to-blue-600"
                  />
                  <StatCard
                    title="Customers"
                    value={stats.customers}
                    bgColor="bg-gradient-to-r from-green-500 to-green-600"
                  />
                  <StatCard
                    title="Admins"
                    value={stats.admins}
                    bgColor="bg-gradient-to-r from-purple-500 to-purple-600"
                  />
                  <StatCard
                    title="New Users"
                    value={stats.newUsersLastMonth}
                    bgColor="bg-gradient-to-r from-orange-500 to-orange-600"
                  />
                </div>
              )}

              {loading ? (
                <div className="text-center py-12">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
                  <p className="mt-4 text-gray-600">Loading users...</p>
                </div>
              ) : (
                <div className="overflow-x-auto rounded-lg border border-gray-200">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          User
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Contact
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Role
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Joined
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {filteredUsers.map((user) => (
                        <tr
                          key={user._id}
                          className="hover:bg-gray-50 cursor-pointer transition-colors duration-200"
                          onClick={() => {
                            setSelectedUser(user);
                            setIsModalOpen(true);
                          }}
                        >
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <div className="flex-shrink-0 h-10 w-10">
                                <FaUserCircle className="h-10 w-10 text-gray-400" />
                              </div>
                              <div className="ml-4">
                                <div className="text-sm font-medium text-gray-900">
                                  {user.name}
                                </div>
                                <div className="text-sm text-gray-500">
                                  {user.email}
                                </div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">
                              {user.phone}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span
                              className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                user.role === 1
                                  ? "bg-purple-100 text-purple-800"
                                  : "bg-green-100 text-green-800"
                              }`}
                            >
                              {user.role === 1 ? "Admin" : "Customer"}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {moment(user.createdAt).format("MMM DD, YYYY")}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {isModalOpen && selectedUser && (
        <UserModal
          user={selectedUser}
          onClose={() => {
            setIsModalOpen(false);
            setSelectedUser(null);
          }}
        />
      )}
    </Layout>
  );
};

export default Users;
