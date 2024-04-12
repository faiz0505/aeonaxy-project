import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AuthLayout from "./layouts/AuthLayout.jsx";
import IndexPage from "./routes/index.jsx";
import EmailVerification from "./routes/emailVerification.jsx";
import SignUpPage from "./routes/sign-up.jsx";
import SigninForm from "./routes/sign-in.jsx";
import SelectRole from "./routes/selectRole.jsx";
import RootLayout from "./layouts/RootLayout.jsx";
import { Toaster } from "react-hot-toast";
import { NextUIProvider } from "@nextui-org/react";
import CreateProfile from "./routes/create-profile.jsx";
import Profile from "./routes/profile.jsx";

const router = createBrowserRouter([
  {
    element: <AuthLayout />,
    children: [
      { path: "/sign-up", element: <SignUpPage /> },
      { path: "/sign-in", element: <SigninForm /> },
      {
        path: "/create-profile",
        element: <CreateProfile />,
      },
      { path: "/select-role", element: <SelectRole /> },
      {
        path: "/verify-token",
        element: <EmailVerification />,
      },
      { path: "/profile", element: <Profile /> },
    ],
  },
  {
    element: <RootLayout />,
    children: [{ path: "/", element: <IndexPage /> }],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    {/* <ClerkProvider publishableKey={PUBLISHABLE_KEY}> */}
    <NextUIProvider>
      <RouterProvider router={router} />
      <Toaster
        position="top-center"
        reverseOrder={false}
        gutter={8}
        containerClassName=""
        containerStyle={{}}
        toastOptions={{
          // Define default options
          className: "",
          duration: 5000,
          style: {
            background: "#363636",
            color: "#fff",
          },

          // Default options for specific types
          success: {
            duration: 3000,
            theme: {
              primary: "green",
              secondary: "black",
            },
          },
        }}
      />
    </NextUIProvider>
    {/* </ClerkProvider> */}
  </React.StrictMode>
);
