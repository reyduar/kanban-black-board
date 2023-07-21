/* eslint-disable @next/next/no-img-element */
import React, { useContext, useRef, useState } from "react";
import { InputText } from "primereact/inputtext";
import { Messages } from "primereact/messages";
import { Checkbox } from "primereact/checkbox";
import { Button } from "primereact/button";
import { LayoutContext } from "@/layout/context/layoutcontext";
import { SubmitHandler, useForm } from "react-hook-form";
import { validations } from "@/utils";
import { AuthContext } from "@/auth/context";
import { useRouter } from "next/router";

type FormData = {
  email: string;
  password: string;
};

function LoginPage() {
  const router = useRouter();
  const { layoutConfig } = useContext(LayoutContext);
  const { loginUser } = useContext(AuthContext);
  const [checked, setChecked] = useState(false);
  const message = useRef<Messages>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();
  const onLogin: SubmitHandler<FormData> = async ({
    email,
    password,
  }: FormData) => {
    const authResponse = await loginUser(email, password);
    if (authResponse.hasError) {
      addErrorMessage(authResponse.message || "Invalid username/password.");
      return;
    }

    router.replace("/");
  };

  const clearMessages = () => {
    message?.current!.clear();
  };

  const addErrorMessage = (msg: string) => {
    message?.current!.show({ severity: "error", content: msg });
  };

  return (
    <div className="flex align-items-center justify-content-center">
      <div className="surface-card p-4 shadow-2 border-round w-full lg:w-6">
        <div className="text-center mb-5">
          <img
            src={`/layout/images/logo-${
              layoutConfig.colorScheme !== "light" ? "white" : "dark"
            }.svg`}
            height={50}
            alt="logo"
          />
          <div className="text-900 text-3xl font-medium mb-3">Welcome Back</div>
          <span className="text-600 font-medium line-height-3">
            Do not have an account?
          </span>
          <a
            href="/login/signup"
            className="font-medium no-underline ml-2 text-blue-500 cursor-pointer"
          >
            Create today!
          </a>
        </div>
        <form onSubmit={handleSubmit(onLogin)} noValidate>
          <Messages ref={message} />
          <div>
            <label htmlFor="email" className="block text-900 font-medium mb-2">
              Email
            </label>
            <InputText
              id="email"
              type="email"
              placeholder="Email address"
              className={errors.email ? "p-invalid w-full mb-3" : "w-full mb-3"}
              {...register("email", {
                required: "Email is required",
                validate: validations.isEmail,
              })}
            />
            {errors.email && (
              <span className="p-error">{errors.email.message}</span>
            )}
            <label
              htmlFor="password"
              className="block text-900 font-medium mb-2 mt-3"
            >
              Password
            </label>
            <InputText
              id="password"
              type="password"
              placeholder="Password"
              className={
                errors.password ? "p-invalid w-full mb-3" : "w-full mb-3"
              }
              {...register("password", {
                required: "Password is required",
                minLength: { value: 6, message: "Min 6 characters" },
              })}
            />
            {errors.password && (
              <span className="p-error">{errors.password.message}</span>
            )}

            <div className="flex align-items-center justify-content-between mb-6 mt-3">
              <div className="flex align-items-center">
                <Checkbox
                  id="rememberme"
                  onChange={(e) => setChecked(e.checked!)}
                  checked={checked}
                  className="mr-2"
                />
                <label htmlFor="rememberme" className="text-900">
                  Remember me
                </label>
              </div>
              <a className="font-medium no-underline ml-2 text-blue-500 text-right cursor-pointer">
                Forgot your password?
              </a>
            </div>

            <Button
              type="submit"
              label="Sign In"
              icon="pi pi-user"
              className="w-full"
            />
          </div>
        </form>
      </div>
    </div>
  );
}

export default LoginPage;
