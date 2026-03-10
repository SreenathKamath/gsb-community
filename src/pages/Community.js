import React from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import CommunityList from "./CommunityList";
import CommunityDetail from "./CommunityDetail";

const Community = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route index element={<CommunityList />} />
        <Route path=":id" element={<CommunityDetail />} />
      </Routes>
      <Footer />
    </>
  );
};

export default Community;
