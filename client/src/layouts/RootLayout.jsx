import React from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import NavigationBar from "../components/NavigationBar";
import Footer from "../components/Footer";
const RootLayout = () => {
  return (
    
    <main
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <section>
        <NavigationBar />
      </section>
      <Outlet />
      <section style={{ marginTop: "auto" }}>
        <Footer />
      </section>
    </main>
  );
};

export default RootLayout;
