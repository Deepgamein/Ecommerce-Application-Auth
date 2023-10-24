import React from "react";
import Layout from "../../Components/Layout/Layout";
import { useFormik } from "formik";
import toast from "react-hot-toast";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/auth";
// import { useAuth } from '../../context/auth';

const Login = () => {
  const navigate = useNavigate();
  const [auth, setAuth] = useAuth();
  const notify = (test) => toast(test);
  // console.log(useFormik({}))
  const initialValues = {
    password: "",
    email: "",
  };
  // console.log(useAuth);

  const formik = useFormik({
    initialValues: initialValues,
    onSubmit: async (values) => {
      // console.log(values)
      // console.log(process.env.REACT_APP_API)
      // console.log(values)
      try {
        const res = await axios.post(
          `${process.env.REACT_APP_API}/login`,
          values
        );
        // console.log(res)
        if (res && res.data.success) {
          // toast.success("Register successfully")
          notify(res.data.message);
          navigate("/");
          setAuth({
            ...auth,
            user: res.data.user,
            token: res.data.token,
          });
          localStorage.setItem("auth", JSON.stringify(res?.data));
        } else {
          toast.error(res.data.message);
        }
      } catch (error) {
        toast.error("Error");
      }
    },
  });
  return (
    <Layout title="Login - Ecommerce App">
      <div className="login">
        <h1>Login</h1>
        <form onSubmit={formik?.handleSubmit}>
          <div class="mb-3">
            <label for="exampleInputEmail1" class="form-label">
              Email
            </label>
            <input
              name="email"
              value={formik?.values?.email}
              type="email"
              class="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              placeholder="Enter Your Mail"
              onChange={formik?.handleChange}
            />
          </div>
          <div class="mb-3">
            <label for="exampleInputPassword1" class="form-label">
              Password
            </label>
            <input
              name="password"
              value={formik?.values?.password}
              type="password"
              class="form-control"
              id="exampleInputPassword1"
              placeholder="Enter Password"
              onChange={formik?.handleChange}
            />
          </div>
          <button type="submit">Login</button>
          {/* <button class="btn btn-primary">Login</button> */}
        </form>
      </div>
    </Layout>
  );
};

export default Login;
