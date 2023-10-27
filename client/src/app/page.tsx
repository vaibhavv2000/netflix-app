"use client";

import {NextPage} from "next";
import {useState,FormEvent,useEffect,ChangeEvent} from "react";
import {AiTwotoneEye,AiTwotoneEyeInvisible} from "react-icons/ai";
import Link from "next/link";
import {redirect} from "next/navigation";
import {AppDispatch,RootState} from "@/redux/store";
import {useDispatch,useSelector} from "react-redux";

const AppPage: NextPage = () => {
  const [user,setUser] = useState({email: "",password: ""});
  const [showPwd,setShowPWd] = useState<boolean>(false);
  const [rememberMe,setRememberMe] = useState<boolean>(false);
  const [error,setError] = useState<string>("");

  const c_user = useSelector((state: RootState) => state.user);
  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    if(c_user.name) redirect("/home");
  },[c_user.name]);

  useEffect(() => {
    const user = localStorage.getItem("netflix");
    if(user) dispatch({type: "LOGIN",payload: JSON.parse(user)});

    document.title = `Sign In`;
  },[]);

  useEffect(() => {
    if(error) setTimeout(() => setError(""),5000);
  },[error]);

  const handleLogin = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const {email,password} = user;

    if(!email || !password) return setError("All fields are required");

    dispatch({
      type: "USER_LOGIN",
      payload: {email,password,type: "login",rememberMe},
    });
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setUser((p) => ({...p,[e.target.name]: e.target.value}));
  };

  return (
    <div
      className="h-screen w-full grid place-items-center"
      style={{
        backgroundImage: "url(https://cdn.mos.cms.futurecdn.net/rDJegQJaCyGaYysj2g5XWY.jpg)",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
      }}
    >
      <form
        className="bg-[rgba(0,0,0,0.8)] w-[95%] xs:w-80 flex flex-col p-5 gap-6 shadow-xl  xxl:scale-150"
        onSubmit={handleLogin}
      >
        <h1 className="text-center text-[red] font-lora text-5xl font-semibold">Login</h1>
        <input
          className="border-none outline-none p-3 text-[17.5px] text-black w-[95%] xs:w-full"
          placeholder="Email"
          onChange={handleChange}
          name="email"
        />
        <div className="relative">
          <input
            type={showPwd ? "text" : "password"}
            className="border-none xs:w-full outline-none p-3 text-[17.5px] text-black pr-10 w-[95%]"
            placeholder="Password"
            onChange={handleChange}
            name="password"
          />
          <span
            className="absolute top-0 right-0 w-10 cursor-pointer h-full grid place-items-center z-50"
            onClick={() => setShowPWd(!showPwd)}
          >
            {showPwd ? (
              <AiTwotoneEyeInvisible size={26} color="#111" />
            ) : (
              <AiTwotoneEye size={26} color="#111" />
            )}
          </span>
        </div>
        <div className="flex items-center space-x-2 -my-2">
          <input
            type="checkbox"
            className="cursor-pointer scale-125"
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setRememberMe(e.target.checked)
            }
          />
          <span className="text-white/80 text-sm">Remember me</span>
        </div>
        {error &&
          <p className="text-red-600 text-sm -my-3 font-semibold">
            {error || c_user.error}
          </p>
        }
        {c_user.error &&
          <p className="text-red-600 text-sm -my-3 font-semibold">
            {error || c_user.error}
          </p>
        }
        <button className="bg-[red] text-white border-none font-lora outline-none p-3 font-bold">
          Login
        </button>
        <p className="-my-2 text-center text-sm text-white">
          <span className="mr-2 text-white/80">Don&apos;t have an Account?</span>
          <Link href={"/register"} className="underline hover:text-red-500">
            Register
          </Link>
        </p>
      </form>
    </div>
  );
};

export default AppPage;
