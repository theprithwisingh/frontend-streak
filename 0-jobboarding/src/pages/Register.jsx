// import { zodResolver } from "@hookform/resolvers/zod";
// import React from "react";
// import { useForm } from "react-hook-form";
// import { z } from "zod";
// import { supabase } from "../api/supabaseClient";

// //schema
// const formSchema = z
//   .object({
//     name: z.string().min(2, "Name too short"),
//     email: z.string().email("Invalid email"),
//     password: z.string().min(6, "Min 6 chars"),
//     confirmPassword: z.string().min(6),
//   })
//   .refine((data) => data.password === data.confirmPassword, {
//     message: "Passwords do not match",
//     path: ["confirmPassword"],
//   });

// const Register = () => {
//   const {
//     register,
//     handleSubmit,
//     formState: {
//       errors,
//       isSubmitting,
//       isSubmitted,
//       isSubmitSuccessful,
//       isValid,
//       isDirty,
//       isLoading,
//     },
//   } = useForm({
//     resolver: zodResolver(formSchema),
//     mode: "onChange",
//   });

//   async function onSubmit(data) {
//     try {
//       const { email, password, name } = data;

//       const { data: userData, error } = await supabase.auth.signUp({
//         email,
//         password,
//         options: {
//           data: {
//             name, // extra user metadata
//           },
//         },
//       });

//       if (error) {
//         throw error;
//       }

//       console.log("User created:", userData);
//     } catch (err) {
//       console.log("Signup error:", err.message);
//     }
//   }

//   return (
//     <form onSubmit={handleSubmit(onSubmit)}>
//       {/* NAME */}
//       <input placeholder="Name" {...register("name")} />
//       {isSubmitted && errors.name && <p>{errors.name.message}</p>}

//       {/* EMAIL */}
//       <input placeholder="Email" {...register("email")} />
//       {isSubmitted && errors.email && <p>{errors.email.message}</p>}

//       {/* PASSWORD */}
//       <input type="password" placeholder="Password" {...register("password")} />
//       {isSubmitted && errors.password && <p>{errors.password.message}</p>}

//       {/* CONFIRM PASSWORD */}
//       <input
//         type="password"
//         placeholder="Confirm Password"
//         {...register("confirmPassword")}
//       />
//       {isSubmitted && errors.confirmPassword && (
//         <p>{errors.confirmPassword.message}</p>
//       )}

//       {/* BUTTON with all 3 features */}
//       <button disabled={!isDirty || !isValid || isSubmitting}>
//         {isSubmitting ? "Submitting..." : "Submit"}
//       </button>

//       {/* LOADING (initial data case) */}
//       {isLoading && <p>Loading form...</p>}

//       {/* SUCCESS */}
//       {isSubmitSuccessful && <p>Success!</p>}

//       {/* FAIL */}
//       {isSubmitted && !isSubmitSuccessful && !isSubmitting && (
//         <p>Something went wrong. Fix errors.</p>
//       )}
//     </form>
//   );
// };
// export default Register;
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { supabase } from "../api/supabaseClient";
import { Link } from "react-router-dom";

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

  // 🔥 API states (separate from RHF)
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
    <div className="min-h-screen flex items-center justify-center bg-white px-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold tracking-tight text-black">Create your account</h1>
          <p className="mt-2 text-sm text-gray-500">Join us and start exploring opportunities</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">

          {/* NAME */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-gray-500 mb-1.5">
              Name
            </label>
            <input
              placeholder="John Doe"
              {...register("name")}
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg text-black placeholder-gray-400 focus:outline-none focus:border-black transition-colors duration-200"
            />
            {isSubmitted && errors.name && (
              <p className="mt-1 text-xs text-red-600">{errors.name.message}</p>
            )}
          </div>

          {/* EMAIL */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-gray-500 mb-1.5">
              Email
            </label>
            <input
              placeholder="you@example.com"
              {...register("email")}
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg text-black placeholder-gray-400 focus:outline-none focus:border-black transition-colors duration-200"
            />
            {isSubmitted && errors.email && (
              <p className="mt-1 text-xs text-red-600">{errors.email.message}</p>
            )}
          </div>

          {/* PASSWORD */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-gray-500 mb-1.5">
              Password
            </label>
            <input
              type="password"
              placeholder="••••••••"
              {...register("password")}
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg text-black placeholder-gray-400 focus:outline-none focus:border-black transition-colors duration-200"
            />
            {isSubmitted && errors.password && (
              <p className="mt-1 text-xs text-red-600">{errors.password.message}</p>
            )}
          </div>

          {/* CONFIRM PASSWORD */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-gray-500 mb-1.5">
              Confirm Password
            </label>
            <input
              type="password"
              placeholder="••••••••"
              {...register("confirmPassword")}
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg text-black placeholder-gray-400 focus:outline-none focus:border-black transition-colors duration-200"
            />
            {isSubmitted && errors.confirmPassword && (
              <p className="mt-1 text-xs text-red-600">{errors.confirmPassword.message}</p>
            )}
          </div>

          {/* BUTTON */}
          <button
            disabled={!isDirty || !isValid || isSubmitting}
            className="w-full py-3.5 bg-black text-white font-semibold rounded-lg hover:bg-gray-800 disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-200 shadow-lg shadow-black/20 cursor-pointer"
          >
            {isSubmitting ? "Creating..." : "Register"}
          </button>

          {/* API ERROR (REAL ERROR) */}
          {apiError && (
            <p className="text-sm text-red-600 text-center bg-red-50 border border-red-200 rounded-lg py-2 px-3">
              {apiError}
            </p>
          )}

          {/* SUCCESS (REAL SUCCESS) */}
          {success && (
            <p className="text-sm text-green-700 text-center bg-green-50 border border-green-200 rounded-lg py-2 px-3">
              Account created! Check your email (if verification is enabled).
            </p>
          )}
        </form>

        <p className="mt-8 text-center text-sm text-gray-500">
          Already have an account?{" "}
          <Link to="/login" className="font-semibold text-black underline underline-offset-2 hover:text-gray-700 transition-colors">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;