import CustomButton from "../../../components/ui/CustomButton";
import { useState } from "react";
import { signUp } from "../../../_root/userSlice";
import store from "../../../redux/store";
import ScrapData from "./ScrapData";

const SignUpForm = () => {
  const [isScrap, setIsSrap] = useState<boolean>(false);

  const [user, setUser] = useState({
    name: "",
    userName: "",
    email: "",
    password: "",
  });


  const handleSignUp = () => {
    const signUpInfo: object = {
      name: user.name,
      userName: user.userName,
      email: user.email,
      password: user.password,
    };

    store.dispatch(signUp(signUpInfo));

    setUser({
      name: "",
      userName: "",
      email: "",
      password: "",
    });
  };

  return (
    <div 
    onClick={()=>{
      setIsSrap(false)
    }}
    className="flex items-center justify-center h-screen flex-col ">
      <img src="../public/assets/images/logo.s  vg" />
      <h2 className=" h3-bold md:h2-bold pt-5 sm:pt-10 ">
        Create a new account
      </h2>
      <p className="text-light-3 md:base-regular small-medium mt-2 ">
        To use snapgram, Please enter your details
      </p>
      <form className="w-full h-screen overflow-scroll custom-scrollbar space-y-6 flex flex-col mt-8">
        
        <div className="w-full  flex flex-col">
          <label className="shad-form_label">Name</label>
          <input
            className="shad-input rounded-lg"
            value={user.name}
            name="name"
            onChange={(e) => setUser({ ...user, name: e.target.value })}
          />
        </div>
        <div className="w-full  flex flex-col">
          <label className="shad-form_label">Username</label>
          <input
            className="shad-input rounded-lg"
            value={user.userName}
            name="username"
            onChange={(e) => setUser({ ...user, userName: e.target.value })}
          />
        </div>
        <div className="w-full flex flex-col">
          <label className="shad-form_label">Email</label>
          <input
            className="shad-input rounded-lg"
            value={user.email}
            name="email"
            onChange={(e) => setUser({ ...user, email: e.target.value })}
          />
        </div>

        <div className="w-full flex flex-col">
          <label className="shad-form_label">Password</label>
          <input
            className="shad-input rounded-lg"
            value={user.password}
            name="password"
            onChange={(e) => setUser({ ...user, password: e.target.value })}
          />
        </div>

        <div className="flex flex-row items-center gap-1">
          <input
            className="outline-none rounded-xl"
            type="checkbox"
            checked={isScrap}
            
            onChange={() => {
              setIsSrap(!isScrap);
            }}
          />
          <label>Do you want to get information from anyone ?</label>
        </div>
        {isScrap && <ScrapData   />}

        <CustomButton
          handleClick={() => handleSignUp()}
          titile="Sign Up"
          containerStyles="p-4px w-[420px] h-[40px] shad-button_primary 
          flex items-center justify-center"
          textStyles="font-semibold text capitalize"
        />
        <span className="flex justify-center items-center text-small-regular text-light-2">
          Already have an account?
          <a
            className="text-primary-500"
            href="http://localhost:5173/auth/sign-in"
          >
            &nbsp;Log in
          </a>
        </span>
      </form> 
    </div>
  );
};

export default SignUpForm;
