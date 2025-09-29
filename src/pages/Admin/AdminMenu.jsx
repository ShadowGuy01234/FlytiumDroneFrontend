import { NavLink } from "react-router-dom";

const AdminMenu = () => {
  return (
    <div className="text-center">
      <div className="list-group">
        <h3>Admin Panel</h3>
        <NavLink
          to="/dashboard/admin/create-category"
          className="list-group-item"
        >
          Create Category
        </NavLink>
        <NavLink
          to="/dashboard/admin/create-product"
          className="list-group-item"
        >
          Create Product
        </NavLink>
        <NavLink to="/dashboard/admin/products" className="list-group-item">
          Products
        </NavLink>
        <NavLink to="/dashboard/admin/hero" className="list-group-item">
          Manage Hero
        </NavLink>
        <NavLink to="/dashboard/admin/users" className="list-group-item">
          Users
        </NavLink>
        <NavLink to="/dashboard/admin/orders" className="list-group-item">
          Orders
        </NavLink>
        <NavLink to="/dashboard/admin/jobs" className="list-group-item">
          Manage Jobs
        </NavLink>
        <NavLink
          to="/dashboard/admin/job-applications"
          className="list-group-item"
        >
          Job Applications
        </NavLink>
      </div>
    </div>
  );
};

export default AdminMenu;
