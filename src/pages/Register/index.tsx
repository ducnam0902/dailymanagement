import React, { useState } from "react";
import { InputText } from "primereact/inputtext";
import { Image } from "primereact/image";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, FormProvider, Controller } from "react-hook-form";
import { Button } from "primereact/button";
import { Link } from "react-router-dom";
import routes from "@/utils/route";
import UserService from "@/services/UserService";
import { useNavigate } from "react-router-dom";
import PasswordCustom from "@/components/PasswordCustom";
import { SignUpFormData, signUpSchema } from "@/types/user";
import { FileUpload, FileUploadFile } from "primereact/fileupload";
import envConfig from "@/utils/config";
import { ACCEPTED_IMAGE_TYPES, MAX_FILE_SIZE } from "@/utils/helper";
import { useAppDispatch } from "@/redux/hooks";
import { showToast } from "@/redux/toast/toast";
import { hideLoading, showLoading } from "@/redux/loading/loading";
import clsx from "clsx";

const Register = () => {
  const [imageFile, setImageFile] = useState<FileUploadFile>(null);
  const methods = useForm<SignUpFormData>({
    resolver: zodResolver(signUpSchema),
  });
  const {
    control,
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
  } = methods;
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const isValidImage = (file: File | null): boolean => {
    if (file && file?.size > MAX_FILE_SIZE) {
      setError("image", { message: "Max file size is 5MB." });
      return false;
    }
    if (file && !ACCEPTED_IMAGE_TYPES.includes(file.type)) {
      setError("image", {
        message: ".jpg, .jpeg, .png and .webp files are accepted.",
      });
      return false;
    }

    return true;
  };

  const uploadAvatarImage = async (file: File) => {
    const formData = new FormData();
    formData.append("file", file);
    const body = formData;
    let result: string = "";
    try {
      const data = await UserService.uploadImage(body);
      result = data.filePath;
    } catch (error) {
      if (error?.response?.data?.errors?.length > 0) {
        error?.response?.data?.errors.forEach((item) => {
          setError(item.field, { message: item.message });
        });
      }
      dispatch(hideLoading());
    }
    return result;
  };

  const createUser = async (data: SignUpFormData) => {
    try {
      const resp = await UserService.createUser(data);
      if (resp.ok) {
        navigate(routes.login);
        dispatch(
          showToast({
            type: "success",
            summary: "Created Account Successfully!",
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
  };

  const onSubmit = handleSubmit(async (data) => {
    const validImage = isValidImage(imageFile);
    if (validImage) {
      dispatch(showLoading());
      const resultImage: string = await uploadAvatarImage(imageFile);
      const payload = {
        ...data,
        image: resultImage,
      };
      await createUser(payload);
    }
  });

  return (
    <section className="relative h-screen">
      <section className="sm:h-[50vh] w-full bg-gradient-to-b from-primary to-secondary">
        <div className="sm:px-16 bg-white absolute sm:top-[50%] sm:left-[50%] sm:-translate-x-1/2 sm:-translate-y-1/2 shadow-lg shadow-primary text-center">
          <Image
            imageClassName=" block mt-6 mb-4 mx-auto"
            src="/logo.png"
            width="200"
          />
          <h2 className="text-2xl font-semibold text-neutral-400">Register</h2>
          <FormProvider {...methods}>
            <form
              onSubmit={onSubmit}
              className="w-screen sm:max-w-lg mt-2 mx-auto px-6 sm:px-0"
            >
              <section className="flex flex-col mb-1">
                <label htmlFor="firstName" className="text-left text-base mb-1">
                  First name
                </label>
                <div className="p-inputgroup flex-1">
                  <span className="p-inputgroup-addon">
                    <i className="pi pi-user"></i>
                  </span>
                  <InputText
                    id="firstName"
                    placeholder="First name"
                    className="hover:border-secondary focus:border-secondary focus:shadow-2xl w-full"
                    invalid={!!errors.firstName}
                    {...register("firstName")}
                  />
                </div>
                <small className="mt-1 text-red-500 text-left h-5">
                  {errors?.firstName?.message ?? ""}
                </small>
              </section>
              <section className="flex flex-col mb-1">
                <label htmlFor="lastName" className="text-left text-base mb-1">
                  Last name
                </label>
                <div className="p-inputgroup flex-1">
                  <span className="p-inputgroup-addon">
                    <i className="pi pi-user"></i>
                  </span>
                  <InputText
                    id="lastName"
                    placeholder="Last name"
                    className="hover:border-secondary focus:border-secondary focus:shadow-2xl w-full"
                    invalid={!!errors.lastName}
                    {...register("lastName")}
                  />
                </div>
                <small className="mt-1 text-red-500 text-left h-5">
                  {errors?.lastName?.message ?? ""}
                </small>
              </section>
              <section className="flex flex-col mb-1">
                <label htmlFor="email" className="text-left text-base mb-1">
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
              <section className="flex flex-col mb-1">
                <PasswordCustom
                  name="password"
                  label="Password"
                  placeholder="Password"
                />
              </section>

              <section className="flex flex-col mb-1">
                <PasswordCustom
                  name="confirmPassword"
                  placeholder="Confirm Password"
                  label="Confirm Password"
                />
              </section>
              <section className="mb-2 flex flex-col">
                <label htmlFor="image" className="text-left text-base mb-1">
                  Upload Image
                </label>
                <Controller
                  name="image"
                  control={control}
                  render={({ field }) => {
                    const { name, onChange } = field;
                    return (
                      <FileUpload
                        name={name}
                        accept="image/*"
                        mode="basic"
                        chooseOptions={{
                          label: "No file choosen",
                          className: clsx(
                            "w-full bg-white hover:border-secondary focus:shadow-2xl border border-solid border-[#d1d5db] rounded-4 text-neutral-400 font-light ",
                            {
                              "border-[#e24c4c]": !!errors.image,
                            }
                          ),
                        }}
                        onSelect={(e) => {
                          const file = e.files[0];
                          setImageFile(file);
                          onChange(envConfig.VITE_BASE_SERVER + file.name);
                        }}
                      />
                    );
                  }}
                />
                <small className="mt-1 text-red-500 text-left h-5">
                  {errors?.image?.message ?? ""}
                </small>
              </section>
              <Button
                disabled={isSubmitting}
                type="submit"
                label="Register"
                className="w-full bg-[#1c8c79] border-primary focus:shadow-2xl"
              />
            </form>
          </FormProvider>

          <h4 className="my-3 text-neutral-400 text-base">
            Have an account!
            <Link
              to={routes.login}
              className="text-secondary hover:underline ml-1"
            >
              Login
            </Link>
          </h4>
        </div>
      </section>
    </section>
  );
};

export default Register;
