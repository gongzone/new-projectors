import React from "react";
import styled from "styled-components";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import { loginSchema } from "../utils/form-schemas";
import { useLogin } from "../hooks/user-api";

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(loginSchema),
  });

  const { mutate } = useLogin();

  const submitForm = (data) => {
    console.log(data);
    mutate(data);
  };

  return (
    <Wrapper>
      <div className="login-form-container">
        <form className="login-form" onSubmit={handleSubmit(submitForm)}>
          <ul className="login-ul">
            <li className="login-li">
              <label className="login-label" htmlFor="email">
                사용자 이메일
              </label>
              <input
                className="login-input"
                type="text"
                id="email"
                {...register("email")}
              />
              <p className="login-error">{errors.email?.message}</p>
            </li>
            <li className="login-li">
              <label className="login-label" htmlFor="password1">
                비밀번호
              </label>
              <input
                className="login-input"
                type="password"
                id="password1"
                {...register("password")}
              />
              <p className="login-error">{errors.password?.message}</p>
            </li>
          </ul>
          <button className="login-button" type="submit">
            로그인
          </button>
        </form>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;

  .login-form-container {
    display: flex;
    justify-content: center;
    width: 45rem;
    padding: 2.5rem;
    border-radius: 0.7rem;
    background-color: #ffffff;
    box-shadow: rgb(46 41 51 / 8%) 0px 4px 16px,
      rgb(71 63 79 / 16%) 0px 8px 24px;
  }

  .login-form {
    width: 100%;
  }

  .login-ul {
    display: grid;
    row-gap: 1.5rem;
  }

  .login-li {
    display: flex;
    flex-direction: column;
  }

  .login-label {
  }

  .login-input {
    font-size: 1.7rem;
    height: 3.8rem;
    border-width: 0.1rem;
    border-style: solid;
    border-radius: 0.5rem;
    margin-top: 0.2rem;
    padding: 0 0.8rem;

    :focus {
      outline: none;
      background: #e7e7fc;
    }
  }

  .login-error {
    margin-top: 0.32rem;
    color: #e75349;
  }

  .login-button {
    position: relative;
    left: 50%;
    transform: translateX(-50%);
    cursor: pointer;
    color: white;
    font-size: 1.75rem;
    font-weight: bold;
    background-color: #5eaca0;
    padding: 0.9rem 1.25rem;
    border-radius: 0.65rem;
    transition: background-color 0.3s;

    :hover {
      background-color: #db4d4d;
    }
  }
`;

export default Login;
