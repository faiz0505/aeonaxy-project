import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import NavigationBar from "../components/NavigationBar";
import Footer from "../components/Footer";

const RootLayout = () => {
  return (
    <main>
      <NavigationBar />
      <Outlet />
      <Footer />
    </main>
  );
};

export default RootLayout;
