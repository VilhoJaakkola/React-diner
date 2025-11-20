import { NavLink } from "react-router-dom";

import { useAuthContext } from "../context/auth-context";

import "./NavLinks.css";

const NavLinks = () => {
  const { isLoggedIn, logout } = useAuthContext();

  return (
    <ul className="nav-links">
      <li>
        <NavLink to="/" exact>
          ALL FOODS
        </NavLink>
      </li>
      {isLoggedIn && (
        <li>
          <NavLink to="/foods/new" exact>
            ADD FOOD
          </NavLink>
        </li>
      )}
      {!isLoggedIn && (
        <li data-cy="authenticate">
          <NavLink to="/auth">AUTHENTICATE</NavLink>
        </li>
      )}
      {isLoggedIn && (
        <li data-cy="logout">
          <button onClick={logout}>LOGOUT</button>
        </li>
      )}
    </ul>
  );
};

export default NavLinks;
