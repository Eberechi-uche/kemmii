import React, { HtmlHTMLAttributes } from "react";
import { Navbar } from "../Navbar/Navbar";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Navbar></Navbar>
      <main>{children}</main>
    </>
  );
};
export default Layout;
