import { useState, useEffect } from "react";
import FormImage from "../../../assets/images/wedding-7658831_1280.png";
import SignupForm from "./SignupForm";
import type { LoginPayload } from "../../../types";
import { loginApi } from "../api";
import { useAppDispatch, useAppSelector } from "../../../hooks/redux";
import { Role } from "../../../utils/constants";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { login } from "../authSlice";
import { loginSchema } from "../validation/LoginSchema";

const LoginForm = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.auth);
  const [isSignup, setIsSignup] = useState(false);
  const [formData, setFormData] = useState<LoginPayload>({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState<{ email?: string; password?: string }>(
    {}
  );

  useEffect(() => {
    if (user) {
      if (user.role === Role.ADMIN) {
        navigate("/admin/dashboard", { replace: true });
      } else {
        navigate("/user/dashboard", { replace: true });
      }
    }
  }, [user, navigate]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear error when user types
    if (errors[name as keyof typeof errors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const validationResult = loginSchema.safeParse(formData);

    if (!validationResult.success) {
      const fieldErrors: { email?: string; password?: string } = {};
      validationResult.error.issues.forEach((err) => {
        if (err.path[0]) {
          fieldErrors[err.path[0] as keyof typeof fieldErrors] = err.message;
        }
      });
      setErrors(fieldErrors);
      return;
    }

    // Clear any existing errors
    setErrors({});

    try {
      const res = await loginApi(formData);
      toast.dismiss();
      if (res.success) {
        toast.success("Login success");
        dispatch(login({ token: res.data.token, user: res.data.user }));

        if (res.data.user.role === Role.ADMIN) {
          navigate("/admin/dashboard");
        } else if (res.data.user.role === Role.USER) {
          navigate("/user/dashboard");
        } else {
          navigate("/page-not-found");
        }
      } else {
        toast.error("Login Failed");
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

  if (user) {
    return null; // Or a loading spinner
  }

  if (isSignup) {
    return <SignupForm onSwitch={() => setIsSignup(false)} />;
  }

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
          <h2 className="text-4xl text-gray-200 font-medium">Sign in</h2>
          <p className="text-sm text-gray-500/90 mt-3">
            Welcome back! Please sign in to continue
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
              or sign in with email
            </p>
            <div className="w-full h-px bg-gray-300/90"></div>
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

          <div className="w-full flex items-center justify-between mt-8 text-gray-500/80">
            <div className="flex items-center gap-2">
              <input className="h-5" type="checkbox" id="checkbox" />
              <label className="text-sm" htmlFor="checkbox">
                Remember me
              </label>
            </div>
            <a className="text-sm underline" href="#">
              Forgot password?
            </a>
          </div>

          <button
            type="submit"
            className="mt-8 w-full h-11 rounded-full text-white bg-indigo-500 hover:opacity-90 transition-opacity"
          >
            Login
          </button>
          <p className="text-gray-500/90 text-sm mt-4">
            Don’t have an account?{" "}
            <a
              className="text-indigo-400 hover:underline cursor-pointer"
              href="#"
              onClick={(e) => {
                e.preventDefault();
                setIsSignup(true);
              }}
            >
              Sign up
            </a>
          </p>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
