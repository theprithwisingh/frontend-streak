import React from "react";

const JobList = React.memo(({ jobs }) => {
  console.log("JobList render");

  return (
    <div className="space-y-4">
      {jobs.map((j) => (
        <div
          key={j.id}
          className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm transition hover:shadow-lg"
        >
          <div className="flex flex-wrap items-center justify-between gap-2">
            <span className="rounded-full bg-black px-3 py-1 text-xs font-semibold uppercase tracking-wide text-white">
              {j.job_type}
            </span>
            <span className="text-xs text-gray-500">{j.location}</span>
          </div>

          <h3 className="mt-3 text-xl font-bold text-gray-900">{j.job}</h3>
          <p className="text-sm text-gray-600">{j.company_name}</p>

          {j.salary ? (
            <p className="mt-2 text-sm font-medium text-green-600">${j.salary}</p>
          ) : (
            <p className="mt-2 text-sm text-gray-400">Salary not specified</p>
          )}
        </div>
      ))}
    </div>
  );
});

export default JobList;