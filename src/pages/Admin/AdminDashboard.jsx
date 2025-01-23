import AdminMenu from "../../components/Layout/AdminMenu";
import Layout from "../../components/Layout/Layout";
import { useAuth } from "../../Context/auth";
import { useState, useEffect } from "react";
import axios from "axios";
import { API_URL } from "../../api";
import { 
  FaUsers, 
  FaBoxes, 
  FaShoppingCart, 
  FaMoneyBillWave,
  FaChartLine,
  FaChartBar 
} from 'react-icons/fa';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from 'chart.js';
import { Line, Bar, Doughnut } from 'react-chartjs-2';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

const AdminDashboard = () => {
  const { auth } = useAuth();
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalProducts: 0,
    totalOrders: 0,
    totalRevenue: 0,
    recentOrders: [],
    monthlyRevenue: [],
    categoryStats: [],
    orderStatus: []
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardStats();
  }, []);

  const fetchDashboardStats = async () => {
    try {
      const { data } = await axios.get(`${API_URL}/api/auth/dashboard-stats`, {
        headers: {
          Authorization: `Bearer ${auth?.token}`
        }
      });
      setStats(data);
    } catch (error) {
      console.error("Error fetching stats:", error);
    } finally {
      setLoading(false);
    }
  };

  const revenueData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Monthly Revenue',
        data: stats.monthlyRevenue || [30000, 25000, 35000, 40000, 38000, 45000],
        borderColor: 'rgb(59, 130, 246)',
        backgroundColor: 'rgba(59, 130, 246, 0.1)',
        fill: true,
        tension: 0.4,
      },
    ],
  };

  const categoryData = {
    labels: ['Electronics', 'Clothing', 'Books', 'Food', 'Others'],
    datasets: [
      {
        label: 'Sales by Category',
        data: [300, 250, 200, 180, 120],
        backgroundColor: [
          'rgba(255, 99, 132, 0.8)',
          'rgba(54, 162, 235, 0.8)',
          'rgba(255, 206, 86, 0.8)',
          'rgba(75, 192, 192, 0.8)',
          'rgba(153, 102, 255, 0.8)',
        ],
      },
    ],
  };

  const StatCard = ({ title, value, icon: Icon, color }) => (
    <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 p-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-gray-500 text-sm">{title}</p>
          <h3 className="text-2xl font-bold mt-1">{value}</h3>
        </div>
        <div className={`p-3 rounded-full ${color}`}>
          <Icon className="text-white text-xl" />
        </div>
      </div>
    </div>
  );

  return (
    <Layout title="Admin Dashboard">
      <div className="min-h-screen bg-gray-50">
        <div className="flex flex-col md:flex-row">
          <div className="md:w-1/4 bg-white shadow-md">
            <AdminMenu />
          </div>
          
          <div className="flex-1 p-6">
            <div className="mb-6">
              <h1 className="text-2xl font-bold text-gray-800">Welcome back, {auth?.user?.name}</h1>
              <p className="text-gray-600">Here's what's happening with your store today.</p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
              <StatCard 
                title="Total Users" 
                value={stats.totalUsers}
                icon={FaUsers}
                color="bg-blue-500"
              />
              <StatCard 
                title="Total Products" 
                value={stats.totalProducts}
                icon={FaBoxes}
                color="bg-green-500"
              />
              <StatCard 
                title="Total Orders" 
                value={stats.totalOrders}
                icon={FaShoppingCart}
                color="bg-purple-500"
              />
              <StatCard 
                title="Total Revenue" 
                value={`$${stats.totalRevenue}`}
                icon={FaMoneyBillWave}
                color="bg-orange-500"
              />
            </div>

            {/* Charts Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
              <div className="bg-white p-6 rounded-xl shadow-sm">
                <h2 className="text-lg font-semibold mb-4">Revenue Overview</h2>
                <Line 
                  data={revenueData}
                  options={{
                    responsive: true,
                    plugins: {
                      legend: {
                        position: 'top',
                      },
                    },
                    scales: {
                      y: {
                        beginAtZero: true
                      }
                    }
                  }}
                />
              </div>

              <div className="bg-white p-6 rounded-xl shadow-sm">
                <h2 className="text-lg font-semibold mb-4">Sales by Category</h2>
                <Doughnut 
                  data={categoryData}
                  options={{
                    responsive: true,
                    plugins: {
                      legend: {
                        position: 'right',
                      },
                    }
                  }}
                />
              </div>
            </div>

           
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AdminDashboard;
