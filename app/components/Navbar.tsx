import React from "react";
import styles from "./Header.module.css";
import Link from "next/link";

const Header = () => {
  return (
    <div className="navbar bg-neutral text-neutral-content">
      <div className="flex-1">
        <a className="btn btn-ghost text-xl">daisyUI</a>
      </div>
      <div className="flex-none">
        <ul className="menu menu-horizontal px-1">
          <li>
            <details>
              <summary>Parent</summary>
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
