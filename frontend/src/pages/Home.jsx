import React from "react";

import Hero from "../components/Hero";
import Posts from "../components/home/Posts";

const Home = () => {
  return (
    <div>
      <Hero />
      <h1>홈페이지 입니다!</h1>
      <Posts />
    </div>
  );
};

export default Home;
