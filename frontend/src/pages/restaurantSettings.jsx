import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import YupPassword from "yup-password";
import { Button } from "../components/UI/Button";
import { useSnackbar } from "notistack";

YupPassword(Yup);

const RestaurantSettings = () => {
  const { enqueueSnackbar } = useSnackbar();

  const schema = Yup.object().shape({
    name: Yup.string().min(2, "Too short").required("Name is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    mobile: Yup.string().min(10, "At least 10 digits").required("Mobile is required"),
    password: Yup.string().password().required("Password is required"),
    restaurant_bio: Yup.string().max(300, "Max 300 characters"),
    photo_url: Yup.string().url("Must be a valid URL"),
  });

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-xl font-semibold mb-4">Restaurant Settings</h2>

      <Formik
        initialValues={{
          name: "",
          email: "",
          mobile: "",
          password: "",
          restaurant_bio: "",
          photo_url: "",
        }}
        validationSchema={schema}
        onSubmit={(values, actions) => {
          console.log("Submitted:", values);
          enqueueSnackbar("Restaurant profile updated!", { variant: "success" });
          actions.setSubmitting(false);
        }}
      >
        {({ isSubmitting }) => (
          <Form className="space-y-4">
            <div>
              <label className="block mb-1">Name</label>
              <Field
                name="name"
                className="w-full px-4 py-2 border border-gray-300 rounded-md"
              />
              <ErrorMessage name="name" component="div" className="text-red-500 text-sm" />
            </div>

            <div>
              <label className="block mb-1">Email</label>
              <Field
                type="email"
                name="email"
                className="w-full px-4 py-2 border border-gray-300 rounded-md"
              />
              <ErrorMessage name="email" component="div" className="text-red-500 text-sm" />
            </div>

            <div>
              <label className="block mb-1">Mobile</label>
              <Field
                name="mobile"
                className="w-full px-4 py-2 border border-gray-300 rounded-md"
              />
              <ErrorMessage name="mobile" component="div" className="text-red-500 text-sm" />
            </div>

            <div>
              <label className="block mb-1">Password</label>
              <Field
                type="password"
                name="password"
                className="w-full px-4 py-2 border border-gray-300 rounded-md"
              />
              <ErrorMessage name="password" component="div" className="text-red-500 text-sm" />
            </div>

            <div>
              <label className="block mb-1">Restaurant Bio</label>
              <Field
                as="textarea"
                name="restaurant_bio"
                className="w-full px-4 py-2 border border-gray-300 rounded-md"
              />
              <ErrorMessage
                name="restaurant_bio"
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
              <ErrorMessage name="photo_url" component="div" className="text-red-500 text-sm" />
            </div>

            <Button type="submit" content={isSubmitting ? "Updating..." : "Update Settings"} className="w-full" disabled={isSubmitting} />
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default RestaurantSettings;
