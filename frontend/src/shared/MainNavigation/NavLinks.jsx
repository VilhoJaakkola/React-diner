import { NavLink } from "react-router-dom";

import { useAuthContext } from "../context/auth-context";

const linkClass =
  "border border-transparent text-[#292929] no-underline p-2 " +
  "hover:bg-[#ffd900] hover:border-[#292929] hover:text-[#292929] " +
  "[&.active]:bg-[#ffd900] [&.active]:border-[#292929] " +
  "md:text-white";

const buttonClass =
  "cursor-pointer border border-[#292929] text-[#292929] bg-transparent p-2 [font:inherit] " +
  "focus:outline-none hover:bg-[#292929] hover:text-white active:bg-[#292929] active:text-white " +
  "md:border-white md:text-white md:hover:bg-[#ffd900] md:hover:text-[#292929]";

const liClass = "m-4 md:my-0 md:mx-2";

const NavLinks = () => {
  const { isLoggedIn, logout } = useAuthContext();

  return (
    <ul className="list-none m-0 p-0 w-full h-full flex flex-col justify-center items-center md:flex-row">
      <li className={liClass}>
        <NavLink to="/" exact className={linkClass}>
          ALL FOODS
        </NavLink>
      </li>
      {isLoggedIn && (
        <li className={liClass}>
          <NavLink to="/foods/new" exact className={linkClass}>
            ADD FOOD
          </NavLink>
        </li>
      )}
      {!isLoggedIn && (
        <li className={liClass} data-cy="authenticate">
          <NavLink to="/auth" className={linkClass}>AUTHENTICATE</NavLink>
        </li>
      )}
      {isLoggedIn && (
        <li className={liClass} data-cy="logout">
          <button onClick={logout} className={buttonClass}>LOGOUT</button>
        </li>
      )}
    </ul>
  );
};

export default NavLinks;
