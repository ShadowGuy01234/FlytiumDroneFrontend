import { useEffect, useState } from "react";
import Layout from "../../components/Layout/Layout";
import AdminMenu from "../../components/Layout/AdminMenu";
import axios from "axios";
import toast from "react-hot-toast";
import { API_URL } from "../../api";
import { motion } from "framer-motion";
import { Plus, Edit2, Trash2 } from "lucide-react";

const CreateAd = () => {
  const [ads, setAds] = useState([]);
  const [formData, setFormData] = useState({ title: "", description: "", price: "", features: "", image: "" });
  const [updateId, setUpdateId] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [imagePreview, setImagePreview] = useState("");

  const getAllAds = async () => {
    try {
      const { data } = await axios.get(`${API_URL}/api/ad/get-ads`);
      if (data.success) setAds(data.ads || []);
    } catch {
      toast.error("Error fetching ads");
    }
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    try {
      setIsUploading(true);
      const uploadData = new FormData();
      uploadData.append("file", file);
      uploadData.append("upload_preset", "flytium");
      uploadData.append("cloud_name", "dhkpwi9ga");
      const response = await fetch("https://api.cloudinary.com/v1_1/dhkpwi9ga/image/upload", { method: "POST", body: uploadData });
      const data = await response.json();
      setFormData((prev) => ({ ...prev, image: data.secure_url }));
      setImagePreview(data.secure_url);
      toast.success("Image uploaded successfully");
    } catch {
      toast.error("Failed to upload image");
    } finally {
      setIsUploading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.title || !formData.description || !formData.price || !formData.features || !formData.image) {
      toast.error("All fields are required");
      return;
    }
    try {
      const { data } = updateId
        ? await axios.put(`${API_URL}/api/ad/update-ad/${updateId}`, formData)  
        : await axios.post(`${API_URL}/api/ad/create-ad`, formData); 
      if (data.success) {
        toast.success(updateId ? "Ad updated successfully" : "Ad created successfully");
        setIsModalOpen(false);
        getAllAds();
      }
    } catch {
      toast.error(updateId ? "Error updating ad" : "Error creating ad");
    }
  };

  const handleDeleteAd = async (id) => {
    if (window.confirm("Are you sure you want to delete this ad?")) {
      try {
        await axios.delete(`${API_URL}/api/ad/delete-ad/${id}`);
        toast.success("Ad deleted successfully");
        getAllAds();
      } catch {
        toast.error("Error deleting ad");
      }
    }
  };

  useEffect(() => {
    getAllAds();
  }, []);

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          <AdminMenu />
          <div className="lg:w-3/4 space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-gray-900">Ads</h2>
              <motion.button onClick={() => setIsModalOpen(true)} className="px-4 py-2 bg-blue-600 text-white rounded-lg flex items-center gap-2 hover:bg-blue-700">
                <Plus className="w-5 h-5" /> Add Ad
              </motion.button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {ads.length > 0 ? (
                ads.map((ad) => (
                  <motion.div key={ad._id} className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all">
                    <img src={ad.image} alt={ad.title} className="w-full h-40 object-cover rounded-t-xl" />
                    <div className="p-4">
                      <h3 className="font-semibold text-gray-900">{ad.title}</h3>
                      <p className="text-gray-700 text-sm">₹{ad.price}</p>
                      <p className="text-gray-700 text-sm">{ad.description}</p>
                      <p className="text-gray-700 text-sm">Features: {ad.features}</p>
                      <div className="flex justify-between items-center pt-2">
                        <button onClick={() => { setFormData(ad); setIsModalOpen(true); setUpdateId(ad._id); }} className="text-gray-600 hover:text-blue-600">
                          <Edit2 className="w-5 h-5" />
                        </button>
                        <button onClick={() => handleDeleteAd(ad._id)} className="text-gray-600 hover:text-red-600">
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))
              ) : (
                <p className="text-gray-600">No ads found.</p>
              )}
            </div>
          </div>
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-xl w-96">
            <h2 className="text-xl font-bold mb-4">{updateId ? "Edit Ad" : "Create Ad"}</h2>
            <input type="text" placeholder="Title" value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })} className="w-full p-2 mb-2 border rounded" />
            <textarea placeholder="Description" value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} className="w-full p-2 mb-2 border rounded" />
            <input type="text" placeholder="Price" value={formData.price} onChange={(e) => setFormData({ ...formData, price: e.target.value })} className="w-full p-2 mb-2 border rounded" />
            <textarea placeholder="Features (comma separated)" value={formData.features} onChange={(e) => setFormData({ ...formData, features: e.target.value })} className="w-full p-2 mb-2 border rounded" />
            <input type="file" onChange={handleImageUpload} className="w-full p-2 mb-2 border rounded" />
            {imagePreview && <img src={imagePreview} alt="Preview" className="w-full h-32 object-cover mb-2 rounded" />}
            <div className="flex justify-end gap-2">
              <button onClick={() => setIsModalOpen(false)} className="px-4 py-2 bg-gray-400 text-white rounded">Cancel</button>
              <button onClick={handleSubmit} className="px-4 py-2 bg-blue-600 text-white rounded">{updateId ? "Update" : "Save"}</button>
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
};

export default CreateAd;