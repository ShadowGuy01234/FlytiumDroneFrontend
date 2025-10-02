import Layout from "../../components/Layout/Layout";
import UserMenu from "../../components/Layout/UserMenu";
import { useState, useEffect } from "react";
import { useAuth } from "../../Context/auth";
import toast from "react-hot-toast";
import axios from "axios";
import { API_URL } from "../../api";
import { User, Mail, Phone, MapPin, Edit2, X, Save } from "lucide-react";

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

  const InfoCard = ({ label, value, field, icon: Icon, canEdit = true }) => (
    <div className="border-2 border-gray-900 p-6 group hover:bg-gray-50 transition-colors">
      <div className="flex justify-between items-start mb-4">
        <div className="flex items-center gap-3">
          <Icon className="w-5 h-5 text-gray-600" />
          <label className="text-sm font-bold uppercase tracking-wider text-gray-600">{label}</label>
        </div>
        {canEdit && (
          <button
            onClick={() => {
              setEditingField(field);
              setShowEditModal(true);
            }}
            className="p-2 border-2 border-gray-900 hover:bg-gray-900 hover:text-white transition-colors"
          >
            <Edit2 className="w-4 h-4" />
          </button>
        )}
      </div>
      <p className="text-lg font-medium text-gray-900">{value || 'Not provided'}</p>
    </div>
  );

  return (
    <Layout title={"Profile"} description={"Manage your profile"}>
      <div className="min-h-screen bg-white py-16">
        <div className="max-w-6xl mx-auto px-6">
          
          {/* Header */}
          <div className="mb-12 pb-8 border-b-2 border-gray-900">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-16 h-16 border-2 border-gray-900 flex items-center justify-center bg-gray-50">
                <User className="w-8 h-8" />
              </div>
              <div>
                <h1 className="text-4xl font-black text-gray-900">Profile</h1>
                <p className="text-gray-600">Manage your account information</p>
              </div>
            </div>
          </div>

          {/* Info Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <InfoCard
              label="Full Name"
              value={auth?.user?.name}
              field="name"
              icon={User}
            />
            <InfoCard
              label="Email Address"
              value={auth?.user?.email}
              field="email"
              icon={Mail}
              canEdit={false}
            />
            <InfoCard
              label="Phone Number"
              value={auth?.user?.phone}
              field="phone"
              icon={Phone}
            />
            <InfoCard
              label="Delivery Address"
              value={auth?.user?.address}
              field="address"
              icon={MapPin}
            />
          </div>

        </div>
      </div>

      {/* Edit Modal */}
      {showEditModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white border-2 border-gray-900 max-w-md w-full">
            
            {/* Modal Header */}
            <div className="border-b-2 border-gray-900 p-6 flex items-center justify-between">
              <h3 className="text-2xl font-black text-gray-900">
                Edit {editingField.charAt(0).toUpperCase() + editingField.slice(1)}
              </h3>
              <button
                onClick={() => setShowEditModal(false)}
                className="w-10 h-10 border-2 border-gray-900 flex items-center justify-center hover:bg-gray-900 hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <form onSubmit={handleSubmit} className="p-6">
              <div className="mb-6">
                <label className="block text-sm font-bold uppercase tracking-wider text-gray-600 mb-2">
                  {editingField.charAt(0).toUpperCase() + editingField.slice(1)}
                </label>
                {editingField === "address" ? (
                  <textarea
                    name={editingField}
                    value={formData[editingField]}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border-2 border-gray-300 focus:border-gray-900 focus:outline-none transition-colors resize-none"
                    rows="4"
                    required
                  />
                ) : (
                  <input
                    type={editingField === "phone" ? "tel" : "text"}
                    name={editingField}
                    value={formData[editingField]}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border-2 border-gray-300 focus:border-gray-900 focus:outline-none transition-colors"
                    required
                  />
                )}
              </div>

              <div className="flex gap-4">
                <button
                  type="button"
                  onClick={() => setShowEditModal(false)}
                  className="flex-1 px-6 py-4 border-2 border-gray-900 text-gray-900 font-bold hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="flex-1 group relative px-6 py-4 bg-gray-900 text-white font-bold overflow-hidden disabled:opacity-50"
                >
                  <span className="relative z-10 flex items-center justify-center gap-2">
                    {loading ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white border-t-transparent animate-spin" />
                        Saving...
                      </>
                    ) : (
                      <>
                        <Save className="w-4 h-4" />
                        Save Changes
                      </>
                    )}
                  </span>
                  {!loading && (
                    <div className="absolute inset-0 bg-gradient-to-r from-emerald-600 via-blue-600 to-purple-600 translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-500"></div>
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
