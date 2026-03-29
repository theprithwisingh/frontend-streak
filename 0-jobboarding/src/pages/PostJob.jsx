import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { supabase } from "../api/supabaseClient";
import { useNavigate } from "react-router-dom";

const jobSchema = z.object({
  job: z.string().min(3, "Job title required"),
  companyName: z.string().min(2, "Company name required"),
  description: z.string().min(20, "Description too short"),
  skills: z.string().transform((val) =>
    val
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean),
  ),
  requirement: z.string().min(10, "Requirements needed"),
  salary: z.string().optional(),
  location: z.string().min(2, "Location required"),
  jobType: z.enum(["full-time", "part-time", "internship", "remote"]),
});

const PostJob = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(jobSchema),
  });

  const onSubmit = async (data) => {
    try {
      const { error } = await supabase.from("jobs").insert([
        {
          job: data.job,
          company_name: data.companyName,
          description: data.description,
          skills: data.skills,
          requirement: data.requirement,
          salary: data.salary ? Number(data.salary) : null,
          location: data.location,
          job_type: data.jobType,
        },
      ]);

      if (error) {
        console.error(error);
        alert("Failed to save job");
        return;
      }

      alert("Job posted successfully!");
      reset();
      navigate("/dashboard");
    } catch (err) {
      console.error(err);
      alert("Something went wrong");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Back + Header */}
        <div className="mb-8">
          <button
            onClick={() => navigate("/dashboard")}
            className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-black transition-colors mb-4 cursor-pointer"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15 19l-7-7 7-7"
              />
            </svg>
            Back to Dashboard
          </button>
          <h1 className="text-3xl font-bold tracking-tight text-black">
            Post a New Job
          </h1>
          <p className="mt-1 text-gray-500">
            Fill in the details below to list a new position
          </p>
        </div>

        {/* Form Card */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 sm:p-8">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Job Title */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                Job Title
              </label>
              <input
                placeholder="e.g. Senior Frontend Developer"
                {...register("job")}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl text-black placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-black/10 focus:border-black transition-all bg-white"
              />
              {errors.job && (
                <p className="mt-1 text-xs text-red-500">
                  {errors.job.message}
                </p>
              )}
            </div>

            {/* Company Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                Company Name
              </label>
              <input
                placeholder="e.g. Acme Corp"
                {...register("companyName")}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl text-black placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-black/10 focus:border-black transition-all bg-white"
              />
              {errors.companyName && (
                <p className="mt-1 text-xs text-red-500">
                  {errors.companyName.message}
                </p>
              )}
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                Description
              </label>
              <textarea
                placeholder="Describe the role, responsibilities, and what makes it exciting..."
                rows={4}
                {...register("description")}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl text-black placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-black/10 focus:border-black transition-all bg-white resize-none"
              />
              {errors.description && (
                <p className="mt-1 text-xs text-red-500">
                  {errors.description.message}
                </p>
              )}
            </div>

            {/* Skills */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                Skills
              </label>
              <input
                placeholder="React, TypeScript, Node.js"
                {...register("skills")}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl text-black placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-black/10 focus:border-black transition-all bg-white"
              />
              <p className="mt-1 text-xs text-gray-400">Separate with commas</p>
              {errors.skills && (
                <p className="mt-1 text-xs text-red-500">
                  {errors.skills.message}
                </p>
              )}
            </div>

            {/* Requirements */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                Requirements
              </label>
              <textarea
                placeholder="Minimum qualifications, years of experience..."
                rows={3}
                {...register("requirement")}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl text-black placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-black/10 focus:border-black transition-all bg-white resize-none"
              />
              {errors.requirement && (
                <p className="mt-1 text-xs text-red-500">
                  {errors.requirement.message}
                </p>
              )}
            </div>

            {/* Salary & Location */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Salary{" "}
                  <span className="text-gray-400 font-normal">(optional)</span>
                </label>
                <input
                  type="number"
                  placeholder="e.g. 80000"
                  {...register("salary")}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl text-black placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-black/10 focus:border-black transition-all bg-white"
                />
                {errors.salary && (
                  <p className="mt-1 text-xs text-red-500">
                    {errors.salary.message}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Location
                </label>
                <input
                  placeholder="e.g. New York, NY"
                  {...register("location")}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl text-black placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-black/10 focus:border-black transition-all bg-white"
                />
                {errors.location && (
                  <p className="mt-1 text-xs text-red-500">
                    {errors.location.message}
                  </p>
                )}
              </div>
            </div>

            {/* Job Type */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                Job Type
              </label>
              <select
                {...register("jobType")}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl text-black focus:outline-none focus:ring-2 focus:ring-black/10 focus:border-black transition-all bg-white cursor-pointer"
              >
                <option value="">Select job type</option>
                <option value="full-time">Full Time</option>
                <option value="part-time">Part Time</option>
                <option value="internship">Internship</option>
                <option value="remote">Remote</option>
              </select>
              {errors.jobType && (
                <p className="mt-1 text-xs text-red-500">
                  {errors.jobType.message}
                </p>
              )}
            </div>

            {/* Divider */}
            <div className="h-px bg-gray-100" />
            {/* Submit */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3.5 bg-black text-white font-semibold rounded-xl hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 cursor-pointer"
            >
              {isSubmitting ? "Posting..." : "Post Job"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PostJob;
