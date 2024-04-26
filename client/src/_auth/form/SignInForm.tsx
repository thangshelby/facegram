import CustomButton from "../../components/ui/CustomButton";
import { useState} from "react";
import { useSelector } from "react-redux";
import { signIn } from "../../_root/userSlice";
import store from "../../redux/store";
const SignInForm = () => {
 
  // const [wrongEmail, setWrongEmail] = useState(false);
  // const [wrongPassWord, setWrongPassWord] = useState(false);

  const status= useSelector((state: { user: { status: string } }) =>state.user.status)




  const [email, setEmail] = useState("");
  const [password, setPassWord] = useState("");
  const [showPass, setShowPass] = useState(false);
 

  const handleSignIn = () => {
    const signInData = {
      email,
      password,
    };
    store.dispatch(signIn(signInData));
  };

  return (
    <div className="flex items-center justify-center flex-col">
      <img src="/assets/images/logo.svg" />
      <h2 className=" h3-bold md:h2-bold pt-5 sm:pt-10 ">
        Log in to your account
      </h2>
      <p className="text-light-3 md:base-regular small-medium mt-2 ">
        Welcome back! Please enter your details.
      </p>
      <form className="w-full space-y-6 flex flex-col mt-8">
        <div className="w-full  flex flex-col ">
          <div
            className={`${
              status=='wrongemail' ? "text-[#d93025] font-thin" : "shad-form_label  "
            }`}
          >
            {status=='wrongemail' ? "Email hoặc số điện thoại không chính xác" : "Email "}
          </div>
          <div
            className={`${
              status=='wrongemail'&& "w-full border-[#d93025] border-[1px] rounded-lg"
            }`}
          >
            <input
              className={`shad-input ${status!='wrongemail'&& "focus-visible:ring-1"}`}
              value={email}
              name="email"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
        </div>

        <div className="relative w-full flex flex-col">
          <div
            className={`${
            status=='wrongpassword'? "text-[#d93025] font-thin" : "shad-form_label"
            }`}
          >
            {status=='wrongpassword' ? "PassWord  không chính xác" : "PassWord"}
          </div>

          <div
            className={`${
            status=='wrongpassword' && "w-full border-[#d93025] border-[1px] rounded-lg"
            }`}
          >
            <input
              type={`${!showPass && "password"}`}
              autoComplete="off"
              className={`shad-input ${status!='wrongpassword' && "focus-visible:ring-1"}`}
              value={password}
              name="password"
              onChange={(e) => {
                setPassWord(e.target.value);
              }}
            />
          </div>

          {password && (
            <i
              onClick={() => {
                setShowPass(!showPass);
              }}
              className="hover:cursor-pointer  hover:opacity-50  absolute bottom-[15px]  right-[10px] fa-regular fa-eye "
            ></i>
          )}
        </div>

        <CustomButton
          handleClick={handleSignIn}
          titile="Log In"
          containerStyles="p-4px w-[420px] h-[40px] shad-button_primary 
            flex items-center justify-center"
          textStyles="font-semibold text capitalize"
        />
        <span className="flex justify-center items-center text-small-regular text-light-2">
          Don't have an account?
          <a
            className="text-primary-500"
            href="http://localhost:5173/auth/sign-up"
          >
            &nbsp;Sign Up
          </a>
        </span>
      </form>
    </div>
  );
};

export default SignInForm;
