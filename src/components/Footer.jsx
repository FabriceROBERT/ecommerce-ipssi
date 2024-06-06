import React from "react";
import Facebook from "../assets/svg/facebook-f.svg";
import Instagram from "../assets/svg/instagram.svg";
import Twitter from "../assets/svg/twitter.svg";
import Whatsapp from "../assets/svg/whatsapp.svg";
import Logo from "../assets/img/Logo.png";
import { FaLocationArrow } from "react-icons/fa";
import { FaMailBulk } from "react-icons/fa";
export default function Footer() {
  return (
    <div className="relative bg-gray-800 md:mt-40  p-5 h-full text-white">
      {/* <img
        src={BackgroundImage}
        alt=""
        className="bg-black absolute top-0 left-0 w-full h-full object-cover z-0"
      /> */}
      <div className="relative  md:grid grid-cols-2 z-10 ">
        <div className="  w-full p-5 mt-20 mb-10 md:mb-28">
          <div className="relative h-52">
            <img
              src={Logo}
              alt=""
              className=" w-full h-full object-contain absolute   md:w-2/3"
            />
          </div>
          <p className="text-center md:text-left mt-10">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Incidunt
            dolorum, neque sapiente iure illum assumenda quae praesentium quidem
            ad laboriosam porro, sequi a atque natus. Velit aut itaque
            blanditiis impedit.
          </p>
        </div>
        <div className=" h-full w-full flex flex-col items-center md:justify-center">
          <div className="flex items-center">
            <FaLocationArrow className=" " />
            <span className=" text-sm md:text-lg tracking-tighter">
              40 Rue du Louvre, 75001 Paris
            </span>
          </div>
          <div className="flex items-center mb-20 md:mb-0 mt-3">
            <FaMailBulk className=" mr-1 md:ml-4" />
            <span className="  text-sm md:text-lg tracking-tight">
              contact@fabriceandpapa.com
            </span>
          </div>
          {/* Côté droit */}
        </div>
      </div>
      <div className="flex items-center justify-between relative z-10">
        <div className="uppercase font-extrabold tracking-tighter text-base">
          copyright fabriceandpapa 2024 . All rights reserved
        </div>
        <div className="flex flex-row justify-around">
          <div>
            <a
              href="https://www.youtube.com/"
              target="_blank "
              rel="noreferrer"
            >
              <img
                src={Facebook}
                className="h-7 w-7 bg-white rounded-full p-1 mr-2"
                alt=""
              />
            </a>
          </div>
          <div>
            <a href="https://www.youtube.com/" target="_blank" rel="noreferrer">
              <img
                src={Instagram}
                className="h-7 w-7 bg-white rounded-full p-1 mr-2"
                alt=""
              />
            </a>
          </div>
          <div>
            <a href="https://www.youtube.com/" target="_blank" rel="noreferrer">
              <img
                src={Twitter}
                className="h-7 w-7 bg-white rounded-full p-1 mr-2"
                alt=""
              />
            </a>
          </div>
          <div>
            <a href="https://www.youtube.com/" target="_blank" rel="noreferrer">
              <img
                src={Whatsapp}
                className="h-7 w-7 bg-white rounded-full p-1"
                alt=""
              />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
