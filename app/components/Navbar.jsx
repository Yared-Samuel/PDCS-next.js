import React from "react";
import Link from "next/link";

const Header = () => {
  return (
    <div className="flex justify-between bg-[#4b4453] text-neutral-content py-0">
      <div className="flex-1 my-0">
        <Link href={"/"} className="btn btn-ghost text-xl my-0 text-[#4d8076]">GGT</Link>
      </div>      
      <div className="flex-none">
        <ul className="menu menu-horizontal px-1 py-0">
                <Link href={"/"}>
                  <li className="p-3 text-[#4d8076]">Home </li>
                </Link>
                <Link href={"/pages/payment"}>
                  <li className="p-3 text-[#4d8076]">Payments </li>
                </Link>
                <Link href={"/pages/item"}>
                  <li className="p-3 text-[#4d8076]">Items </li>
                </Link>
              
          
        </ul>
      </div>
    </div>
  );
};

export default Header;
