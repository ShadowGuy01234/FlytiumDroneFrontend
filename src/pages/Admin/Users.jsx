import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import AdminMenu from "../../components/Layout/AdminMenu";
import Layout from "../../components/Layout/Layout";
import axios from "axios";
import toast from "react-hot-toast";
import { API_URL } from "../../api";
import { useAuth } from "../../Context/auth";
import {
  User as UserIcon,
  Search,
  Mail,
  Phone,
  MapPin,
  X,
  Shield,
  Users as UsersIcon,
  Calendar,
  TrendingUp
} from "lucide-react";
import moment from "moment";

// StatCard Component with PropTypes
const StatCard = ({ title, value, icon: Icon, accentColor }) => (
  <div className={`group relative bg-slate-900 border-2 border-slate-800 hover:border-${accentColor}-600 transition-all overflow-hidden`}>
    <div className="p-6">
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <p className="text-sm font-bold uppercase tracking-wider text-slate-400 mb-2">{title}</p>
          <h3 className="text-4xl font-black text-white">{value}</h3>
        </div>
        <div className={`p-3 border-2 border-${accentColor}-600 bg-${accentColor}-600/10`}>
          <Icon className={`w-6 h-6 text-${accentColor}-400`} />
        </div>
      </div>
    </div>
  </div>
);

StatCard.propTypes = {
  title: PropTypes.string.isRequired,
  value: PropTypes.number.isRequired,
  icon: PropTypes.elementType.isRequired,
  accentColor: PropTypes.string.isRequired,
};

// Modal Component with PropTypes
const UserModal = ({ user, onClose }) => (
  <div
    className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4"
    onClick={onClose}
  >
    <div
      className="bg-slate-900 border-2 border-slate-800 p-8 max-w-md w-full relative"
      onClick={(e) => e.stopPropagation()}
    >
      <button
        onClick={onClose}
        className="absolute top-4 right-4 p-2 border-2 border-slate-700 hover:border-red-500 text-slate-400 hover:text-red-400 transition-colors"
      >
        <X className="w-5 h-5" />
      </button>

      <div className="text-center mb-8 pb-8 border-b-2 border-slate-800">
        <div className="w-24 h-24 mx-auto mb-4 border-2 border-indigo-600 bg-indigo-600/10 flex items-center justify-center">
          <UserIcon className="w-12 h-12 text-indigo-400" />
        </div>
        <h2 className="text-3xl font-black text-white mb-3">{user.name}</h2>
        <span
          className={`px-4 py-2 border-2 font-bold ${
            user.role === 1
              ? "border-purple-500 bg-purple-500/10 text-purple-400"
              : "border-emerald-500 bg-emerald-500/10 text-emerald-400"
          }`}
        >
          {user.role === 1 ? "ADMIN" : "CUSTOMER"}
        </span>
      </div>

      <div className="space-y-4">
        <InfoRow icon={<Mail />} label="Email" value={user.email} />
        <InfoRow icon={<Phone />} label="Phone" value={user.phone} />
        <InfoRow
          icon={<MapPin />}
          label="Address"
          value={user.address}
        />

        <div className="pt-6 border-t-2 border-slate-800">
          <div className="flex items-center gap-3 mb-2">
            <Calendar className="w-5 h-5 text-cyan-400" />
            <p className="text-sm font-bold uppercase tracking-wider text-slate-400">Member Since</p>
          </div>
          <p className="text-lg font-black text-white">
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
  <div className="flex items-center gap-3 p-4 bg-slate-800/50 border-2 border-slate-800">
    <div className="text-indigo-400">{icon}</div>
    <div className="flex-1">
      <p className="text-xs font-bold uppercase tracking-wider text-slate-500">{label}</p>
      <p className="text-white font-medium mt-1">{value}</p>
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
      <div className="min-h-screen bg-slate-950">
        <div className="flex flex-col lg:flex-row">
          <div className="lg:w-1/5 bg-slate-900 border-r-2 border-slate-800">
            <AdminMenu />
          </div>

          <div className="flex-1 p-8">
            {/* Header */}
            <div className="mb-12 pb-8 border-b-2 border-slate-800">
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                <div className="flex items-center gap-4">
                  <div className="p-3 border-2 border-indigo-600 bg-indigo-600/10">
                    <UsersIcon className="w-8 h-8 text-indigo-400" />
                  </div>
                  <div>
                    <h1 className="text-5xl font-black text-white mb-2">Users</h1>
                    <p className="text-xl text-slate-400">Manage user accounts</p>
                  </div>
                </div>
                
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
                  <input
                    type="text"
                    placeholder="Search by name or email..."
                    className="pl-14 pr-6 py-4 bg-slate-900 border-2 border-slate-800 focus:border-indigo-600 text-white placeholder-slate-500 font-medium outline-none transition-colors w-96"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>
            </div>

            {/* Stats */}
            {stats && (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <StatCard
                  title="Total Users"
                  value={stats.total}
                  icon={UsersIcon}
                  accentColor="indigo"
                />
                <StatCard
                  title="Customers"
                  value={stats.customers}
                  icon={UserIcon}
                  accentColor="emerald"
                />
                <StatCard
                  title="Admins"
                  value={stats.admins}
                  icon={Shield}
                  accentColor="purple"
                />
                <StatCard
                  title="New Users"
                  value={stats.newUsersLastMonth}
                  icon={TrendingUp}
                  accentColor="amber"
                />
              </div>
            )}

            {/* Users Table */}
            {loading ? (
              <div className="border-2 border-slate-800 bg-slate-900 p-16 text-center">
                <div className="animate-spin rounded-full h-16 w-16 border-4 border-indigo-600 border-t-transparent mx-auto mb-4"></div>
                <p className="text-xl font-bold text-white">Loading users...</p>
              </div>
            ) : (
              <div className="bg-slate-900 border-2 border-slate-800 overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="min-w-full">
                    <thead className="bg-slate-800 border-b-2 border-slate-700">
                      <tr>
                        <th className="px-6 py-4 text-left text-xs font-black uppercase tracking-wider text-slate-400">
                          User
                        </th>
                        <th className="px-6 py-4 text-left text-xs font-black uppercase tracking-wider text-slate-400">
                          Contact
                        </th>
                        <th className="px-6 py-4 text-left text-xs font-black uppercase tracking-wider text-slate-400">
                          Role
                        </th>
                        <th className="px-6 py-4 text-left text-xs font-black uppercase tracking-wider text-slate-400">
                          Joined
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y-2 divide-slate-800">
                      {filteredUsers.map((user) => (
                        <tr
                          key={user._id}
                          className="hover:bg-slate-800/50 cursor-pointer transition-colors group"
                          onClick={() => {
                            setSelectedUser(user);
                            setIsModalOpen(true);
                          }}
                        >
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-4">
                              <div className="w-12 h-12 border-2 border-indigo-600 bg-indigo-600/10 flex items-center justify-center flex-shrink-0">
                                <UserIcon className="w-6 h-6 text-indigo-400" />
                              </div>
                              <div>
                                <div className="text-lg font-black text-white group-hover:text-indigo-400 transition-colors">
                                  {user.name}
                                </div>
                                <div className="text-sm text-slate-400 flex items-center gap-2">
                                  <Mail className="w-4 h-4" />
                                  {user.email}
                                </div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-2 text-slate-300">
                              <Phone className="w-4 h-4 text-cyan-400" />
                              {user.phone}
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <span
                              className={`px-3 py-1 border-2 text-xs font-bold ${
                                user.role === 1
                                  ? "border-purple-500 bg-purple-500/10 text-purple-400"
                                  : "border-emerald-500 bg-emerald-500/10 text-emerald-400"
                              }`}
                            >
                              {user.role === 1 ? "ADMIN" : "CUSTOMER"}
                            </span>
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-2 text-slate-400">
                              <Calendar className="w-4 h-4 text-amber-400" />
                              {moment(user.createdAt).format("MMM DD, YYYY")}
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
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
