import React from "react";
import styled from "styled-components";
import { useHistory } from "react-router-dom";

const BoardLayout = ({ title }) => {
  const history = useHistory();

  return (
    <Wrapper>
      <div className="board-header">
        <h1>{title}</h1>
        <button
          onClick={() => {
            history.push("/postedit");
          }}
        >
          글쓰기
        </button>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  .board-header {
    width: 67rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-bottom: 1rem;
    border-bottom: 2px solid #686868;

    h1 {
      margin: 0;
    }

    button {
      font-size: 1.75rem;
      font-weight: bold;
      border-radius: 0.7rem;
      padding: 1rem 1.2rem;
      background: #df5d5d;
      cursor: pointer;
    }
  }
`;

export default BoardLayout;
