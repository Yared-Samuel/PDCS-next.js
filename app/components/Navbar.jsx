import React from "react";
import Link from "next/link";

const Header = () => {
  return (
    <div className="navbar bg-neutral text-neutral-content py-0">
      <div className="flex-1 my-0">
        <Link href={"/"} className="btn btn-ghost text-xl my-0 text-teal-200">GGT</Link>
      </div>      
      <div className="flex-none">
        <ul className="menu menu-horizontal px-1 py-0">          
            
              
                
                <Link href={"/"}>
                  <li className="p-3 text-teal-200">Home </li>
                </Link>
                <Link href={"/pages/payment"}>
                  <li className="p-3 text-teal-200">Payments </li>
                </Link>
                <Link href={"/pages/item"}>
                  <li className="p-3 text-teal-200">Items </li>
                </Link>
              
          
        </ul>
      </div>
    </div>
  );
};

export default Header;
