import { Outlet } from "react-router-dom";

const AdminLayout = () => {
  return (
    <>
      <header>Admin Navbar</header>
      <main>
        <Outlet />
      </main>
    </>
  );
};

export default AdminLayout;
