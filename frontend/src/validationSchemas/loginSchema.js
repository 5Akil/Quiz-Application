import { object, ref, string } from "yup";

const getCharacterValidationError = (str) => {
    return `Your password must have at least 1 ${str} character`;
  };


export const loginSchema = object({
  email: string().email().trim().required("Please enter your email"),
  password: string().trim()
  .required("Please enter a password")
  // check minimum characters
  .min(8, "Password must have at least 8 characters")
  // different error messages for different requirements
  .matches(/[0-9]/, getCharacterValidationError("digit"))
  .matches(/[a-z]/, getCharacterValidationError("lowercase"))
  .matches(/[A-Z]/, getCharacterValidationError("uppercase"))
  .matches(/[^\w]/, 'Password requires a symbol'),
})


export const forgotSchema = object({
    email: string().email().trim().required("Please enter your email"),
})

export const resetSchema = object({
    newPassword: string().trim()                                                     //new password
    .required("Please enter a password")
    // check minimum characters
    .min(8, "Password must have at least 8 characters")
    // different error messages for different requirements
    .matches(/[0-9]/, getCharacterValidationError("digit"))
    .matches(/[a-z]/, getCharacterValidationError("lowercase"))
    .matches(/[A-Z]/, getCharacterValidationError("uppercase"))
    .matches(/[^\w]/, 'Password requires a symbol'),

    confirmPassword:string().trim()                                                  //confirm password
    .required("Please enter Confirm Password")
    //compare this password with above password using ref
    .oneOf([ref("newPassword")], "Passwords does not match"),
  })