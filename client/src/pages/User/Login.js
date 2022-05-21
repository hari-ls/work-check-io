import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import AuthService from "../../utils/AuthService";
import { LOGIN } from "../../utils/mutations";

function Login(props) {
  // set local state for fields
  const [formState, setFormState] = useState({
    username: "",
    password: "",
  });
  // handle submission event
  const handleSubmission = async (event) => {
    event.preventDefault();
    try {
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    const isLoggedInState = AuthService.loggedIn();
    console.log(formState);
    console.log(isLoggedInState);
  }, [formState]);

  return (
    <div>
      <div className="min-h-full flex flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <img
            className="mx-auto h-12 w-auto"
            src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg"
            alt="Workflow"
          />
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Sign in to your account
          </h2>
        </div>
      </div>
      <div className="flex flex-col p-6 bg-base-200 max-w-md space-y-4 rounded-lg shadow-lg mx-auto">
        <div className="flex flex-col">
          <form className="space-y-2" onSubmit={handleSubmission}>
            <div className="">
              <label htmlFor="username" className="label">
                Username
              </label>
              <input
                type="text"
                name="username"
                placeholder="username"
                className="input input-bordered w-full"
                onChange={(e) =>
                  setFormState({
                    ...formState,
                    username: e.target.value.trim(),
                  })
                }
                autoFocus
              />
            </div>
            <div className="">
              <label htmlFor="username" className="label">
                Password
              </label>
              <input
                type="password"
                name="password"
                placeholder="*******"
                className="input input-bordered w-full"
                onChange={(e) =>
                  setFormState({ ...formState, password: e.target.value })
                }
              />
            </div>
            <div>
              <button type="submit" className="btn btn-block mt-4">
                Login
              </button>
            </div>
          </form>
        </div>
      </div>
      <div className="mt-12 text-center">
        <h3 className="text-sm tracking-wide font-semibold">
          Haven't signed up yet?
        </h3>
        <Link to="/register" className="mt-2 btn gap-2">
          Create account
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            stroke-width="2"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M17 8l4 4m0 0l-4 4m4-4H3"
            />
          </svg>
        </Link>
      </div>
    </div>
  );
}

export default Login;
