import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import YupPassword from "yup-password";
import { Button } from "../components/UI/Button";
import { useNavigate, Link } from "react-router-dom";
import { useSnackbar } from "notistack";

YupPassword(Yup);

const validationSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string().required("Password is required").min(6, "Min 6 chars"),
});

export default function Login({ setUser }) {
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  return (
    <div className="flex h-screen">
      <div className="w-full md:w-1/2 flex flex-col justify-center items-center bg-yellow-100 p-8 rounded-l-3xl">
        <h2 className="text-2xl font-semibold mb-2 text-orange-700">
          Welcome back
        </h2>
        <p className="mb-6 text-orange-700">Login to your account</p>

        <Formik
          initialValues={{ email: "", password: "" }}
          validationSchema={validationSchema}
          onSubmit={(values, actions) => {
            fetch("https://example.com/login_user", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(values),
            })
              .then((res) => {
                if (res.status === 201) {
                  enqueueSnackbar("Login successful!", { variant: "success" });
                  return res.json();
                }
                return res.json().then((data) => {
                  enqueueSnackbar(data.message || "Login failed", {
                    variant: "error",
                  });
                });
              })
              .then((user) => {
                setUser(user);
                navigate("/");
              })
              .catch(() =>
                enqueueSnackbar("Network error", { variant: "error" })
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

              <div className="flex items-center justify-between text-sm text-orange-700">
                <label className="flex items-center">
                  <input type="checkbox" className="mr-1" /> Remember Me
                </label>
                <Link to="#">Forgot password?</Link>
              </div>

              <Button content="Login" className="w-full" />

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
        <div className="text-center">
          <h1 className="text-4xl font-bold text-orange-700 mb-4">
            savorySafari
          </h1>
          <p className="text-2xl font-bold text-orange-600">
            Some content / images
          </p>
          <p className="text-2xl font-bold text-orange-600">
            carousels of food
          </p>
          <p className="text-sm text-yellow-500 mt-4">some inspos goes here</p>
          <div className="flex justify-center mt-2 space-x-1">
            <span className="w-2 h-2 rounded-full bg-yellow-400"></span>
            <span className="w-2 h-2 rounded-full bg-yellow-400"></span>
            <span className="w-2 h-2 rounded-full bg-yellow-400"></span>
          </div>
        </div>
      </div>
    </div>
  );
}
