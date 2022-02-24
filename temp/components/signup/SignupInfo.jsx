import React from 'react'
import styled from 'styled-components'

const SignupInfo = () => {
  return (
    <Wrapper>
      <h1 className="signup-info-title">
        프로젝터스의 일원이 되기위한 과정입니다 🎉
      </h1>
      <p>대강 사이트 설명 넣을 예정/ 반응형 작업 필요</p>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  width: 45rem;

  .signup-info-title {
    max-width: 35rem;
    letter-spacing: -0.02em;
  }
`

export default SignupInfo
