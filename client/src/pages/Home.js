import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/authContext";

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
    <main>
      <div className="container flex flex-col px-6 py-8 max-w-7xl space-y-4 mx-auto">
        {user ? (
          <>
            <div className="pb-5 border-b-2 border-base-300 sm:flex sm:items-center sm:justify-between">
              <h2 className="text-4xl font-bold">
                Hello, {user.data.firstName} {user.data.lastName} (
                {user.data.username})
              </h2>
              <div className="mt-3 flex gap-4 sm:mt-0 sm:ml-4">
                <Link to="/journal">
                  <button type="button" className="btn">
                    View Journal
                  </button>
                </Link>
                <button type="button" className="btn btn-primary">
                  Check in
                </button>
              </div>
            </div>
            
            <div className="min-h-[1000px]">asldfhlkj</div>
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
    </main>
  );
}

export default Home;
