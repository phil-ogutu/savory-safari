import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import YupPassword from "yup-password";
import { Button } from "../components/UI/Button";
import { useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack";

YupPassword(Yup);

function Register() {
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const schema = Yup.object().shape({
    username: Yup.string().min(2).required("Username is required"),
    email: Yup.string().email().required("Email is required"),
    mobile: Yup.string().min(10).required("Mobile number is required"),
    password: Yup.string().password().required("Password is required"),
  });

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
            }}
            validationSchema={schema}
            onSubmit={(values) => {
              fetch("https://example.com/signup_user", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(values),
              }).then((res) => {
                if (res.status === 201) {
                  enqueueSnackbar("Signed up successfully", {
                    variant: "success",
                  });
                  navigate("/login");
                } else {
                  enqueueSnackbar("Something went wrong", { variant: "error" });
                }
              });
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

                <div className="flex items-center justify-between text-sm">
                  <label className="flex items-center gap-2">
                    <input type="checkbox" className="accent-orange-700" />{" "}
                    Remember Me
                  </label>
                  <button type="button" className="text-orange-700">
                    Forgot password?
                  </button>
                </div>

                <Button content="Create Account" className="w-full" />

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
          <h1 className="text-3xl font-bold text-orange-700 mb-4">
            savorySafari
          </h1>
          <div className="text-center text-2xl font-bold text-orange-800 leading-snug">
            Some
            <br />
            content / images
            <br />
            carousels of food
          </div>
          <p className="text-sm mt-4 text-yellow-500">some inspos goes here</p>
          <div className="mt-6 flex gap-2">
            <span className="w-3 h-3 bg-yellow-400 rounded-full"></span>
            <span className="w-3 h-3 bg-yellow-300 rounded-full"></span>
            <span className="w-3 h-3 bg-yellow-500 rounded-full"></span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
