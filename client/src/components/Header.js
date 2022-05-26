import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/authContext";

function Header(props) {
  const { user, logout } = useContext(AuthContext);

  return (
    <header className="sticky top-0 w-full p-6">
      {user ? (
        <div className="bg-base-200 rounded-xl flex flex-row justify-between w-full py-4 px-6 shadow-md">
          <div className="flex items-center justify-center">
            <Link to="/" className="normal-case text-2xl">
              WorkCheck(In|Out)
            </Link>
          </div>
          <div>
            <div className="avatar placeholder cursor-pointer dropdown dropdown-end">
              <div
                tabIndex="0"
                className="bg-neutral-focus text-neutral-content rounded-full w-12"
              >
                <span>{user.data.firstName[0] + user.data.lastName[0]}</span>
              </div>
              <ul
                tabIndex="0"
                className="menu dropdown-content p-2 shadow bg-base-200 rounded-box w-52 mt-6"
              >
                <li>
                  <Link to="/profile">My Profile</Link>
                </li>
                <li>
                  <button
                    onClick={() => {
                      logout();
                    }}
                  >
                    Logout
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </div>
      ) : (
        <></>
      )}
    </header>
  );
}

export default Header;
