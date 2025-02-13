import { useEffect, useState } from "react";
import Layout from "../../components/Layout/Layout";
import AdminMenu from "../../components/Layout/AdminMenu";
import axios from "axios";
import toast from "react-hot-toast";
import { API_URL } from "../../api";
import { FaPlus, FaEdit, FaTrash } from "react-icons/fa";
import { MdClose } from "react-icons/md";
import { Upload, X } from "lucide-react";

const CreateCategory = () => {
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [updateId, setUpdateId] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [image, setImage] = useState("");
  const [imagePreview, setImagePreview] = useState("");
  const [isUploading, setIsUploading] = useState(false);

  const getallCategory = async () => {
    try {
      const { data } = await axios.get(`${API_URL}/api/category/get-category`);
      if (data.success) {
        setCategories(data.category);
      }
    } catch (error) {
      console.log(error);
      toast.error("Error fetching categories");
    }
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    try {
      setIsUploading(true);
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", "flytium");
      formData.append("cloud_name", "dhkpwi9ga");

      const response = await fetch(
        "https://api.cloudinary.com/v1_1/dhkpwi9ga/image/upload",
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await response.json();
      setImage(data.secure_url);
      setImagePreview(data.secure_url);
      toast.success("Image uploaded successfully");
    } catch (error) {
      console.error("Error uploading image:", error);
      toast.error("Failed to upload image");
    } finally {
      setIsUploading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!image) {
        toast.error("Please upload an image");
        return;
      }

      if (updateId) {
        const { data } = await axios.put(
          `${API_URL}/api/category/update-category/${updateId}`,
          { name, image }
        );
        if (data.success) {
          toast.success("Category updated successfully");
          setUpdateId(null);
        }
      } else {
        const { data } = await axios.post(
          `${API_URL}/api/category/create-category`,
          { name, image }
        );
        if (data.success) {
          toast.success("Category created successfully");
        }
      }
      setName("");
      setImage("");
      setImagePreview("");
      setIsModalOpen(false);
      getallCategory();
    } catch (error) {
      console.log(error);
      toast.error(
        updateId ? "Error updating category" : "Error creating category"
      );
    }
  };

  const handleDeleteCategory = async (id) => {
    try {
      const confirmed = window.confirm(
        "Are you sure you want to delete this category?"
      );
      if (!confirmed) return;

      const { data } = await axios.delete(
        `${API_URL}/api/category/delete-category/${id}`
      );
      if (data.success) {
        toast.success("Category deleted successfully", {
          style: {
            border: "1px solid #713200",
            padding: "16px",
            color: "#713200",
          },
          iconTheme: {
            primary: "#713200",
            secondary: "#FFFAEE",
          },
        });
        getallCategory();
      }
    } catch (error) {
      console.log(error);
      toast.error("Error deleting category");
    }
  };

  const handleEditClick = (cat) => {
    setName(cat.name);
    setImage(cat.image);
    setImagePreview(cat.image);
    setUpdateId(cat._id);
    setIsModalOpen(true);
  };

  const filteredCategories = categories.filter((cat) =>
    cat.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  useEffect(() => {
    getallCategory();
  }, []);

  return (
    <Layout
      title={"Manage Categories"}
      description={"Create, Update, and Delete Categories"}
    >
      <div className="flex flex-col md:flex-row min-h-screen bg-gray-50">
        <div className="md:w-1/4 bg-white shadow-md">
          <AdminMenu />
        </div>

        <div className="md:w-3/4 p-6">
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-800">
                Categories Management
              </h2>
              <button
                onClick={() => {
                  setName("");
                  setUpdateId(null);
                  setIsModalOpen(true);
                }}
                className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors duration-300"
              >
                <FaPlus /> Add Category
              </button>
            </div>

            <div className="mb-4">
              <input
                type="text"
                placeholder="Search categories..."
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Image
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Category Name
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredCategories.map((cat) => (
                    <tr
                      key={cat._id}
                      className="hover:bg-gray-50 transition-colors duration-200"
                    >
                      <td className="px-6 py-4 whitespace-nowrap">
                        <img
                          src={cat.image}
                          alt={cat.name}
                          className="h-12 w-12 object-cover rounded-lg"
                        />
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {cat.name}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <button
                          onClick={() => handleEditClick(cat)}
                          className="text-blue-600 hover:text-blue-900 mx-2 transition-colors duration-200"
                        >
                          <FaEdit size={18} />
                        </button>
                        <button
                          onClick={() => handleDeleteCategory(cat._id)}
                          className="text-red-600 hover:text-red-900 mx-2 transition-colors duration-200"
                        >
                          <FaTrash size={18} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-8 max-w-md w-full m-4 relative">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 transition-colors duration-200"
            >
              <MdClose size={24} />
            </button>

            <h2 className="text-2xl font-bold mb-6 text-gray-800">
              {updateId ? "Update Category" : "Create New Category"}
            </h2>

            <form onSubmit={handleSubmit}>
              <div className="mb-6">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Category Image
                </label>
                <div className="space-y-4">
                  {imagePreview && (
                    <div className="w-full h-48 rounded-lg overflow-hidden bg-gray-100">
                      <img
                        src={imagePreview}
                        alt="Preview"
                        className="w-full h-full object-contain"
                      />
                    </div>
                  )}
                  <div className="flex items-center space-x-4">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                      id="image-upload"
                    />
                    <label
                      htmlFor="image-upload"
                      className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg cursor-pointer hover:bg-gray-200 transition-colors duration-200 flex items-center gap-2"
                    >
                      <Upload className="w-5 h-5" />
                      {image ? "Change Image" : "Upload Image"}
                    </label>
                    {imagePreview && (
                      <button
                        type="button"
                        onClick={() => {
                          setImagePreview("");
                          setImage("");
                        }}
                        className="px-4 py-2 text-red-600 hover:text-red-700 transition-colors duration-200"
                      >
                        Remove
                      </button>
                    )}
                  </div>
                </div>
              </div>

              <div className="mb-6">
                <label
                  htmlFor="categoryName"
                  className="block text-gray-700 text-sm font-bold mb-2"
                >
                  Category Name
                </label>
                <input
                  type="text"
                  id="categoryName"
                  name="categoryName"
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter category name"
                  required
                />
              </div>

              <div className="flex justify-end gap-4">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50 transition-colors duration-200"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-lg bg-blue-500 text-white hover:bg-blue-600 transition-colors duration-200"
                >
                  {updateId ? "Update Category" : "Create Category"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </Layout>
  );
};

export default CreateCategory;
