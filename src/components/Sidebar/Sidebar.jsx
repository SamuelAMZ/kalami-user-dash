"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";

// icons
import { AiOutlineHome, AiFillPlusCircle, AiOutlineUser } from "react-icons/ai";
import { HiOutlineLogout } from "react-icons/hi";
import { BiShareAlt } from "react-icons/bi";
import { MdOutlineWindow } from "react-icons/md";

const Sidebar = () => {
  const router = useRouter();

  return (
    <>
      <>
        <div className="sidebar">
          {/* heading */}
          <div className="heading">
            <Link href="/home">
              <img src="/logo.png" alt="" />
            </Link>
          </div>

          {/* menu elements */}
          <ul className="menu-container">
            <div className="first-part">
              {/* login user box */}
              <Link href="/account">
                <li className="user-box">
                  <div className="user-img">
                    <img src="/default-user.png" alt="user image" />
                  </div>
                  <div className="user-details">
                    <h3>John Doe</h3>
                    <p>User</p>
                  </div>
                </li>
              </Link>
              {/* separator
              <span className="seperator-element"></span> */}
              <Link href="/home">
                <li className={router.pathname === "home" ? "active-menu" : ""}>
                  <AiOutlineHome />
                  <p>Dashboard</p>
                </li>
              </Link>
              <Link href="/contexts">
                <li
                  className={
                    router.pathname === "/contexts" ? "active-menu" : ""
                  }
                >
                  <MdOutlineWindow />
                  <p>Contexts</p>
                </li>
              </Link>
              <Link href="/shares">
                <li
                  className={router.pathname === "/shares" ? "active-menu" : ""}
                >
                  <BiShareAlt />
                  <p>Shares</p>
                </li>
              </Link>
              <Link href="/account">
                <li
                  className={
                    router.pathname === "/account" ? "active-menu" : ""
                  }
                >
                  <AiOutlineUser />
                  <p>Account</p>
                </li>
              </Link>
            </div>

            <div className="second-part">
              {/* new search btn */}
              <Link href="/new" className="new-sidebar">
                <li>
                  <AiFillPlusCircle />
                  <p>New Context</p>
                </li>
              </Link>
              {/* logout */}
              <Link href="/logout" className="logout">
                <li>
                  <HiOutlineLogout />
                  <p>Logout</p>
                </li>
              </Link>
            </div>
          </ul>
        </div>
      </>
    </>
  );
};

export default Sidebar;
