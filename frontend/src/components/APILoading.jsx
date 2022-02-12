import React from "react";
import styled from "styled-components";
import { useIsFetching } from "react-query";

import { Oval } from "react-loader-spinner";

const APILoading = () => {
  const isFetching = useIsFetching();

  return isFetching ? (
    <Wrapper>
      <div className="loading">
        <Oval color="#14946e" height={70} width={70} />
      </div>
    </Wrapper>
  ) : null;
};

const Wrapper = styled.div`
  position: absolute;
  z-index: 99;
  width: 100vw;
  height: 100vh;
  background-color: #ffffff;

  .loading {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
`;

export default APILoading;
