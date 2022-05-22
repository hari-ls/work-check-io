import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/authContext";

function Home(props) {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const onLogout = () => {
    logout();
  };
  const toLogin = () => {
    navigate("/login");
  };
  console.log(user);
  return (
    <div>
      <div className="flex flex-col px-6 py-8 bg-base-200 max-w-md space-y-4 rounded-lg shadow-lg mx-auto mt-32">
        {user ? (
          <>
            <h3 className="text-sm tracking-wide font-semibold">
              Hello, {user.data.firstName} {user.data.lastName} (
              {user.data.username})
            </h3>
            <button className="mt-2 btn gap-2" onClick={onLogout}>
              Logout
            </button>
          </>
        ) : (
          <>
            <h3 className="text-sm tracking-wide font-semibold">
              User not logged in!!!
            </h3>
            <button className="mt-2 btn gap-2" onClick={toLogin}>
              Login
            </button>
          </>
        )}
      </div>
    </div>
  );
}

export default Home;
