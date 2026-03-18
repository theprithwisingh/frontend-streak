import React, { useState } from "react";
import { useForm } from "react-hook-form";

import { z } from "zod";
const signupSchema = z
  .object({
    email: z.string().email(),
    password: z.string().min(6),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords must match",
    path: ["confirmPassword"],
  });

const Register = () => {
  const { register, handleSubmit } = useForm();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState();

  async function onSubmit() {}

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          type="text"
          placeholder="name"
          {...register("text", { required: true })}
        />
        <input
          type="email"
          placeholder="email"
          {...register("email", { required: true })}
        />
        <input
          type="password"
          placeholder="password"
          {...register("password", { required: true })}
        />
        <input
          type="password"
          placeholder="confirmPassword"
          {...register("confirmPassword", { required: true })}
        />
        <button type="submit">submit</button>
      </form>
    </>
  );
};
export default Register;
