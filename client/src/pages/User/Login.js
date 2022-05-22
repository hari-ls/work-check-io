import { useState, useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { AuthContext } from "../../context/authContext";
import { useForm } from "../../utils/hooks";
import { LOGIN } from "../../utils/mutations";

function Login(props) {
  const context = useContext(AuthContext);
  const navigate = useNavigate();
  const [errors, setErrors] = useState([]);

  function loginUserCB() {
    console.log("Callback hit");
    loginUser();
  }

  const { onChange, onSubmit, values } = useForm(loginUserCB, {
    username: "",
    password: "",
  });

  const [loginUser, { loading }] = useMutation(LOGIN, {
    update(proxy, { data: { login: userData } }) {
      context.login(userData);
      navigate("/");
    },
    onError({ graphQLErrors }) {
      setErrors(graphQLErrors);
    },
    variables: {
      username: values.username,
      password: values.password,
    },
  });

  useEffect(() => {
    if (context.user) {
      navigate("/");
    }
  }, [context.user, navigate]);

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
          <form className="space-y-2" onSubmit={onSubmit}>
            <div className="">
              <label htmlFor="username" className="label">
                Username
              </label>
              <input
                type="text"
                name="username"
                placeholder="username"
                className="input input-bordered w-full"
                onChange={onChange}
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
                onChange={onChange}
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
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M17 8l4 4m0 0l-4 4m4-4H3"
            />
          </svg>
        </Link>
      </div>
      {errors.map((error) => {
        return <li>{error.message}</li>;
      })}
    </div>
  );
}

export default Login;
