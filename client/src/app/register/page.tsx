"use client";

import {NextPage} from "next";
import {useState,FormEvent,useEffect,ChangeEvent} from "react";
import {AiTwotoneEye,AiTwotoneEyeInvisible} from "react-icons/ai";
import Link from "next/link";
import {redirect} from "next/navigation";
import {useDispatch,useSelector} from "react-redux";
import {AppDispatch,RootState} from "@/redux/store";

var bg = `url(https://files.merca20.com/uploads/2022/07/Netflix-plan-anuncios-precios.jpeg)`;

const RegisterPage: NextPage = () => {
  const [user,setUser] = useState({email: "",password: "",name: ""});
  const [showPwd,setShowPWd] = useState<boolean>(false);
  const [rememberMe,setRememberMe] = useState<boolean>(false);

  const c_user = useSelector((state: RootState) => state.user);
  const dispatch: AppDispatch = useDispatch();
  const [error,setError] = useState<string>("");

  useEffect(() => {
    if(c_user.name) redirect("/home");
  },[c_user.name]);

  useEffect(() => {
    const user = localStorage.getItem("netflix");
    if(user) dispatch({type: "LOGIN",payload: JSON.parse(user)});

    document.title = `Create an Account`;
  },[]);

  useEffect(() => {
    if(error) setTimeout(() => setError(""),5000);
  },[error]);

  const handleRegister = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const {email,password,name} = user;

    if(!email || !password || !name)
      return setError("All fields are required");

    dispatch({
      type: "USER_LOGIN",
      payload: {name,email,password,type: "register",rememberMe},
    });
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setUser((p) => ({...p,[e.target.name]: e.target.value}));
  };

  return (
    <div
      className="h-screen w-full grid place-items-center"
      style={{
        backgroundImage: bg,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
      }}
    >
      <form
        className="bg-[rgba(0,0,0,0.8)] w-80 flex flex-col p-5 gap-6 shadow-xl xxl:scale-150"
        onSubmit={handleRegister}
      >
        <h1 className="text-center font-lora text-[red] text-5xl font-semibold">
          Register
        </h1>
        <input
          className="border-none outline-none p-3 text-[17.5px] text-black"
          placeholder="Name"
          onChange={handleChange}
          name="name"
        />
        <input
          className="border-none outline-none p-3 text-[17.5px] text-black"
          placeholder="Email"
          onChange={handleChange}
          name="email"
        />
        <div className="relative">
          <input
            type={showPwd ? "text" : "password"}
            className="border-none w-full outline-none p-3 text-[17.5px] text-black pr-10"
            onChange={handleChange}
            name="password"
            placeholder="Password"
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
          <span className="text-white/90 text-sm">Remember me</span>
        </div>
        {error && (
          <p className="text-red-600 text-sm -my-3 font-semibold">{error}</p>
        )}
        <button className="bg-[red] text-white border-none font-lora outline-none p-3 font-bold">
          Register
        </button>
        <p className="-my-2 text-center text-sm text-white">
          <span className="mr-2 text-white/80">Already have an Account?</span>
          <Link href={"/"} className="underline hover:text-red-500">
            Sign In
          </Link>
        </p>
      </form>
    </div>
  );
};

export default RegisterPage;
