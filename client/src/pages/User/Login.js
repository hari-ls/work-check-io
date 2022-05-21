import { useState, useEffect } from "react";
import AuthService from "../../utils/AuthService";

function Login(props) {
  // set local state for fields
  const [formState, setFormState] = useState({
    email: "",
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
    console.log(formState);
  }, [formState]);

  return (
    <div className="flex flex-col px-6 py-8 max-w-md space-y-4 rounded-lg shadow-lg mx-auto mt-12">
      <div className="flex flex-col">
        <form className="space-y-2" onSubmit={handleSubmission}>
          <div className="">
            <label htmlFor="email" className="label">
              Email address
            </label>
            <input
              type="text"
              name="email"
              placeholder="you@example.com"
              className="input input-bordered w-full"
              onChange={(e) =>
                setFormState({ ...formState, email: e.target.value })
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
              autoFocus
            />
          </div>
          <div>
            <button type="submit" className="btn btn-block">
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
