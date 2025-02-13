import {
  FiGrid,
  FiUsers,
  FiShoppingBag,
  FiCreditCard,
  FiLayers,
  FiMonitor,
} from "react-icons/fi";
import { motion } from "framer-motion";
import { NavLink } from "react-router-dom";
import "./sidebar.css";

const menuItems = [
  {
    title: "MAIN",
    items: [{ path: "/dashboard/admin", icon: <FiGrid />, label: "Dashboard" }],
  },
  {
    title: "LISTS",
    items: [
      { path: "/dashboard/admin/users", icon: <FiUsers />, label: "Users" },
      {
        path: "/dashboard/admin/category",
        icon: <FiLayers />,
        label: "Category",
      },
      {
        path: "/dashboard/admin/products",
        icon: <FiShoppingBag />,
        label: "Products",
      },
      {
        path: "/dashboard/admin/orders",
        icon: <FiCreditCard />,
        label: "Orders",
      },
      {
        path: "/dashboard/admin/hero",
        icon: <FiMonitor />,
        label: "Hero Slides",
      },
    ],
  },
];

const Sidebar = () => {
  return (
    <motion.div
      className="sidebar"
      initial={{ x: -300 }}
      animate={{ x: 0 }}
      transition={{ duration: 0.3 }}
    >
      <hr className="sidebar-divider" />
      <div className="sidebar-content">
        {menuItems.map((section, idx) => (
          <div key={idx} className="menu-section">
            <h3 className="section-title">{section.title}</h3>
            {section.items.map((item, index) => (
              <NavLink
                key={index}
                to={item.path}
                className={({ isActive }) =>
                  `menu-item ${isActive ? "active" : ""}`
                }
              >
                <motion.div
                  className="menu-item-content"
                  whileHover={{ x: 5 }}
                  transition={{ duration: 0.2 }}
                >
                  <span className="icon">{item.icon}</span>
                  <span className="label">{item.label}</span>
                </motion.div>
              </NavLink>
            ))}
          </div>
        ))}
      </div>
    </motion.div>
  );
};

export default Sidebar;
