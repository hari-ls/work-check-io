import { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { AuthContext } from "../context/authContext";
import { useForm } from "../utils/hooks";
import { REGISTER } from "../utils/mutations";

function Register(props) {
  const context = useContext(AuthContext);
  const navigate = useNavigate();
  const [errors, setErrors] = useState([]);

  const toggleBtnLoading = () => {
    document.getElementById("loginBtn").classList.toggle("loading");
  };

  function registerUserCB() {
    console.log("Callback hit");
    registerUser();
  }

  const { onChange, onSubmit, values } = useForm(registerUserCB, {
    firstName: "",
    lastName: "",
    email: "",
    username: "",
    password: "",
    confirmPassword: "",
  });
  // mutation
  const [registerUser, { loading }] = useMutation(REGISTER, {
    update(proxy, { data: { register: userData } }) {
      context.login(userData);
      toggleBtnLoading();
      navigate("/");
    },
    onError({ graphQLErrors }) {
      toggleBtnLoading();
      setErrors(graphQLErrors);
    },
    variables: {
      firstName: values.firstName.trim(),
      lastName: values.lastName.trim(),
      email: values.email.trim(),
      username: values.username.trim(),
      password: values.password,
      confirmPassword: values.confirmPassword,
    },
  });

  if (loading) {
    toggleBtnLoading();
  }

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
            Create a new account
          </h2>
        </div>
      </div>
      <div className="flex flex-col p-6 bg-base-200 max-w-md space-y-4 rounded-lg shadow-lg mx-auto">
        <div className="flex flex-col">
          <form className="space-y-2" onSubmit={onSubmit}>
            <div className="flex justify-between">
              <div className="">
                <label htmlFor="firstName" className="label">
                  First Name
                </label>
                <input
                  type="text"
                  name="firstName"
                  placeholder="John"
                  className="input input-bordered w-full"
                  onChange={onChange}
                  autoFocus
                />
              </div>
              <div className="">
                <label htmlFor="lastName" className="label">
                  Last Name
                </label>
                <input
                  type="text"
                  name="lastName"
                  placeholder="Doe"
                  className="input input-bordered w-full"
                  onChange={onChange}
                />
              </div>
            </div>
            <div className="">
              <label htmlFor="email" className="label">
                Email
              </label>
              <input
                type="text"
                name="email"
                placeholder="you@example.com"
                className="input input-bordered w-full"
                onChange={onChange}
              />
            </div>
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
            <div className="">
              <label htmlFor="confirmPassword" className="label">
                Confirm Password
              </label>
              <input
                type="password"
                name="confirmPassword"
                placeholder="*******"
                className="input input-bordered w-full"
                onChange={onChange}
              />
            </div>
            <div>
              <button type="submit" className="btn btn-block mt-4">
                Register
              </button>
            </div>
          </form>
        </div>
      </div>
      <div className="mt-12 text-center">
        <h3 className="text-sm tracking-wide font-semibold">
          Already have an account?
        </h3>
        <Link to="/login" className="mt-2 btn gap-2">
          Sign in
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
      {errors.map(function (error) {
        return <div>{error.message}</div>;
      })}
    </div>
  );
}

export default Register;
