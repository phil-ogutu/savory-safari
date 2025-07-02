import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import YupPassword from "yup-password";
import { Button } from "../components/UI/Button";
import React, { useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import useFetch from "../hooks/custom/useFetch.hook";
import { toast } from "react-toastify";

YupPassword(Yup);

const schema = Yup.object().shape({
  username: Yup.string().min(2, "Too short").required("Username is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  mobile: Yup.string()
    .min(10, "Must be at least 10 digits")
    .required("Mobile number is required"),
  user_bio: Yup.string().max(160, "Bio can't exceed 160 characters"),
  photo_url: Yup.string().url("Must be a valid URL"),
});

function UserSettings() {
  const token = localStorage.getItem('token');
  let decoded;
  if (token){
    decoded = jwtDecode(token);
    console.log('decoded',decoded)
  }
  const {FetchData,data:userData} = useFetch(`http://localhost:5000/users/${decoded?.id}`);
  useEffect(()=>{
    FetchData()
  },[]);
  console.log('userData',userData)

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-xl font-semibold mb-4 text-center">User Settings</h2>

      <Formik       
        enableReinitialize 
        initialValues={{
          username: userData?.username,
          email: userData?.email,
          mobile: userData?.mobile,
          user_bio: userData?.user_bio,
          photo_url: userData?.photo_url,
        }}
        validationSchema={schema}
        onSubmit={(values, actions) => {
          const payload = {
            username: values.username,
            mobile: values.mobile,
            user_bio: values.user_bio,
            photo_url: values.photo_url
          };
          fetch(`http://localhost:5000/users/${decoded?.id}`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload),
          })
            .then((res) => {
              if (res.status === 200) {
                toast.success("Update successfull!");
                return res.json();
              };
              return res.json().then((data) => {
                console.log(data)
                toast.error("Update failed!");
              });
            })
            .catch((err) =>{
                console.error(err)
                toast.error(`Update failed!${err}`)
              }
            )
            .finally(() => {
              actions.resetForm()
              actions.setSubmitting(false);
            });
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
                disabled
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
{/* 
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
            </div> */}

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