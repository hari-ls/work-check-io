import { useMutation } from "@apollo/client";
import { UPDATE_INFO } from "../utils/mutations";
import { useForm } from "../utils/hooks";
import Loading from "./Loading";

function UpdateInfo({ firstName, lastName, email, username }) {
  function invokeUpdateInfo() {
    updateInfo();
  }

  const { onChange, onSubmit, values } = useForm(invokeUpdateInfo, {
    firstName,
    lastName,
    email,
    username,
  });

  const [updateInfo, { loading }] = useMutation(UPDATE_INFO, {
    variables: {
      firstName: values.firstName,
      lastName: values.lastName,
      email: values.email,
      username: values.username,
    },
  });

  if (loading) return <Loading />;

  return (
    <div className="max-w-md pt-4">
      <div className="py-2">
        <h3 className="text-2xl font-bold">Update Information</h3>
      </div>
      <form onSubmit={onSubmit} className="max-w-md space-y-4">
        <div className="flex justify-between">
          <div>
            <label htmlFor="firstName" className="label">
              First Name
            </label>
            <input
              name="firstName"
              type="text"
              className="input input-bordered w-full"
              value={values.firstName}
              onChange={onChange}
            />
          </div>
          <div>
            <label htmlFor="lastName" className="label">
              Last Name
            </label>
            <input
              name="lastName"
              type="text"
              className="input input-bordered w-full"
              value={values.lastName}
              onChange={onChange}
            />
          </div>
        </div>
        <div>
          <label htmlFor="email" className="label">
            Email
          </label>
          <input
            name="email"
            type="text"
            className="input input-bordered w-full"
            value={values.email}
            onChange={onChange}
          />
        </div>
        <div>
          <label htmlFor="username" className="label">
            Username
          </label>
          <input
            name="username"
            type="text"
            className="input input-bordered w-full"
            value={values.username}
            onChange={onChange}
          />
        </div>
        <button className="btn">Update</button>
      </form>
    </div>
  );
}

export default UpdateInfo;
