import { NavLink, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectUserEmail } from "../redux/user/selectors";

export default function Home() {
  const email = useSelector(selectUserEmail);
  return (
    <div>
      <header className="flex flex-col md:flex-row items-center justify-between p-4 bg-gray-200">
        <h1 className="text-lg mb-4 md:mb-0"> Hello, {email}</h1>
        <div className="flex flex-col md:flex-row">
          <NavLink to="/" end={true}>
            About
          </NavLink>
        </div>
        <div className="flex flex-col md:flex-row">
          <NavLink to="/notes">Notes</NavLink>
        </div>
        <div className="flex flex-col md:flex-row">
          <NavLink to="/login" replace>
            Log Out
          </NavLink>
        </div>
      </header>
      <main>
        <Outlet />
      </main>
    </div>
  );
}
