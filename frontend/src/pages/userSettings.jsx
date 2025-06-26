import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import YupPassword from "yup-password";
import { Button } from "../components/UI/Button";
import { useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack";
import React from "react";

YupPassword(Yup);

const schema = Yup.object().shape({
  username: Yup.string().min(2, "Too short").required("Username is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  mobile: Yup.string()
    .min(10, "Must be at least 10 digits")
    .required("Mobile number is required"),
  password: Yup.string().password().required("Password is required"),
  user_bio: Yup.string().max(160, "Bio can't exceed 160 characters"),
  photo_url: Yup.string().url("Must be a valid URL"),
});

function UserSettings() {
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-xl font-semibold mb-4 text-center">User Settings</h2>

      <Formik
        initialValues={{
          username: "",
          email: "",
          mobile: "",
          password: "",
          user_bio: "",
          photo_url: "",
        }}
        validationSchema={schema}
        onSubmit={(values, actions) => {
          console.log("Submitted:", values);
          enqueueSnackbar("Settings updated!", { variant: "success" });
          actions.setSubmitting(false);
        }}
      >
        {({ isSubmitting }) => (
          <Form className="space-y-4">
            <div>
              <label className="block mb-1">Username</label>
              <Field
                name="username"
                className="w-full px-4 py-2 border border-gray-300 rounded-md"
              />
              <ErrorMessage
                name="username"
                component="div"
                className="text-red-500 text-sm"
              />
            </div>

            <div>
              <label className="block mb-1">Email</label>
              <Field
                type="email"
                name="email"
                className="w-full px-4 py-2 border border-gray-300 rounded-md"
              />
              <ErrorMessage
                name="email"
                component="div"
                className="text-red-500 text-sm"
              />
            </div>

            <div>
              <label className="block mb-1">Mobile</label>
              <Field
                name="mobile"
                className="w-full px-4 py-2 border border-gray-300 rounded-md"
              />
              <ErrorMessage
                name="mobile"
                component="div"
                className="text-red-500 text-sm"
              />
            </div>

            <div>
              <label className="block mb-1">Password</label>
              <Field
                type="password"
                name="password"
                className="w-full px-4 py-2 border border-gray-300 rounded-md"
              />
              <ErrorMessage
                name="password"
                component="div"
                className="text-red-500 text-sm"
              />
            </div>

            <div>
              <label className="block mb-1">Bio</label>
              <Field
                as="textarea"
                name="user_bio"
                className="w-full px-4 py-2 border border-gray-300 rounded-md"
              />
              <ErrorMessage
                name="user_bio"
                component="div"
                className="text-red-500 text-sm"
              />
            </div>

            <div>
              <label className="block mb-1">Photo URL</label>
              <Field
                name="photo_url"
                className="w-full px-4 py-2 border border-gray-300 rounded-md"
              />
              <ErrorMessage
                name="photo_url"
                component="div"
                className="text-red-500 text-sm"
              />
            </div>
            <Button type="submit" content={isSubmitting ? "Updating..." : "Update Settings"} className="w-full" disabled={isSubmitting} />
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default UserSettings;