"use client";
import { useState } from "react";
import { usePathname } from "next/navigation";
import {
  FaArrowDownLong,
  FaArrowLeftLong,
  FaArrowRightLong,
  FaArrowUpLong,
} from "react-icons/fa6";
import { adminNavLinks, parentNavLinks, youthNavLinks } from "@/constants";
import Link from "next/link";

const Navbar = ({ account_type, toggleNav }) => {
  const [collapsed, setCollapsed] = useState(false);
  const [collapsedMobile, setCollapsedMobile] = useState(true);
  const pathname = usePathname();
  const page = pathname.split("/")[2];

  const renderNavTabs = () => {
    if (account_type === "parent") {
      return parentNavLinks.map((link) => (
        <li key={link.id}>
          <Link
            href={`/parent/${link.id}`}
            className={`nav-item ${page === link.id ? "active-nav" : ""}`}
          >
            {link.icon}
            {collapsed ? "" : <>{link.title}</>}
          </Link>
        </li>
      ));
    } else if (account_type === "youth") {
      return youthNavLinks.map((link) => (
        <li key={link.id}>
          <Link
            href={`/youth/${link.id}`}
            className={`nav-item ${page === link.id ? "active-nav" : ""}`}
          >
            {link.icon}
            {collapsed ? "" : <>{link.title}</>}
          </Link>
        </li>
      ));
    } else if (account_type === "admin") {
      return adminNavLinks.map((link) => (
        <li key={link.id}>
          <Link
            href={`/admin/${link.id}`}
            className={`nav-item ${page === link.id ? "active-nav" : ""}`}
          >
            {link.icon}
            {collapsed ? "" : <>{link.title}</>}
          </Link>
        </li>
      ));
    }
  };

  const renderMobileNavTabs = () => {
    if (account_type === "parent") {
      return parentNavLinks.map((link) => (
        <li key={link.id}>
          <Link
            href={`/parent/${link.id}`}
            className={`nav-item ${page === link.id ? "active-nav" : ""}`}
          >
            {link.icon}
            {link.title}
          </Link>
        </li>
      ));
    } else if (account_type === "youth") {
      return youthNavLinks.map((link) => (
        <li key={link.id}>
          <Link
            href={`/youth/${link.id}`}
            className={`nav-item ${page === link.id ? "active-nav" : ""}`}
          >
            {link.icon}
            {link.title}
          </Link>
        </li>
      ));
    } else if (account_type === "admin") {
      return adminNavLinks.map((link) => (
        <li key={link.id}>
          <Link
            href={`/admin/${link.id}`}
            className={`nav-item ${page === link.id ? "active-nav" : ""}`}
          >
            {link.icon}
            {link.title}
          </Link>
        </li>
      ));
    }
  };

  return (
    <>
      <nav className={`nav-bar ${collapsed ? "collapsed" : ""}`}>
        {collapsed ? (
          <img
            src="/small-logo-white.png"
            alt="small white YSS logo"
            className="w-[3.5rem] select-none mx-3 absolute top-10"
          />
        ) : (
          <img
            src="/logo-white.png"
            alt="white YSS logo"
            className="w-[11rem] select-none absolute top-10"
          />
        )}
        <ul className="tab-list p-0 my-3">{renderNavTabs()}</ul>

        <button
          className="btn btn-outline rounded-full absolute bottom-3 right-3"
          onClick={() => {
            setCollapsed(!collapsed);
            toggleNav((prev) => !prev);
          }}
        >
          {collapsed ? <FaArrowRightLong /> : <FaArrowLeftLong />}
        </button>
      </nav>

      <nav className="mobile-nav py-4">
        <img
          src="/logo-white.png"
          alt="white YSS logo"
          className="w-[11rem] select-none"
        />
        {!collapsedMobile ? (
          <>
            <ul className="tab-list p-0 my-3">{renderNavTabs()}</ul>
          </>
        ) : null}

        {collapsedMobile ? (
          <button
            className="btn btn-outline text-offWhite rounded-full mt-2"
            onClick={() => {
              setCollapsedMobile(!collapsedMobile);
            }}
          >
            <FaArrowDownLong size="20" />
          </button>
        ) : (
          <button
            className="btn btn-outline text-offWhite rounded-full mt-2"
            onClick={() => {
              setCollapsedMobile(!collapsedMobile);
            }}
          >
            <FaArrowUpLong size="20" />
          </button>
        )}
      </nav>
    </>
  );
};

export default Navbar;
