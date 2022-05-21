import { Link } from "react-router-dom";

function Home(props) {
  return (
    <div>
      <div className="flex flex-col px-6 py-8 bg-base-200 max-w-md space-y-4 rounded-lg shadow-lg mx-auto mt-32">
        <h3 className="text-sm tracking-wide font-semibold">
          Head to sign in...
        </h3>
        <Link to="/login">
          <button className="mt-2 btn gap-2">Login</button>
        </Link>
      </div>
    </div>
  );
}

export default Home;
