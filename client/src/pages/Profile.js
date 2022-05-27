import { useContext, useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/authContext";
import { useQuery, gql } from "@apollo/client";
import { USER_INFO } from "../utils/queries";
import Loading from "../components/Loading";

function Profile(props) {
  const { user } = useContext(AuthContext);

  const navigate = useNavigate();

  const [editUser, setEditUser] = useState(false);
  const [editPassword, setEditPassword] = useState(false);

  useEffect(() => {
    setEditUser(false);
    setEditPassword(false);
    console.log(editUser, editPassword);
  }, []);

  // const USER_INFO = gql`
  //   query User {
  //     user {
  //       username
  //       firstName
  //       lastName
  //       email
  //     }
  //   }
  // `;

  const { loading, data } = useQuery(USER_INFO, {
    onCompleted(data) {
      console.log(data.user);
    },
    skip: !user,
  });

  if (loading) return <Loading />;

  return (
    <main>
      <div className="container flex flex-col px-6 py-8 max-w-7xl space-y-4 mx-auto">
        {user ? (
          <div>
            <div className="pb-5 border-b-2 border-base-300 sm:flex sm:items-center sm:justify-between">
              <div className="mt-3 flex flex-auto">
                <h2 className="text-4xl font-bold">My Profile</h2>
              </div>
              <div className="mt-3 flex flex-auto gap-4 sm:mt-0 sm:ml-4 w-auto justify-end">
                <button
                  type="button"
                  className="btn"
                  onClick={() => navigate(-1)}
                >
                  Go Back
                </button>
              </div>
            </div>
            {data.user ? (
              <div>
                <p>{data.user.username}</p>
                <p>{data.user.firstName}</p>
                <p>{data.user.lastName}</p>
                <p>{data.user.email}</p>
              </div>
            ) : (
              <></>
            )}
          </div>
        ) : (
          <Navigate to="/login" replace={true} />
        )}
      </div>
    </main>
  );
}

export default Profile;
