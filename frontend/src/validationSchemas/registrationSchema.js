import * as Yup from "yup";


const FILE_SIZE = 1024 * 1024 * 2;
const SUPPORTED_FORMATS = [
  "image/jpg",
  "image/jpeg",
  "image/png"
];
const getCharacterValidationError = (str) => {
  return `Your password must have at least 1 ${str} character`;
};

export const registrationSchema = (states, cities) => {

  return (
    Yup.object({
      email: Yup.string().email().required("Please enter your email"),

      password: Yup.string().required("Please enter a password")
        // check minimum characters
        .min(8, "Password must have at least 8 characters").trim()
        // different error messages for different requirements
        .matches(/[0-9]/, getCharacterValidationError("digit"))
        .matches(/[a-z]/, getCharacterValidationError("lowercase"))
        .matches(/[A-Z]/, getCharacterValidationError("uppercase")),
      address: Yup.string().trim().required("Please Enter your address"),
      phoneNumber: Yup.string().matches(/^[6-9]\d{9}$/, 'Invalid phone number').required("please enter your Phone number"),
      firstName: Yup.string().trim().min(2).max(25).required("Please enter your name"),
      lastName: Yup.string().trim().min(2).max(25).required("Please enter your name"),
      designation: Yup.string().trim().required("Please enter your Designation"),
      DOB: Yup.date().required("Please enter your DOB"),
      country: Yup.string().required("Please Select Country "),
      gender: Yup.string().required("Please Select gender "),
      state: states?.length > 0 ? Yup.string().required("Please Select state ") : Yup.string(),
      city: cities?.length > 0 ? Yup.string().required("Please Select City ") : Yup.string(),
      image: Yup
        .mixed()
        .required("image is required")
        .test(
          "File too large , should be less then 2MB in Size",
          (value) => value && value.size <= FILE_SIZE
        )
        .test(
          "fileFormat",
          "Unsupported Format",
          (value) => value && SUPPORTED_FORMATS.includes(value.type)
        )
    })
  )
} 