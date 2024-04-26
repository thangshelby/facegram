
import { Navigate, Outlet } from "react-router-dom";
import { currentUserSelector } from "../redux/selectors";
import { useSelector } from "react-redux";

const AuthLayout = () => {
  const currentUser = useSelector(currentUserSelector)
  const isAuthenticated: boolean =  currentUser.userName!=''?false : true;
  return (
    <div>
      {isAuthenticated ? (
        <div className="relative flex flex-row">
          <section className="h-screen flex-1  flex justify-center items-center">
            <Outlet />
          </section>
          <img
            className="hidden xl:block h-screen 
            w-1/2 object-cover bg-no-repeat"
            alt="logo"
            src="/assets/images/side-img.svg"
            />
        </div>
      ) : (
        <Navigate to="/" />
      )}
    </div>
  );
};

export default AuthLayout;
