/* eslint-disable @next/next/no-img-element */
import React, { useContext, useEffect, useMemo, useRef, useState } from "react";
import { InputText } from "primereact/inputtext";
import { Messages } from "primereact/messages";
import { Checkbox } from "primereact/checkbox";
import { Button } from "primereact/button";
import { LayoutContext } from "@/layout/context/layoutcontext";
import { SubmitHandler, useForm } from "react-hook-form";
import { validations } from "@/utils";
import { userApi } from "@/services";
import { useRouter } from "next/router";
import { AuthContext } from "@/auth/context";

type FormData = {
  name: string;
  email: string;
  password: string;
  repeatedPassword: string;
};

function SigUpPage() {
  const router = useRouter();
  const { layoutConfig } = useContext(LayoutContext);
  const { createUser } = useContext(AuthContext);
  const message = useRef<Messages>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();
  const onSignUp: SubmitHandler<FormData> = async ({
    name,
    email,
    password,
    repeatedPassword,
  }: FormData) => {
    const authResponse = await createUser(
      name,
      email,
      password,
      repeatedPassword
    );

    if (authResponse.hasError) {
      addErrorMessage(authResponse.message || "Oops! Somethings went wrong.");
      return;
    }

    message?.current!.show({
      severity: "success",
      content: "User has been created successfully.",
    });
    setTimeout(() => {
      onClose();
    }, 1000);
  };

  const onClose = () => {
    router.replace("/login");
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
          <div className="text-900 text-3xl font-medium mb-3">Sign Up</div>
        </div>
        <form onSubmit={handleSubmit(onSignUp)} noValidate>
          <Messages ref={message} />
          <div>
            <label htmlFor="name" className="block text-900 font-medium mb-2">
              Name*
            </label>
            <InputText
              id="name"
              type="text"
              placeholder="Full name"
              className={errors.name ? "p-invalid w-full mb-3" : "w-full mb-3"}
              {...register("name", {
                required: "Name is required",
              })}
            />
            {errors.name && (
              <span className="p-error">{errors.name.message}</span>
            )}
            <label htmlFor="email" className="block text-900 font-medium mb-2">
              Email*
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
              Password*
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

            <label
              htmlFor="password"
              className="block text-900 font-medium mb-2 mt-3"
            >
              Confirm Password*
            </label>
            <InputText
              id="repeatedPassword"
              type="password"
              placeholder="Pasword confirmation"
              className={
                errors.repeatedPassword
                  ? "p-invalid w-full mb-3"
                  : "w-full mb-3"
              }
              {...register("repeatedPassword", {
                required: "Confirm Password is required",
                minLength: { value: 6, message: "Min 6 characters" },
              })}
            />
            {errors.repeatedPassword && (
              <span className="p-error">{errors.repeatedPassword.message}</span>
            )}

            <div className="flex justify-content-between flex-wrap">
              <div>
                <Button
                  label="Cancel"
                  type="button"
                  icon="pi pi-times"
                  onClick={onClose}
                  className="p-button-text w-full"
                />
              </div>
              <div>
                <Button
                  className="w-full"
                  label="Create account"
                  icon="pi pi-check"
                  type="submit"
                  autoFocus
                />
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default SigUpPage;
