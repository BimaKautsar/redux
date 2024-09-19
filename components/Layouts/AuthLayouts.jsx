import { Link } from "react-router-dom";

const AuthLayouts = (props) => {
const { children, title, type } = props;
    return (
      <div className="flex justify-center bg-slate-700 min-h-screen items-center">
        <div className="w-full max-w-xs bg-white p-6 rounded-lg shadow-md max-w-md mx-auto">
          <h1 className="text-3xl font-bold mb-2 text-blue-500">{title}</h1>
          <p className="text-medium text-slate-700 mb-6">
            Welcome, Please enter your details
          </p>
          {children}
          <p className="text-sm mt-5 text-center">
            {type === "login"
              ? "Don't have an account? "
              : "Already have an account? "}

            {type === "login" && (
              <Link
                to="/register"
                className="text-blue-500 font-bold hover:text-blue-700"
              >
                Register
              </Link>
            )}

            {type === "register" && (
              <Link
                to="/login"
                className="text-blue-500 font-bold hover:text-blue-700"
              >
                Login
              </Link>
            )}
          </p>
        </div>
      </div>
    );
};

export default AuthLayouts;