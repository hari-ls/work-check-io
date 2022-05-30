import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/authContext";

function Footer(props) {
  const { user } = useContext(AuthContext);

  return (
    <footer>
      {user ? (
        <div className="items-center py-4 px-6">
          <div className="footer py-4 max-w-7xl mx-auto border-t-2 border-base-300">
            <div className="items-center grid-flow-col">
              <p>Copyright © 2022 - All right reserved</p>
            </div>
            <div className="grid-flow-col gap-4 md:place-self-center md:justify-self-end">
              <Link to="/">Terms of Use</Link>
              <Link to="/">Privacy Policy</Link>
            </div>
          </div>
        </div>
      ) : (
        <></>
      )}
    </footer>
  );
}

export default Footer;
