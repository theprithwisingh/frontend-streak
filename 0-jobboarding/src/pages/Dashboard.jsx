import React, { useEffect, useState } from "react";
import { supabase } from "../api/supabaseClient";
import { useNavigate } from "react-router-dom";

const JOB_TYPE_COLORS = {
  "full-time": "bg-emerald-100 text-emerald-700",
  "part-time": "bg-amber-100 text-amber-700",
  internship: "bg-blue-100 text-blue-700",
  remote: "bg-purple-100 text-purple-700",
};

const Dashboard = () => {
  const navigate = useNavigate();
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedJob, setSelectedJob] = useState(null);
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("jobs")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error fetching jobs:", error);
    } else {
      setJobs(data || []);
    }
    setLoading(false);
  };

  const filteredJobs =
    filter === "all" ? jobs : jobs.filter((job) => job.job_type === filter);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Bar */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold tracking-tight text-black">
            Job Board
          </h1>
          <button
            onClick={() => navigate("/post-job")}
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-black text-white text-sm font-semibold rounded-xl hover:bg-gray-800 transition-all cursor-pointer"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
            </svg>
            Post a Job
          </button>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
        {/* Filter Buttons */}
        <div className="flex flex-wrap gap-2 mb-8">
          {["all", "full-time", "part-time", "internship", "remote"].map(
            (type) => (
              <button
                key={type}
                onClick={() => setFilter(type)}
                className={`px-4 py-2 text-sm font-medium rounded-full border transition-all cursor-pointer ${
                  filter === type
                    ? "bg-black text-white border-black"
                    : "bg-white text-gray-600 border-gray-200 hover:border-gray-400"
                }`}
              >
                {type === "all"
                  ? "All Jobs"
                  : type.charAt(0).toUpperCase() + type.slice(1).replace("-", " ")}
              </button>
            )
          )}
        </div>

        {/* Loading */}
        {loading && (
          <div className="flex items-center justify-center py-20">
            <div className="w-8 h-8 border-2 border-gray-300 border-t-black rounded-full animate-spin" />
          </div>
        )}

        {/* Empty State */}
        {!loading && filteredJobs.length === 0 && (
          <div className="text-center py-20">
            <div className="w-16 h-16 bg-gray-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 13.255A23.193 23.193 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-800 mb-1">No jobs found</h3>
            <p className="text-gray-500 text-sm mb-6">
              {filter === "all"
                ? "Be the first to post a job!"
                : "No jobs match this filter."}
            </p>
            <button
              onClick={() => navigate("/post-job")}
              className="px-6 py-2.5 bg-black text-white text-sm font-semibold rounded-xl hover:bg-gray-800 transition-all cursor-pointer"
            >
              Post a Job
            </button>
          </div>
        )}

        {/* Job Grid */}
        {!loading && filteredJobs.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredJobs.map((job) => (
              <div
                key={job.id}
                onClick={() => setSelectedJob(job)}
                className="bg-white rounded-2xl border border-gray-200 p-5 hover:shadow-lg hover:border-gray-300 transition-all duration-200 cursor-pointer group"
              >
                {/* Type Badge */}
                <div className="flex items-center justify-between mb-3">
                  <span
                    className={`text-xs font-semibold px-3 py-1 rounded-full ${
                      JOB_TYPE_COLORS[job.job_type] || "bg-gray-100 text-gray-600"
                    }`}
                  >
                    {job.job_type
                      ? job.job_type.charAt(0).toUpperCase() +
                        job.job_type.slice(1).replace("-", " ")
                      : "N/A"}
                  </span>
                  {job.salary && (
                    <span className="text-sm font-semibold text-gray-800">
                      ${Number(job.salary).toLocaleString()}
                    </span>
                  )}
                </div>

                {/* Title & Company */}
                <h3 className="text-lg font-bold text-black group-hover:text-gray-700 transition-colors line-clamp-1">
                  {job.job}
                </h3>
                <p className="text-sm text-gray-500 mt-0.5">{job.company_name}</p>

                {/* Location */}
                <div className="flex items-center gap-1.5 mt-3 text-gray-400 text-sm">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  {job.location || "Not specified"}
                </div>

                {/* Skills */}
                {job.skills && job.skills.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 mt-4">
                    {(Array.isArray(job.skills) ? job.skills : [job.skills])
                      .slice(0, 3)
                      .map((skill, i) => (
                        <span
                          key={i}
                          className="text-xs bg-gray-100 text-gray-600 px-2.5 py-1 rounded-lg"
                        >
                          {skill}
                        </span>
                      ))}
                    {Array.isArray(job.skills) && job.skills.length > 3 && (
                      <span className="text-xs text-gray-400 px-1 py-1">
                        +{job.skills.length - 3} more
                      </span>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </main>

      {/* Job Detail Modal */}
      {selectedJob && (
        <div
          className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedJob(null)}
        >
          <div
            className="bg-white rounded-2xl max-w-lg w-full max-h-[85vh] overflow-y-auto shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="sticky top-0 bg-white border-b border-gray-100 px-6 py-4 flex items-center justify-between rounded-t-2xl">
              <h2 className="text-xl font-bold text-black">Job Details</h2>
              <button
                onClick={() => setSelectedJob(null)}
                className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors cursor-pointer"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Modal Body */}
            <div className="px-6 py-5 space-y-5">
              {/* Title & Company */}
              <div>
                <h3 className="text-2xl font-bold text-black">{selectedJob.job}</h3>
                <p className="text-gray-500 mt-1">{selectedJob.company_name}</p>
              </div>

              {/* Quick Info */}
              <div className="flex flex-wrap gap-3">
                <span
                  className={`text-xs font-semibold px-3 py-1.5 rounded-full ${
                    JOB_TYPE_COLORS[selectedJob.job_type] || "bg-gray-100 text-gray-600"
                  }`}
                >
                  {selectedJob.job_type
                    ? selectedJob.job_type.charAt(0).toUpperCase() +
                      selectedJob.job_type.slice(1).replace("-", " ")
                    : "N/A"}
                </span>
                {selectedJob.location && (
                  <span className="text-xs font-medium px-3 py-1.5 rounded-full bg-gray-100 text-gray-600 inline-flex items-center gap-1">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    {selectedJob.location}
                  </span>
                )}
                {selectedJob.salary && (
                  <span className="text-xs font-medium px-3 py-1.5 rounded-full bg-gray-100 text-gray-600">
                    ${Number(selectedJob.salary).toLocaleString()}/yr
                  </span>
                )}
              </div>

              {/* Description */}
              <div>
                <h4 className="text-sm font-semibold text-gray-800 mb-2">Description</h4>
                <p className="text-sm text-gray-600 leading-relaxed whitespace-pre-wrap">
                  {selectedJob.description}
                </p>
              </div>

              {/* Requirements */}
              {selectedJob.requirement && (
                <div>
                  <h4 className="text-sm font-semibold text-gray-800 mb-2">Requirements</h4>
                  <p className="text-sm text-gray-600 leading-relaxed whitespace-pre-wrap">
                    {selectedJob.requirement}
                  </p>
                </div>
              )}

              {/* Skills */}
              {selectedJob.skills && selectedJob.skills.length > 0 && (
                <div>
                  <h4 className="text-sm font-semibold text-gray-800 mb-2">Skills</h4>
                  <div className="flex flex-wrap gap-2">
                    {(Array.isArray(selectedJob.skills)
                      ? selectedJob.skills
                      : [selectedJob.skills]
                    ).map((skill, i) => (
                      <span
                        key={i}
                        className="text-sm bg-gray-100 text-gray-700 px-3 py-1.5 rounded-lg font-medium"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Modal Footer */}
            <div className="px-6 py-4 border-t border-gray-100">
              <button
                onClick={() => setSelectedJob(null)}
                className="w-full py-3 bg-black text-white font-semibold rounded-xl hover:bg-gray-800 transition-all cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;