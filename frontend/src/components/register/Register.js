import React, { useEffect, useState } from 'react'
import Navbar from '../common/Navbar'
import styled from 'styled-components'
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useUserRegisterMutation } from '../../services/userApi';
import { useFormik } from 'formik';
import { registrationSchema } from '../../validationSchemas/registrationSchema';

function Register() {
  const navigate = useNavigate();
  const [userRegister, { data, isSuccess }] = useUserRegisterMutation()    //Query for Registration

  const [country, setCountry] = useState(null)
  const [phoneCode, setPhoneCode] = useState('')
  const [countrySelected, setCountrySelceted] = useState(false)
  const [states, setStates] = useState(null)
  const [stateSelected, setStateSelected] = useState(false)
  const [cities, setCities] = useState(null)

  const initialValues = {                    // initial state
    email: "",
    firstName: "",
    lastName: "",
    gender: "",
    address: "",
    country: "",
    state: "",
    city: "",
    code: "",
    phoneCode: "",
    phoneNumber: "",
    password: "",
    image: "",
    DOB: "",
  }

  const { values, errors, touched, handleBlur, handleChange, handleSubmit, setFieldValue } =
    useFormik({
      initialValues,
      validationSchema: registrationSchema(states, cities),
      onSubmit: async (values, action) => {
        const { email, password, firstName, lastName, DOB, designation, image, address, state, gender, country, city, phoneCode } = values
        const formData = new FormData();
        formData.append('email', email);
        formData.append('password', password);
        formData.append('firstName', firstName);
        formData.append('lastName', lastName);
        formData.append('DOB', DOB);
        formData.append('designation', designation);
        formData.append('image', image);
        formData.append('gender', gender);
        formData.append('address', address);
        formData.append('state', state);
        formData.append('country', country);
        formData.append('city', city);
        formData.append('phoneCode', phoneCode);

        await userRegister(formData)                 // Registration Query Hook

        action.resetForm();
      },
    });
  // console.log(errors);
  useEffect(() => {
    if (data?.status === "success") {
      toast.success('Registered successfully.')
      navigate("/userlogin")
    } else if (data?.status === "failed") {
      toast.error("Existing User Found")
    }
  }, [isSuccess])

  const getCountries = async () => {
    const response = await fetch(`${process.env.REACT_APP_BASE_URL}countries`)
    const data = await response.json();
    if (response.status === 200) {
      setCountry(data)
    }
  }
  //country related
  const handleCountry = async (id) => {
    if (id === null) {
      setStates(null)
      setCities(null)
      setCountrySelceted(false)
      setStateSelected(false)

    } else {
      setFieldValue("state", "")
      setFieldValue("city", "")
      setFieldValue("phoneCode", "")

      const response = await fetch(`${process.env.REACT_APP_BASE_URL}states/${id}`)
      const data = await response.json()
      if (data?.result?.length !== 0) {
        setStates(data.result)
        setFieldValue("phoneCode", data.phoneCode)
        setPhoneCode(data.phoneCode)
        setCountrySelceted(true)
      } else {
        setPhoneCode(data.phoneCode)
        setFieldValue("phoneCode", data.phoneCode)
        setStates(null)
        setCities(null)
        setCountrySelceted(false)
        setStateSelected(false)
      }
    }
  }

  const handleSelectedCountry = (e) => {
    const index = e.target.selectedIndex   //get selected option's index
    const element = e.target.childNodes[index]
    const id = element.getAttribute('id');
    setCities(null)
    setStates(null)
    handleChange(e)
    handleCountry(id)
  }

  useEffect(() => {
    getCountries();
  }, [])

  //states

  const handleState = async (id) => {
    if (id === null) {
      setCities(null)
      setStateSelected(false)
    } else {
      const response = await fetch(`${process.env.REACT_APP_BASE_URL}cities/${id}`)
      const cities = await response.json()
      console.log(cities);
      if (cities?.length !== 0) {
        setCities(cities)
        setStateSelected(true)
      } else {
        setCities(null)
        setStateSelected(false)
      }
    }
  }

  const handleSelectedState = (e) => {
    const index = e.target.selectedIndex
    const element = e.target.childNodes[index]
    const id = element.getAttribute('id')
    handleChange(e)
    handleState(id)
  }

  return (
    <>
      <Navbar />
      <Wrapper>
        <div className="registration-form">
          <form method="post" onSubmit={handleSubmit}>
            <div className="form-icon">
              <span><i className="far fa-user"></i></span>
            </div>
            <div className="form-group">
              <input type='text' className='form-control item' name='email' value={values.email} onChange={handleChange} onBlur={handleBlur} placeholder='Email' />
              {errors.email && touched.email ? (
                <p className="form-error" style={{ color: 'red' }}>{errors.email}</p>
              ) : null}
            </div>
            <div className="row">
              <div className="col-md-6 " >
                <div className="form-group">
                  <input type='text' className='form-control item' name='firstName' value={values.firstName} onChange={handleChange} onBlur={handleBlur} placeholder='First Name' />
                  {errors.firstName && touched.firstName ? (
                    <p className="form-error" style={{ color: 'red' }}>{errors.firstName}</p>
                  ) : null}
                </div>
              </div>
              <div className="col-md-6 ">
                <div className="form-group">
                  <input type='text' className='form-control item' name='lastName' value={values.lastName} onChange={handleChange} onBlur={handleBlur} placeholder='Last Name' />
                  {errors.lastName && touched.lastName ? (
                    <p className="form-error" style={{ color: 'red' }}>{errors.lastName}</p>
                  ) : null}
                </div>
              </div>
            </div>

            <div className="form-group">
              <input type='date' className='form-control item' name='DOB' value={values.DOB} placeholder='Date of Birth' onChange={handleChange} onBlur={handleBlur} />
              {errors.DOB && touched.DOB ? (
                <p className="form-error" style={{ color: 'red' }}>{errors.DOB}</p>
              ) : null}
            </div>
            <div className="form-group">
              <input type='text' className='form-control item' name='designation' value={values.designation} placeholder='Designation' onChange={handleChange} onBlur={handleBlur} />
              {errors.designation && touched.designation ? (
                <p className="form-error" style={{ color: 'red', textAlign: "center", width: "300px" }}>{errors.designation}</p>
              ) : null}
            </div>
            <div className="d-md-flex justify-content-start align-items-center mb-3 py-2">
              <h6 className="mb-0 me-4">Gender: </h6>
              <div className="form-check form-check-inline mb-0 me-4" >
                <input className="form-check-input" type="radio" name="gender" id="femaleGender"
                  value="Female" onChange={handleChange} />
                <label className="form-check-label" htmlFor="femaleGender" >Female</label>
              </div>
              <div className="form-check form-check-inline mb-0 me-4">
                <input className="form-check-input" type="radio" name="gender" id="maleGender"
                  value="Male" onChange={handleChange} />
                <label className="form-check-label" htmlFor="maleGender">Male</label>
              </div>
              <div className="form-check form-check-inline mb-0">
                <input className="form-check-input" type="radio" name="gender" id="otherGender"
                  value="Other" onChange={handleChange} />
                <label className="form-check-label" htmlFor="otherGender">Other</label>
              </div>
            </div>
            {errors.gender && touched.gender ? (
              <p className="form-error" style={{ color: 'red' }}>{errors.gender}</p>
            ) : null}
            <div className="form-group">
              <input type='text' className='form-control item' name='address' placeholder='Address' onChange={handleChange} onBlur={handleBlur} />
              {errors.address && touched.address ? (
                <p className="form-error" style={{ color: 'red' }}>{errors.address}</p>
              ) : null}
            </div>
            <select className="select  form-control form-group item" name="country" onChange={handleSelectedCountry} onBlur={handleBlur}>
              <option value="" >Country</option>
              {
                country?.lenght !== 0 ?
                  country?.map((item) => {
                    return <>
                      <option key={item.id} id={item.id} value={item.name} >{item.name} </option>
                    </>
                  })
                  :
                  null
              }
            </select>
            {errors.country && touched.country ? (
              <p className="form-error" style={{ color: 'red' }}>{errors.country}</p>
            ) : null}
            <div className="row">
              <div className="col-md-6 " >

                <select className="select  form-control form-group item" name='state' onChange={handleSelectedState} onBlur={handleBlur} disabled={!countrySelected} >
                  <option value="1">State</option>
                  {
                    states?.lenght !== 0 ?
                      states?.map((item) => {
                        return <>
                          <option key={item.id} id={item.id} value={item.name} >{item.name} </option>
                        </>
                      })
                      :
                      null
                  }
                </select>
                {errors.state && touched.state && countrySelected ? (
                  <p className="form-error" style={{ color: 'red' }}>{errors.state}</p>
                ) : null}

              </div>
              <div className="col-md-6 ">

                <select className="select form-control form-group item" name='city' onChange={handleChange} onBlur={handleBlur} disabled={!stateSelected}  >
                  <option value="1">City</option>
                  {
                    cities?.lenght !== 0 ?
                      cities?.map((item) => {
                        return <>
                          <option key={item.id} id={item.id} value={item.name} >{item.name} </option>
                        </>
                      })
                      :
                      null
                  }
                </select>
                {errors.city && touched.city && stateSelected ? (
                  <p className="form-error" style={{ color: 'red' }}>{errors.city}</p>
                ) : null}
              </div>
            </div>
            <div className="row">
              <div className="col-md-5 pb-2">
                <div className="form-outline form-white">
                  <input type="text" className="form-control item" name='code' value={phoneCode ? `+${phoneCode}` : `+Code`} disabled />
                </div>
              </div>
              <div className="col-md-7 pb-2">
                <div className="form-outline form-white">
                  <input type="text" className="form-control item" name='phoneNumber' value={values.phoneNumber} placeholder='Phone Number' onChange={handleChange} onBlur={handleBlur} />
                </div>
                {errors.phoneNumber && touched.phoneNumber ? (
                  <p className="form-error" style={{ color: 'red' }}>{errors.phoneNumber}</p>
                ) : null}
              </div>
            </div>

            <div className="form-group">
              <input type='file' className='form-control item' name='image' onChange={(e) => setFieldValue('image', e.currentTarget.files[0])} onBlur={handleBlur} />
              {errors.image && touched.image ? (
                <p className="form-error" style={{ color: 'red' }}>{errors.image}</p>
              ) : null}
            </div>

            <div className="form-group">
              <input type='text' className='form-control item' name='password' value={values.password} placeholder='Password' onChange={handleChange} onBlur={handleBlur} />
              {errors.password && touched.password ? (
                <p className="form-error" style={{ color: 'red' }}>{errors.password}</p>
              ) : null}
            </div>
            <div className="form-group">
              <button type="submit" className="btn btn-block create-account">Create Account</button>
            </div>
          </form>

        </div>

      </Wrapper>
    </>
  )
}

export default Register


const Wrapper = styled.div`
background-color: rgb(233, 236, 239);
.registration-form{
padding: 50px 0;
}

.registration-form form{
  background-color: #fff;
  max-width: 600px;
  margin: 30px auto auto;
  padding: 30px 50px;
  border-radius: 30px;
  box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.075);
}

.registration-form .form-icon{
text-align: center;
  background-color: rgb(115, 134, 213);
  border-radius: 50%;
  font-size: 40px;
  color: white;
  width: 100px;
  height: 100px;
  margin: auto;
  margin-bottom: 30px;
  line-height: 100px;
}
.form-control:focus {
  border-color: rgb(115, 134, 213);
  box-shadow: 0 0 0 0.2rem  rgb(115, 134, 213 , 0.25);
} 

.registration-form .item{
border-radius: 20px;
  margin-bottom: 20px;
  padding: 10px 20px;
}

.registration-form .create-account{
  border-radius: 30px;
  padding: 10px 20px;
  font-size: 18px;
  font-weight: bold;
  background-color: rgb(115, 134, 213);
  border: none;
  color: white;
  margin-top: 20px;
}


@media (max-width: 576px) {
  .registration-form form{
      padding: 50px 20px;
  }

  .registration-form .form-icon{
      width: 70px;
      height: 70px;
      font-size: 30px;
      line-height: 70px;
  }
}
`
