const yup = require("yup");
const { createCustomError } = require("../errors/custom-error");

const validateRequest = (req, next, schema) => {
  const options = {
    abortEarly: false, // include all errors
  };

  schema
    .validate(req.body, options)
    .then((requestBody) => {
      req.body = requestBody;
      next();
    })
    .catch((err) => {
      next(
        createCustomError(
          `Validation error: ${err.inner.map((e) => e.message).join(", ")}`,
          400
        )
      );
    });
};

const validateSignup = (req, res, next) => {
  const schema = yup.object().shape({
    email: yup
      .string()
      .email("이메일 형식이 아닙니다.")
      .required("필수 항목 입니다."),
    nickname: yup
      .string()
      .max(20, "닉네임은 20자리를 넘을 수 없습니다.") // nickname validation 추가 필요...
      .required("필수 항목 입니다."),
    password: yup
      .string()
      .min(8, "비밀번호는 8자리 이상이어야 합니다.")
      .max(20, "비밀번호는 20자리를 넘을 수 없습니다.")
      .matches(
        /^(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,20}$/,
        "숫자와 특수문자가 적어도 하나 이상 포함되어야 합니다."
      )
      .required("필수 입력 항목입니다."),
    password2: yup
      .string()
      .oneOf([yup.ref("password"), null])
      .required(),
  });
  validateRequest(req, next, schema);
};

const validateLogin = (req, res, next) => {
  const schema = yup.object().shape({
    email: yup
      .string()
      .email("이메일 형식이 아닙니다.")
      .required("필수 항목 입니다."),
    password: yup
      .string()
      .min(8, "비밀번호는 8자리 이상이어야 합니다.")
      .max(20, "비밀번호는 20자리를 넘을 수 없습니다.")
      .required("필수 입력 항목입니다."),
  });
  validateRequest(req, next, schema);
};

module.exports = {
  validateSignup,
  validateLogin,
};
