import React from "react";
import Navbar from "./Navbar";

const Layout = ({ children }) => {
  return (
    <div className="w-full min-h-screen flex flex-col">
      <Navbar />
      <main className="w-full h-full px-12 py-12 flex-1">{children}</main>
    </div>
  );
};

export default Layout;
