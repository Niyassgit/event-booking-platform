import React, { useState } from "react";
import FormImage from "../../../assets/images/wedding-7658831_1280.png";
import type { signupPayLoad } from "../../../types";
import { registerSchema } from "../validation/SignupSchema";
import toast from "react-hot-toast";
import { signup } from "../api";
import { useNavigate } from "react-router-dom";

interface SignupFormProps {
  onSwitch: () => void;
}

const SignupForm: React.FC<SignupFormProps> = ({ onSwitch }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<signupPayLoad>({
    email: "",
    name: "",
    password: "",
    cpassword: "",
    role: "",
  });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear error when user types
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Clear previous errors
    setErrors({});

    const validationResult = registerSchema.safeParse(formData);
    if (!validationResult.success) {
      const fieldErrors: { [key: string]: string } = {};
      validationResult.error.issues.forEach((err) => {
        if (err.path[0]) {
          fieldErrors[err.path[0] as string] = err.message;
        }
      });
      setErrors(fieldErrors);
      return;
    }

    try {
      const res = await signup(formData);
      toast.dismiss();
      if (res.success) {
        toast.success("User Registered Successfully");
        navigate("/");
      } else {
        toast.error("Registeration failed");
      }
    } catch (error: any) {
      toast.dismiss();
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "Internal server error";
      toast.error(errorMessage);
    }
  };
  return (
    <div className="flex h-[700px] w-full">
      <div className="w-full hidden md:inline-block">
        <img className="h-full" src={FormImage} alt="leftSideImage" />
      </div>

      <div className="w-full flex flex-col items-center justify-center">
        <form
          className="md:w-96 w-80 flex flex-col items-center justify-center"
          onSubmit={handleSubmit}
          noValidate
        >
          <h2 className="text-4xl text-gray-200 font-medium">Sign up</h2>
          <p className="text-sm text-gray-500/90 mt-3">
            Create an account to get started
          </p>

          <button
            type="button"
            className="w-full mt-8 bg-gray-500/10 flex items-center justify-center h-12 rounded-full"
          >
            <img
              src="https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/login/googleLogo.svg"
              alt="googleLogo"
            />
          </button>

          <div className="flex items-center gap-4 w-full my-5">
            <div className="w-full h-px bg-gray-300/90"></div>
            <p className="w-full text-nowrap text-sm text-gray-500/90">
              or sign up with email
            </p>
            <div className="w-full h-px bg-gray-300/90"></div>
          </div>

          <div className="w-full mb-6">
            <div
              className={`flex items-center w-full bg-transparent border ${
                errors.name ? "border-red-500" : "border-gray-300/60"
              } h-12 rounded-full overflow-hidden pl-6 gap-2 transition-colors`}
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M20 21V19C20 17.9391 19.5786 16.9217 18.8284 16.1716C18.0783 15.4214 17.0609 15 16 15H8C6.93913 15 5.92172 15.4214 5.17157 16.1716C4.42143 16.9217 4 17.9391 4 19V21"
                  stroke={errors.name ? "#ef4444" : "#6B7280"}
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M12 11C14.2091 11 16 9.20914 16 7C16 4.79086 14.2091 3 12 3C9.79086 3 8 4.79086 8 7C8 9.20914 9.79086 11 12 11Z"
                  stroke={errors.name ? "#ef4444" : "#6B7280"}
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Full Name"
                className="bg-transparent text-gray-500/80 placeholder-gray-500/80 outline-none text-sm w-full h-full"
                required
              />
            </div>
            {errors.name && (
              <p className="text-red-500 text-xs ml-4 mt-1">{errors.name}</p>
            )}
          </div>

          <div className="w-full">
            <div
              className={`flex items-center w-full bg-transparent border ${
                errors.email ? "border-red-500" : "border-gray-300/60"
              } h-12 rounded-full overflow-hidden pl-6 gap-2 transition-colors`}
            >
              <svg
                width="16"
                height="11"
                viewBox="0 0 16 11"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M0 .55.571 0H15.43l.57.55v9.9l-.571.55H.57L0 10.45zm1.143 1.138V9.9h13.714V1.69l-6.503 4.8h-.697zM13.749 1.1H2.25L8 5.356z"
                  fill={errors.email ? "#ef4444" : "#6B7280"}
                />
              </svg>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Email id"
                className="bg-transparent text-gray-500/80 placeholder-gray-500/80 outline-none text-sm w-full h-full"
                required
              />
            </div>
            {errors.email && (
              <p className="text-red-500 text-xs ml-4 mt-1">{errors.email}</p>
            )}
          </div>

          <div className="w-full mt-6">
            <div
              className={`flex items-center w-full bg-transparent border ${
                errors.password ? "border-red-500" : "border-gray-300/60"
              } h-12 rounded-full overflow-hidden pl-6 gap-2 transition-colors`}
            >
              <svg
                width="13"
                height="17"
                viewBox="0 0 13 17"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M13 8.5c0-.938-.729-1.7-1.625-1.7h-.812V4.25C10.563 1.907 8.74 0 6.5 0S2.438 1.907 2.438 4.25V6.8h-.813C.729 6.8 0 7.562 0 8.5v6.8c0 .938.729 1.7 1.625 1.7h9.75c.896 0 1.625-.762 1.625-1.7zM4.063 4.25c0-1.406 1.093-2.55 2.437-2.55s2.438 1.144 2.438 2.55V6.8H4.061z"
                  fill={errors.password ? "#ef4444" : "#6B7280"}
                />
              </svg>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Password"
                className="bg-transparent text-gray-500/80 placeholder-gray-500/80 outline-none text-sm w-full h-full"
                required
              />
            </div>
            {errors.password && (
              <p className="text-red-500 text-xs ml-4 mt-1">
                {errors.password}
              </p>
            )}
          </div>

          <div className="w-full mt-6">
            <div
              className={`flex items-center w-full bg-transparent border ${
                errors.cpassword ? "border-red-500" : "border-gray-300/60"
              } h-12 rounded-full overflow-hidden pl-6 gap-2 transition-colors`}
            >
              <svg
                width="13"
                height="17"
                viewBox="0 0 13 17"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M13 8.5c0-.938-.729-1.7-1.625-1.7h-.812V4.25C10.563 1.907 8.74 0 6.5 0S2.438 1.907 2.438 4.25V6.8h-.813C.729 6.8 0 7.562 0 8.5v6.8c0 .938.729 1.7 1.625 1.7h9.75c.896 0 1.625-.762 1.625-1.7zM4.063 4.25c0-1.406 1.093-2.55 2.437-2.55s2.438 1.144 2.438 2.55V6.8H4.061z"
                  fill={errors.cpassword ? "#ef4444" : "#6B7280"}
                />
              </svg>
              <input
                type="password"
                name="cpassword"
                value={formData.cpassword}
                onChange={handleChange}
                placeholder="Confirm Password"
                className="bg-transparent text-gray-500/80 placeholder-gray-500/80 outline-none text-sm w-full h-full"
                required
              />
            </div>
            {errors.cpassword && (
              <p className="text-red-500 text-xs ml-4 mt-1">
                {errors.cpassword}
              </p>
            )}
          </div>

          <button
            type="submit"
            className="mt-8 w-full h-11 rounded-full text-white bg-indigo-500 hover:opacity-90 transition-opacity"
          >
            Sign Up
          </button>
          <p className="text-gray-500/90 text-sm mt-4">
            Already have an account?{" "}
            <a
              className="text-indigo-400 hover:underline cursor-pointer"
              onClick={(e) => {
                e.preventDefault();
                onSwitch();
              }}
            >
              Login
            </a>
          </p>
        </form>
      </div>
    </div>
  );
};

export default SignupForm;
