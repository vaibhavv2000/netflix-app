"use client";

import {Typography} from "@mui/material";
import Image from "next/image";
import {useEffect, useState} from "react";
import { FiSearch } from "react-icons/fi";
import { IoNotificationsOutline } from "react-icons/io5";
import { AiFillCaretDown } from "react-icons/ai";
import {AppDispatch} from "@/redux/store";
import {useDispatch} from "react-redux";

var link = "text-white font-[600] cursor-pointer hover:underline";
var authLink = "text-white text-[13px] font-medium text-center cursor-pointer hover:opacity-70";

const navOptions = ["Home", "Movies", "Anime", "Try Kids", "My List"];

const Navbar = () => {  
  const [showAuth, setShowAuth] = useState<boolean>(false);
  const [scrolled, setScrolled] = useState<boolean>(false);
  
  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    function scrollDetect() {
      const y = window.scrollY;
      if (y === 0) setScrolled(false);
      else setScrolled(true);
    }

    window.addEventListener("scroll", scrollDetect);

    return () => window.removeEventListener("scroll", scrollDetect);
  }, []);

  const logout = () => {
    dispatch({ type: "LOGOUT", payload: {} });
    localStorage.removeItem("netflix");
  };

  var nav = `flex items-center bg-[rgba(0,0,0,0.0155555)] justify-between fixed top-0 w-full lg:px-10 z-[9999999999] px-3 md:px-7 ${scrolled ? "bg-black" : "bg-[rgba(0,0,0,0.0155555)]"}`;

  return (
    <nav className={nav}>
      <div className="flex items-center space-x-5 z-[83838833]">
        <Image
          src={"https://assets.stickpng.com/images/580b57fcd9996e24bc43c529.png"}
          alt=""
          width={160}
          height={10}
          style={{ height: "80px" }}
          quality={1}
        />
        <ul className="hidden md:!flex items-center space-x-4">
            {navOptions.map((l) => (
              <Typography variant="body2" className={link} key={String(l + Math.random())}>
                {l}
              </Typography>
            ))}
        </ul>
      </div>
      <div className="flex items-center space-x-4">
        <FiSearch size={25} color="#fff" />
        <div className="relative hidden lg:!block">
          <IoNotificationsOutline size={25} color="#fff" />
          <span className="absolute bg-[red] text-white rounded-full text-[9px] grid place-items-center -top-1 -right-1 h-4 w-4 pt-0.5">
              3
          </span>
        </div>
        <p className="text-white font-medium hidden lg:!block">DVD</p>
        <div className="relative flex items-center space-x-2">
          <Image
            src={
                "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQw5VvVLHprgZYPxX0ILhu6DjZynAsT31gfClQyhtO3bQ&usqp=CAU&ec=48665698"
              }
              alt=""
              height={40}
              width={40}
          />
          <AiFillCaretDown
            size={22}
            color="#fff"
            className="cursor-pointer"
            onClick={() => setShowAuth(!showAuth)}
          />
          {showAuth && (
            <div className="absolute flex flex-col w-16 shadow-xl bg-[#151515] p-1.5 space-y-2 top-8 -right-3">
              <Typography
                variant="subtitle2"
                className={authLink}
                onClick={logout}
              >
                Logout
              </Typography>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;