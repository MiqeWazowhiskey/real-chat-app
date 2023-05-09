import { signInWithRedirect } from "firebase/auth";
import React from "react";
import { auth, provider } from "../../firebase";
import { Layout } from "../../components/Layout";
const Login = () => {
  const login = async () => {
    signInWithRedirect(auth, provider).catch((er) => alert(er));
  };
  return (
    <Layout>
      <div className="w-full h-full flex items-center flex-col justify-center ">
        <h1 className="text-blue-500 font-bold text-5xl absolute mr-[6px] mb-[6px]">
          ChatApp
        </h1>
        <h1 className="text-[#3f3658] font-bold text-5xl absolute ">ChatApp</h1>
        <div className="h-5/6 w-full flex items-center flex-col justify-around ">
          <span>
            <button
              className="text-3xl font-semibold text-[#FFFFFF] rounded-md bg-[#DB4437] hover:bg-[#f04b3c] p-5"
              onClick={login}
            >
              Login With Google
              <i className="fa-brands fa-google-plus-g ml-5"></i>
            </button>
          </span>
          <img
            src="Hotpot.png"
            className="object-cover w-[200px] h-[200px] rounded-full lg:mt-44"
          />
        </div>
      </div>
    </Layout>
  );
};

export default Login;
