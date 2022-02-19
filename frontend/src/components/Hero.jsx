import React from "react";
import styled from "styled-components";

import projector from "../assets/images/projector2.png";

const Hero = () => {
  return (
    <Wrapper>
      <div className="image-container">
        <img className="projector-image" src={projector} alt="projector" />
      </div>
      <div className="display-container">
        <h1 className="hero-title">프로젝터스</h1>
        <p className="hero-description">
          프로젝터스를 통해 당신의 프로젝트를 공유하고 소통을 나누세요.
        </p>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 75rem;
  height: 30rem;
  margin: 0 auto;
  border-radius: 0.7rem;
  background-color: #f3f3f3;

  .image-container {
    width: 30rem;
    height: 30rem;
    padding: 3rem;
    margin-left: 1rem;
  }

  .projector-image {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .display-container {
    width: 32rem;
    height: 22rem;
    padding: 3rem;
    margin-right: 4rem;
    background-color: #ffffff;
    box-shadow: 0 2px 4px rgb(0 0 0 / 8%), 0 4px 12px rgb(0 0 0 / 8%);

    .hero-title {
      font-size: 2.3rem;
    }

    .hero-description {
      font-size: 1.8rem;
    }
  }
`;

export default Hero;
