import { NavLink } from "react-router-dom";

const AdminNav = () => {
  return (
    <nav className="flex gap-4 border-b border-gray-300">
      <NavLink
        to="/admin/perfil"
        className={({ isActive }) =>
          `inline-block font-bold uppercase px-3 py-1 rounded 
          ${isActive ? "bg-indigo-600 text-white" : "text-gray-500"}`
        }
      >Perfil
      </NavLink>

      <NavLink
        to="/admin/cambiar-password"
        className={({ isActive }) =>
          `inline-block font-bold uppercase px-3 py-1 rounded 
          ${isActive ? "bg-indigo-600 text-white" : "text-gray-500"}`
        }
      >Cambiar Password
      </NavLink>
    </nav>
  );
};

export default AdminNav;