
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { supabase } from "../api/supabaseClient";

// Schema
const formSchema = z
  .object({
    name: z.string().min(2, "Name too short"),
    email: z.string().email("Invalid email"),
    password: z.string().min(6, "Min 6 chars"),
    confirmPassword: z.string().min(6),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

const Register = () => {
  const {
    register,
    handleSubmit,
    formState: {
      errors,
      isSubmitting,
      isSubmitted,
      isValid,
      isDirty,
    },
    reset,
  } = useForm({
    resolver: zodResolver(formSchema),
    mode: "onChange",
  });

  //API states (separate from RHF)
  const [apiError, setApiError] = React.useState("");
  const [success, setSuccess] = React.useState(false);

  async function onSubmit(data) {
    setApiError("");
    setSuccess(false);

    const { email, password, name } = data;

    const { data: userData, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { name },
      },
    });

    if (error) {
      setApiError(error.message);
      return;
    }

    setSuccess(true);
    reset(); // clear form
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>

      {/* NAME */}
      <input placeholder="Name" {...register("name")} />
      {isSubmitted && errors.name && <p>{errors.name.message}</p>}

      {/* EMAIL */}
      <input placeholder="Email" {...register("email")} />
      {isSubmitted && errors.email && <p>{errors.email.message}</p>}

      {/* PASSWORD */}
      <input type="password" placeholder="Password" {...register("password")} />
      {isSubmitted && errors.password && <p>{errors.password.message}</p>}

      {/* CONFIRM PASSWORD */}
      <input
        type="password"
        placeholder="Confirm Password"
        {...register("confirmPassword")}
      />
      {isSubmitted && errors.confirmPassword && (
        <p>{errors.confirmPassword.message}</p>
      )}

      {/* BUTTON */}
      <button disabled={!isDirty || !isValid || isSubmitting}>
        {isSubmitting ? "Creating..." : "Register"}
      </button>

      {/* API ERROR (REAL ERROR) */}
      {apiError && <p style={{ color: "red" }}>{apiError}</p>}

      {/* SUCCESS (REAL SUCCESS) */}
      {success && (
        <p style={{ color: "green" }}>
          Account created! Check your email (if verification is enabled).
        </p>
      )}
    </form>
  );
};

export default Register;