"use client";

import Link from "next/link";

// icons
import { MdKeyboardArrowDown } from "react-icons/md";
import { BsPlusLg } from "react-icons/bs";

const Header = ({ page }) => {
  return (
    <div className="header-container">
      <div className="header-elm">
        <div className="page-title">
          <h2>{page}</h2>
        </div>
        {/* new btn */}
        <div className="right-side">
          <Link href="/new">
            <button className="btn btn-primary">
              <BsPlusLg /> <p>New Context</p>
            </button>
          </Link>

          <div className="dropdown dropdown-bottom dropdown-end">
            <label className="user-icon m-1" tabIndex={0}>
              <div className="user-img">
                <img src="/default-user.png" alt="user image" />
              </div>

              <MdKeyboardArrowDown />
            </label>
            <ul
              tabIndex={0}
              className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52"
            >
              <li>
                <Link href="/account">Account</Link>
              </li>
              <li>
                <Link href="/logout">Logout</Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
