import React from "react";
import Link from "next/link";

const Header = () => {
  return (
    <div className="navbar bg-neutral text-neutral-content">
      <div className="flex-1">
        <Link href={"/"} className="btn btn-ghost text-xl">GGT</Link>
      </div>
      <div className="flex-1">
        <Link href={"/"} className="btn btn-ghost text-xl">GGT</Link>
      </div>
      <div className="flex-none">
        <ul className="menu menu-horizontal px-1">
          <li>
            <details>
              <summary>Actions</summary>
              <ul className="bg-neutral rounded-t-none p-4">
                
                <Link href={"/pages/payment"}>
                  <li className="p-2">Payments </li>
                </Link>
                <Link href={"/pages/item"}>
                  <li className="p-2">Items </li>
                </Link>
              </ul>
            </details>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Header;
