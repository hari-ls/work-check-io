import { useMutation } from "@apollo/client";
import { CHANGE_PASSWORD } from "../utils/mutations";
import { useForm } from "../utils/hooks";
import Loading from "./Loading";

function ChangePassword(props) {
  function invokePassChange() {
    changePassword();
    values.newPassword = "";
    values.confirmNewPassword = "";
  }

  const { onChange, onSubmit, values } = useForm(invokePassChange, {
    newPassword: "",
    confirmNewPassword: "",
  });

  const [changePassword, { loading }] = useMutation(CHANGE_PASSWORD, {
    variables: {
      newPassword: values.newPassword,
      confirmNewPassword: values.confirmNewPassword,
    },
  });

  if (loading) return <Loading />;

  return (
    <div className="max-w-md pt-4">
      <div className="py-2">
        <h3 className="text-2xl font-bold">Change Password</h3>
      </div>
      <form onSubmit={onSubmit} className="max-w-md space-y-4">
        <div>
          <label htmlFor="newPassword" className="label">
            New password
          </label>
          <input
            type="password"
            name="newPassword"
            className="input input-bordered w-full"
            value={values.newPassword}
            onChange={onChange}
          />
        </div>
        <div>
          <label htmlFor="confirmNewPassword" className="label">
            Confirm new password
          </label>
          <input
            type="password"
            name="confirmNewPassword"
            className="input input-bordered w-full"
            value={values.confirmNewPassword}
            onChange={onChange}
          />
        </div>
        <button type="submit" className="btn">
          Change
        </button>
      </form>
    </div>
  );
}

export default ChangePassword;
