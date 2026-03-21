// - Job Title
// - Company Name
// - Description (textarea)
// - Skills / Requirements
// - Salary (optional)
// - Location
// - Job Type (full-time / remote)

import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { supabase } from "../api/supabaseClient";


// Zod Schema
const jobSchema = z.object({
  job: z.string().min(3, "Job title required"),

  companyName: z.string().min(2, "Company name required"),

  description: z.string().min(20, "Description too short"),

  skills: z
    .string()
    .transform((val) =>
      val
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean)
    ),

  requirement: z.string().min(10, "Requirements needed"),

  salary: z.number().optional(),

  location: z.string().min(2, "Location required"),

  jobType: z.enum(["full-time", "part-time", "internship", "remote"]),
});

const Dashboard = () => {
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
          salary: data.salary,
          location: data.location,
          job_type: data.jobType,
        },
      ]);

      if (error) {
        console.error(error);
        alert("Failed to save job");
        return;
      }

      alert("Job posted successfully");
      reset();
    } catch (err) {
      console.error(err);
      alert("Something went wrong");
    }
  };

  return (
    <div style={{ maxWidth: "500px", margin: "auto" }}>
      <h2>Create Job</h2>

      <form onSubmit={handleSubmit(onSubmit)}>
        {/* Job */}
        <input placeholder="Job Title" {...register("job")} />
        {errors.job && <p>{errors.job.message}</p>}

        {/* Company */}
        <input placeholder="Company Name" {...register("companyName")} />
        {errors.companyName && <p>{errors.companyName.message}</p>}

        {/* Description */}
        <textarea placeholder="Description" {...register("description")} />
        {errors.description && <p>{errors.description.message}</p>}

        {/* Skills */}
        <input
          placeholder="Skills (comma separated)"
          {...register("skills")}
        />
        {errors.skills && <p>{errors.skills.message}</p>}

        {/* Requirement */}
        <textarea
          placeholder="Requirements"
          {...register("requirement")}
        />
        {errors.requirement && <p>{errors.requirement.message}</p>}

        {/* Salary */}
        <input
          type="number"
          placeholder="Salary"
          {...register("salary", { valueAsNumber: true })}
        />
        {errors.salary && <p>{errors.salary.message}</p>}

        {/* Location */}
        <input placeholder="Location" {...register("location")} />
        {errors.location && <p>{errors.location.message}</p>}

        {/* Job Type */}
        <select {...register("jobType")}>
          <option value="">Select Job Type</option>
          <option value="full-time">Full Time</option>
          <option value="part-time">Part Time</option>
          <option value="internship">Internship</option>
          <option value="remote">Remote</option>
        </select>
        {errors.jobType && <p>{errors.jobType.message}</p>}

        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Posting..." : "Post Job"}
        </button>
      </form>
    </div>
  );
};

export default Dashboard;