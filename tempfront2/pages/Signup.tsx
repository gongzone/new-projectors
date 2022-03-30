import React from 'react'
import styled from 'styled-components'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

import { signupSchema } from '../utils/form-schemas'
import { useSignup } from '../hooks/user-api'

import SignupInfo from '../components/signup/SignupInfo'

const Signup = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: 'onTouched',
    resolver: yupResolver(signupSchema),
  })

  const { mutate } = useSignup()

  const submitForm = (data) => {
    console.log(data)
    mutate(data)
  }

  return (
    <Wrapper>
      <SignupInfo />
      <div className="signup-form-container">
        <form className="signup-form" onSubmit={handleSubmit(submitForm)}>
          <ul className="signup-ul">
            <li className="signup-li">
              <label className="signup-label" htmlFor="email">
                사용자 이메일
              </label>
              <input
                className="signup-input"
                type="text"
                id="email"
                {...register('email')}
              />
              <p className="signup-error">{errors.email?.message}</p>
            </li>
            <li className="signup-li">
              <label className="signup-label" htmlFor="nickname">
                닉네임
              </label>
              <input
                className="signup-input"
                type="text"
                id="nickname"
                {...register('nickname')}
              />
              <p className="signup-error">{errors.nickname?.message}</p>
            </li>
            <li className="signup-li">
              <label className="signup-label" htmlFor="password1">
                비밀번호
              </label>
              <input
                className="signup-input"
                type="password"
                id="password1"
                {...register('password')}
              />
              <p className="signup-error">{errors.password?.message}</p>
            </li>
            <li className="signup-li">
              <label className="signup-label" htmlFor="password2">
                비밀번호 확인
              </label>
              <input
                className="signup-input"
                type="password"
                id="password2"
                {...register('password2')}
              />
              <p className="signup-error">
                {errors.password2 && '비밀번호가 일치하지 않습니다.'}
              </p>
            </li>
          </ul>
          <button className="signup-button" type="submit">
            가입하기
          </button>
        </form>
      </div>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  display: flex;

  .signup-form-container {
    display: flex;
    justify-content: center;
    width: 45rem;
    padding: 2.5rem;
    border-radius: 0.7rem;
    background-color: #ffffff;
    box-shadow: rgb(46 41 51 / 8%) 0px 4px 16px,
      rgb(71 63 79 / 16%) 0px 8px 24px;
  }

  .signup-form {
    width: 100%;
  }

  .signup-ul {
    display: grid;
    row-gap: 1.5rem;
  }

  .signup-li {
    display: flex;
    flex-direction: column;
  }

  .signup-label {
  }

  .signup-input {
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

  .signup-error {
    margin-top: 0.32rem;
    color: #e75349;
  }

  .signup-button {
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
`

export default Signup
