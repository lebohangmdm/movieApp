import * as yup from "yup";

const RegisterValidation = yup.object().shape({
  fullName: yup
    .string()
    .required("Please provide your full name")
    .max(30, "Full name must be less than 30 characters")
    .matches(/^([a-zA-Z]+\s[a-zA-Z]+)$/, "Please provide a valid full name"),
  email: yup.string().required("Please provide your password").trim(),
  password: yup
    .string()
    .required("Please provide your password")
    .min(6, "Password must at least have 6 characters")
    .max(30, "Password must less than 30 characters")
    .matches(/(?=.*[0-9])/, "Password must have a number"),
  passwordConfirm: yup
    .string()
    .required("Please confirm your password")
    .oneOf([yup.ref("password"), null], "Passwords must match"),
});

const LoginValidation = yup.object().shape({
  email: yup.string().required("Please provide your password").trim(),
  password: yup
    .string()
    .required("Please provide your password")
    .min(6, "Password must at least have 6 characters")
    .max(30, "Password must less than 30 characters")
    .matches(/(?=.*[0-9])/, "Password must have a number"),
});

const updatePasswordValidation = yup.object().shape({
  currentPassword: yup
    .string()
    .required("Please provide your password")
    .min(6, "Password must at least have 6 characters")
    .max(30, "Password must less than 30 characters")
    .matches(/(?=.*[0-9])/, "Password must have a number"),
  password: yup
    .string()
    .required("Please provide your password")
    .min(6, "Password must at least have 6 characters")
    .max(30, "Password must less than 30 characters")
    .matches(/(?=.*[0-9])/, "Password must have a number"),
  passwordConfirm: yup
    .string()
    .required("Please confirm your password")
    .oneOf([yup.ref("password"), null], "Passwords must match"),
});

export { RegisterValidation, LoginValidation, updatePasswordValidation };
