import React from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import Button from "../components/UI/Button";
import { Link } from "react-router-dom";
import ImageCarousel from "../components/UI/ImageCarousel";
import { toast } from "react-toastify";

// YupPassword(Yup);

const validationSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string().required("Password is required").min(4, "Min 6 chars"),
  role: Yup.string()
    .oneOf(["user", "restaurant"], "Select a role")
    .required("Role is required"),
});

const Login = ({ setUser }) => {
  const navigate = useNavigate();
  return (
    <div className="flex h-screen">
      <div className="w-full md:w-1/2 flex flex-col justify-center items-center bg-yellow-100 p-8 rounded-l-3xl">
        <h2 className="text-2xl font-semibold mb-2 text-orange-700">
          Welcome back
        </h2>
        <p className="mb-6 text-orange-700">Login to your account</p>

        <Formik
          initialValues={{ email: "", password: "", role: "" }}
          validationSchema={validationSchema}
          onSubmit={(values, actions) => {
            console.log(values)
            fetch(`http://localhost:5000/api/${values.role}s/login`, {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(values),
              credentials: 'include',
            })
              .then((res) => {
                if (res.status === 201) {
                  toast.success("Login successful!");
                  return res.json().then((data) => {
                    navigate("/home");
                    localStorage.setItem('token', data?.token);
                  });
                }
                return res.json().then((data) => {
                  console.log(data)
                  toast.error("Login failed!");
                });
              })
              .catch((err) =>{
                  console.error(err)
                  toast.error(`Login failed!${err}`)
                }
              )
              .finally(() => actions.resetForm());
          }}
        >
          {({ errors, touched }) => (
            <Form className="w-full max-w-xs space-y-4">
              <div>
                <label className="block text-sm text-orange-700">Email</label>
                <Field
                  name="email"
                  type="email"
                  className="w-full p-2 border rounded"
                />
                {errors.email && touched.email && (
                  <div className="text-red-600 text-sm">{errors.email}</div>
                )}
              </div>

              <div>
                <label className="block text-sm text-orange-700">
                  Password
                </label>
                <Field
                  name="password"
                  type="password"
                  className="w-full p-2 border rounded"
                />
                {errors.password && touched.password && (
                  <div className="text-red-600 text-sm">{errors.password}</div>
                )}
              </div>

              <div>
                <label className="block text-sm text-orange-700">
                  Login as
                </label>
                <Field
                  as="select"
                  name="role"
                  className="w-full p-2 border rounded"
                >
                  <option value="">Select Role</option>
                  <option value="user">User</option>
                  <option value="restaurant">Restaurant</option>
                </Field>
                {errors.role && touched.role && (
                  <div className="text-red-600 text-sm">{errors.role}</div>
                )}
              </div>

              <div className="flex items-center justify-between text-sm text-orange-700">
                <label className="flex items-center">
                  <input type="checkbox" className="mr-1" /> Remember Me
                </label>
                <Link to="#">Forgot password?</Link>
              </div>

              <Button content="Login" className="w-full" type="submit"/>

              <Link
                to="/register"
                className="block text-center text-sm text-orange-700 mt-2 font-semibold py-2 rounded-md"
              >
                Create an account
              </Link>
            </Form>
          )}
        </Formik>
      </div>

      <div className="hidden md:flex w-1/2 justify-center items-center bg-white">
        <ImageCarousel height="h-[700px]" />
      </div>
    </div>
  );
};

export default Login;
