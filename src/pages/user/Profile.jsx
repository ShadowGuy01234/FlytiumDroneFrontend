import Layout from "../../components/Layout/Layout";
import UserMenu from "../../components/Layout/UserMenu";
import { useState, useEffect } from "react";
import { useAuth } from "../../Context/auth";
import toast from "react-hot-toast";
import axios from "axios";
import { API_URL } from "../../api";
import {
  FaUser,
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaEdit,
  FaTimes,
} from "react-icons/fa";

const Profile = () => {
  const { auth, setAuth } = useAuth();
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingField, setEditingField] = useState(null);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
  });

  useEffect(() => {
    if (auth?.user) {
      setFormData({
        name: auth.user.name || "",
        email: auth.user.email || "",
        phone: auth.user.phone || "",
        address: auth.user.address || "",
      });
    }
  }, [auth?.user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);

      // Validation
      if (editingField === "phone" && !/^\d{10}$/.test(formData.phone)) {
        toast.error("Please enter a valid 10-digit phone number");
        return;
      }

      const { data } = await axios.put(
        `${API_URL}/api/auth/update-profile`,
        { [editingField]: formData[editingField] },
        {
          headers: {
            Authorization: `Bearer ${auth?.token}`,
          },
        }
      );
      console.log(data);

      if (data?.success) {
        setAuth({ ...auth, user: data.updatedUser });
        let ls = localStorage.getItem("auth");
        ls = JSON.parse(ls);
        ls.user = data.updatedUser;
        localStorage.setItem("auth", JSON.stringify(ls));
        toast.success("Profile updated successfully", {
          style: {
            border: '1px solid #713200',
            padding: '16px',
            color: '#713200',
          },
          iconTheme: {
            primary: '#713200',
            secondary: '#FFFAEE',
          },
        });
        setShowEditModal(false);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "Error updating profile");
    } finally {
      setLoading(false);
    }
  };

  const InfoCard = ({ label, value, field, canEdit = true }) => (
    <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-all duration-300">
      <div className="flex justify-between items-start mb-2">
        <label className="text-gray-600 font-medium">{label}</label>
        {canEdit && (
          <button
            onClick={() => {
              setEditingField(field);
              setShowEditModal(true);
            }}
            className="text-blue-500 hover:text-blue-600 flex items-center gap-1 text-sm"
          >
            <FaEdit /> Edit
          </button>
        )}
      </div>
      <p className="">{value}</p>
    </div>
  );

  return (
    <Layout title={"Profile"} description={"Manage your profile"}>
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-6xl mx-auto px-4">
          <div className="bg-white rounded-2xl shadow-md overflow-hidden">
            <div className="bg-gradient-to-r from-blue-500 to-blue-600 p-6">
              <div className="flex items-center gap-3">
                <div className="bg-white p-3 rounded-full">
                  <FaUser className="text-blue-500 text-xl" />
                </div>
                <h1 className="text-2xl font-bold text-white">
                  Profile Details
                </h1>
              </div>
            </div>

            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <InfoCard
                  label="Full Name"
                  value={auth?.user?.name}
                  field="name"
                />
                <InfoCard
                  label="Email Address"
                  value={auth?.user?.email}
                  field="email"
                  canEdit={false}
                />
                <InfoCard
                  label="Phone Number"
                  value={auth?.user?.phone}
                  field="phone"
                />
                <InfoCard
                  label="Address"
                  value={auth?.user?.address}
                  field="address"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Edit Modal */}
      {showEditModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl max-w-md w-full mx-4 shadow-xl">
            <div className="bg-gradient-to-r from-blue-500 to-blue-600 p-4 rounded-t-xl flex justify-between items-center">
              <h3 className="text-xl font-semibold text-white">
                Edit{" "}
                {editingField.charAt(0).toUpperCase() + editingField.slice(1)}
              </h3>
              <button
                onClick={() => setShowEditModal(false)}
                className="text-white hover:text-gray-200"
              >
                <FaTimes size={20} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6">
              <div className="mb-6">
                {editingField === "address" ? (
                  <textarea
                    name={editingField}
                    value={formData[editingField]}
                    onChange={handleChange}
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    rows="3"
                    required
                  />
                ) : (
                  <input
                    type={editingField === "phone" ? "tel" : "text"}
                    name={editingField}
                    value={formData[editingField]}
                    onChange={handleChange}
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                )}
              </div>

              <div className="flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setShowEditModal(false)}
                  className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors flex items-center gap-2"
                >
                  {loading ? (
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  ) : (
                    "Save Changes"
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </Layout>
  );
};

export default Profile;
