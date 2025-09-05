import React from "react";
import {
  Route,
  Navigate,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  Routes,
} from "react-router-dom";
import Home from "./pages/Home";
import RootLayout from "./layout/RootLayout";
import Members from "./pages/Members";
import Documents from "./pages/Documents";
import AboutUs from "./pages/AboutUs";
import ContactUs from "./pages/ContactUs";
import Signup from "./pages/Signup";
import SingInPg from "./pages/SingInPg";

const App = () => {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route path="/" element={<RootLayout />}>
          <Route index element={<Home />} />
          <Route path="*" element={<Navigate to="/" replace />} />
          <Route path="members" element={<Members />} />
          <Route path="documents" element={<Documents />} />
          <Route path="about" element={<AboutUs />} />
          <Route path="contact" element={<ContactUs />} />
        </Route>
        <Route path="signup" element={<Signup />} />
        <Route path="signin" element={<SingInPg/>} />
      </>
    )
  );
  return <RouterProvider router={router} />;
};

export default App;
