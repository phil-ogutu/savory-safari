import React from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import YupPassword from "yup-password";
import { Button } from "../components/UI/Button";
import { useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack";
import ImageCarousel from "../components/UI/ImageCarousel";
import { toast } from "react-toastify";


// Extend Yup with password validation
YupPassword(Yup);

const validationSchema = Yup.object().shape({
  username: Yup.string().min(2).required("Username is required"),
  email: Yup.string().email().required("Email is required"),
  mobile: Yup.string().min(10).required("Mobile number is required"),
  password: Yup.string().password().required("Password is required"),
  role: Yup.string()
    .oneOf(["user", "restaurant"], "Select a role")
    .required("Role is required"),
});

const Register = () => {
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  return (
    <div className="flex items-center justify-center min-h-screen bg-white px-4">
      <div className="grid md:grid-cols-2 w-full max-w-5xl shadow-xl rounded-2xl overflow-hidden">
        {/* Left Form Panel */}
        <div className="bg-yellow-100 p-8 md:p-12 flex flex-col justify-center">
          <h2 className="text-2xl font-bold text-orange-700 mb-2">
            Create your account
          </h2>
          <p className="text-sm text-gray-600 mb-6">join us on a journey</p>

          <Formik
            initialValues={{
              username: "",
              email: "",
              mobile: "",
              password: "",
              role: "",
            }}
            validationSchema={validationSchema}
            onSubmit={(values,actions) => {
              fetch(`http://localhost:5000/api/${values.role}s/register`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(values),
              })
                .then((res) => {
                  if (res.status === 201) {
                    toast.success("Login successful!");
                    navigate("/home");
                    return res.json();
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
              <Form className="space-y-4">
                <div>
                  <label
                    className="text-sm font-semibold text-gray-700"
                    htmlFor="username"
                  >
                    Username
                  </label>
                  <Field
                    name="username"
                    type="text"
                    className="w-full px-4 py-2 rounded border"
                  />
                  {errors.username && touched.username && (
                    <div className="text-sm text-red-500">
                      {errors.username}
                    </div>
                  )}
                </div>

                <div>
                  <label
                    className="text-sm font-semibold text-gray-700"
                    htmlFor="email"
                  >
                    Email
                  </label>
                  <Field
                    name="email"
                    type="email"
                    className="w-full px-4 py-2 rounded border"
                  />
                  {errors.email && touched.email && (
                    <div className="text-sm text-red-500">{errors.email}</div>
                  )}
                </div>

                <div>
                  <label
                    className="text-sm font-semibold text-gray-700"
                    htmlFor="mobile"
                  >
                    Mobile
                  </label>
                  <Field
                    name="mobile"
                    type="text"
                    className="w-full px-4 py-2 rounded border"
                  />
                  {errors.mobile && touched.mobile && (
                    <div className="text-sm text-red-500">{errors.mobile}</div>
                  )}
                </div>

                <div>
                  <label
                    className="text-sm font-semibold text-gray-700"
                    htmlFor="password"
                  >
                    Password
                  </label>
                  <Field
                    name="password"
                    type="password"
                    className="w-full px-4 py-2 rounded border"
                  />
                  {errors.password && touched.password && (
                    <div className="text-sm text-red-500">
                      {errors.password}
                    </div>
                  )}
                </div>

                <div>
                  <label
                    className="text-sm font-semibold text-gray-700"
                    htmlFor="role"
                  >
                    Role
                  </label>
                  <Field
                    as="select"
                    name="role"
                    className="w-full px-4 py-2 rounded border"
                  >
                    <option value="">Select Role</option>
                    <option value="user">User</option>
                    <option value="restaurant">Restaurant</option>
                  </Field>
                  {errors.role && touched.role && (
                    <div className="text-sm text-red-500">{errors.role}</div>
                  )}
                </div>

                <div className="flex items-center justify-between text-sm">
                  <label className="flex items-center gap-2">
                    <input type="checkbox" className="accent-orange-700" />{" "}
                    Remember Me
                  </label>
                  <button type="button" className="text-orange-700">
                    Forgot password?
                  </button>
                </div>

                <Button content="Create Account" className="w-full" type="submit"/>

                <div
                  onClick={() => navigate("/login")}
                  className="text-center mt-2"
                >
                  <span className="text-sm text-gray-600">
                    Already have an account?{" "}
                  </span>
                  <span className="text-orange-700 font-bold cursor-pointer">
                    Log In
                  </span>
                </div>
              </Form>
            )}
          </Formik>
        </div>

        {/* Right Carousel / Inspo Panel */}
        <div className="hidden md:flex bg-white flex-col items-center justify-center p-10">
          <ImageCarousel height="h-[500px]" />
        </div>
      </div>
    </div>
  );
};

export default Register;
