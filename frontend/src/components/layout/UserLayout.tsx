import { Outlet } from "react-router-dom";

const UserLayout = () => {
  return (
    <>
      <header>User Navbar</header>
      <main>
        <Outlet />
      </main>
    </>
  );
};

export default UserLayout;
