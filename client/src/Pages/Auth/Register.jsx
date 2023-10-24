import React from "react";
import Layout from "../../Components/Layout/Layout";
import { useFormik } from "formik";
import toast from "react-hot-toast";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();
  const notify = (test) => toast(test);
  // console.log(useFormik({}))
  const initialValues = {
    name: "",
    email: "",
  };
  const formik = useFormik({
    initialValues: initialValues,
    onSubmit: async (values) => {
      // console.log(values)
      // console.log(process.env.REACT_APP_API)
      // console.log(values)
      try {
        const res = await axios.post(
          `${process.env.REACT_APP_API}/register`,
          values
        );
        // console.log(res)
        if (res && res.data.success) {
          // toast.success("Register successfully")

          notify(res.data.message);

          // navigate('/login')
        } else {
          toast.error(res.data.message);
        }
      } catch (error) {
        toast.error("Error");
      }
    },
  });

  return (
    <>
      <Layout title="Register - Ecommerce App">
        <div className="register">
          <h1>Register</h1>
          <form onSubmit={formik.handleSubmit}>
            <div class="mb-3">
              <label for="exampleInputEmail1" class="form-label">
                Name
              </label>
              <input
                name="name"
                value={formik.values.name}
                type="text"
                class="form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                placeholder="Enter Your Name"
                onChange={formik.handleChange}
              />
            </div>
            <div class="mb-3">
              <label for="exampleInputEmail1" class="form-label">
                Email
              </label>
              <input
                name="email"
                value={formik.values.email}
                type="email"
                class="form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                placeholder="Enter Your Mail"
                onChange={formik.handleChange}
              />
            </div>
            <div class="mb-3">
              <label for="exampleInputPassword1" class="form-label">
                Password
              </label>
              <input
                name="password"
                value={formik.values.password}
                type="password"
                class="form-control"
                id="exampleInputPassword1"
                placeholder="Enter Password"
                onChange={formik.handleChange}
              />
            </div>
            <div class="mb-3">
              <label for="exampleInputEmail1" class="form-label">
                Phone. No.
              </label>
              <input
                name="phone"
                values={formik.values.phone}
                type="text"
                class="form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                placeholder="Enter Your Phone No"
                onChange={formik.handleChange}
              />
            </div>
            <div class="mb-3">
              <label for="exampleInputEmail1" class="form-label">
                Address
              </label>
              <input
                name="address"
                value={formik.values.address}
                type="text"
                class="form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                placeholder="Enter Your Address"
                onChange={formik.handleChange}
              />
            </div>
            <button type="submit" >
              Register
            </button>
            {/* <button class="btn btn-primary">Login</button> */}
          </form>
        </div>
      </Layout>
    </>
  );
};

export default Register;
