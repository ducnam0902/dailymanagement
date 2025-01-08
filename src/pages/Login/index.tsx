import React from "react";
import { InputText } from "primereact/inputtext";
import { Image } from "primereact/image";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, FormProvider } from "react-hook-form";
import { SignInFormData, signInSchema, UserData } from "@/types/user.js";
import { Button } from "primereact/button";
import { Link } from "react-router-dom";
import routes from "@/utils/route";
import UserService from "@/services/UserService";
import { useNavigate } from "react-router-dom";
import PasswordCustom from "@/components/PasswordCustom";
import { useAppDispatch } from "@/redux/hooks";
import { showToast } from "@/redux/toast/toast";
import { hideLoading, showLoading } from "@/redux/loading/loading";
const Login = () => {
  const methods = useForm<SignInFormData>({
    resolver: zodResolver(signInSchema),
  });
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
  } = methods;
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const onSubmit = handleSubmit(async (data) => {
    try {
      dispatch(showLoading());
      const resp = await UserService.signIn(data);
      if (resp?.id) {
        const { accessToken, refreshToken } = resp;
        localStorage.setItem("accessToken", accessToken);
        localStorage.setItem("refreshToken", refreshToken);
        const userData: UserData = {
          ...resp,
        };
        localStorage.setItem("user", JSON.stringify(userData));
        navigate(routes.home);
        dispatch(
          showToast({
            type: "success",
            summary: "Login Successfully!",
          })
        );
      }
    } catch (error) {
      if (error?.response?.data?.errors?.length > 0) {
        error?.response?.data?.errors.forEach((item) => {
          setError(item.field, { message: item.message });
        });
      }
    } finally {
      dispatch(hideLoading());
    }
  });

  return (
    <section className="relative h-screen">
      <section className="h-[50vh] w-full bg-gradient-to-b from-primary to-secondary">
        <div className="sm:px-16 h-[580px] bg-white absolute top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 shadow-lg shadow-primary text-center">
          <Image
            imageClassName=" block mt-6 mb-4 mx-auto"
            src="/logo.png"
            width="200"
          />
          <h2 className="text-2xl font-semibold text-neutral-400">Login</h2>
          <FormProvider {...methods}>
            <form
              onSubmit={onSubmit}
              className="w-screen sm:w-96 mt-4 mx-auto px-6 sm:px-0"
            >
              <section className="flex flex-col mb-4">
                <label htmlFor="email" className="text-left text-base mb-2">
                  Email
                </label>
                <div className="p-inputgroup flex-1">
                  <span className="p-inputgroup-addon">
                    <i className="pi pi-user"></i>
                  </span>
                  <InputText
                    id="email"
                    placeholder="Email"
                    className="hover:border-secondary focus:border-secondary focus:shadow-2xl w-full"
                    invalid={!!errors.email}
                    {...register("email")}
                  />
                </div>

                <small className="mt-1 text-red-500 text-left h-5">
                  {errors?.email?.message ?? ""}
                </small>
              </section>
              <section className="flex flex-col">
                <PasswordCustom
                  name="password"
                  placeholder="Password"
                  label="Password"
                />
              </section>
              <Button
                disabled={isSubmitting}
                type="submit"
                label="Login"
                className="mt-8 w-full bg-[#1c8c79] border-primary focus:shadow-2xl"
              />
            </form>
          </FormProvider>

          <h4 className="mt-6 text-neutral-400 text-base">
            Don't have an account?
            <Link
              to={routes.register}
              className="text-secondary hover:underline ml-1"
            >
              Register
            </Link>
          </h4>
        </div>
      </section>
    </section>
  );
};

export default Login;
