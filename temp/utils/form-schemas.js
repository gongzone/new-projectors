import * as yup from 'yup'

export const signupSchema = yup.object().shape({
  email: yup
    .string()
    .email('이메일 형식이 아닙니다.')
    .required('필수 항목 입니다.'),
  nickname: yup
    .string()
    .max(20, '닉네임은 20자리를 넘을 수 없습니다.') // nickname validation 추가 필요...
    .required('필수 항목 입니다.'),
  password: yup
    .string()
    .min(8, '비밀번호는 8자리 이상이어야 합니다.')
    .max(20, '비밀번호는 20자리를 넘을 수 없습니다.')
    .matches(
      /^(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,20}$/,
      '숫자와 특수문자가 적어도 하나 이상 포함되어야 합니다.'
    )
    .required('필수 입력 항목입니다.'),
  password2: yup
    .string()
    .oneOf([yup.ref('password'), null])
    .required(),
})

export const loginSchema = yup.object().shape({
  email: yup
    .string()
    .email('이메일 형식이 아닙니다.')
    .required('필수 항목 입니다.'),
  password: yup
    .string()
    .min(8, '비밀번호는 8자리 이상이어야 합니다.')
    .max(20, '비밀번호는 20자리를 넘을 수 없습니다.')
    .required('필수 입력 항목입니다.'),
})
