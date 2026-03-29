

// /*
// learning key:
// | Loading | Error   | Jobs Data | Final UI Output                         |
// | ------- | ------- | --------- | --------------------------------------- |
// | true    | null    | []        | Loader / Spinner                        |
// | false   | null    | [data]    | Jobs list render                        |
// | false   | null    | []        | “No jobs found”                         |
// | false   | "error" | []        | Error message + Retry button            |
// | true    | "error" | ❌         | ❌ Broken logic (never allow this state) |

// start → loading = true, error = null
// success → loading = false, error = null
// fail → loading = false, error = "message"
// */



import React, {
  useState,
  useEffect,
  useMemo,
  useCallback,
  useRef,
} from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../api/supabaseClient";
import Filters from "../components/Filters";
import JobList from "../components/JobList";
import { useInfiniteScroll } from "../hooks/useInfiniteScroll";
import Searching from "../components/Searching";

const PAGE_SIZE = 5;

const Dashboard = () => {
  const navigate = useNavigate();

  const [jobs, setJobs] = useState([]);
  const [selected, setSelected] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);

  const isFetchingRef = useRef(false);

  // 🔥 load more (now supports search + filter)
  const loadMore = useCallback(async () => {
    if (isFetchingRef.current || !hasMore) return;

    isFetchingRef.current = true;
    setLoading(true);
    setError(null);

    try {
      const from = page * PAGE_SIZE;
      const to = from + PAGE_SIZE - 1;

      let query = supabase
        .from("jobs")
        .select("*")
        .order("created_at", { ascending: false })
        .range(from, to);

      // ✅ search
      if (searchTerm) {
        query = query.ilike("job", `%${searchTerm}%`);
      }

      // filter
      if (selected !== "All") {
        query = query.eq("job_type", selected);
      }

      const { data, error } = await query;

      if (error) throw new Error(error.message);

      if (!data || data.length === 0) {
        setHasMore(false);
        return;
      }

      // append (NOT replace)
      setJobs((prev) => [...prev, ...data]);
      setPage((prev) => prev + 1);
    } catch (err) {
      console.error(err.message);
      setError(err.message);
    } finally {
      setLoading(false);
      isFetchingRef.current = false;
    }
  }, [page, hasMore, searchTerm, selected]); // 🔥 fixed deps

  // initial load
  useEffect(() => {
    loadMore();
  }, []);

  // 🔥 reset when search/filter changes
  useEffect(() => {
    setJobs([]);
    setPage(0);
    setHasMore(true);
  }, [searchTerm, selected]);

  // infinite scroll hook
  const sentinelRef = useInfiniteScroll({
    loadMore,
    hasMore,
    loading,
  });

  // types (based on loaded jobs)
  const type_of_job = useMemo(() => {
    return ["All", ...new Set(jobs.map((j) => j.job_type))];
  }, [jobs]);

  const handleSelect = useCallback((type) => {
    setSelected(type);
  }, []);

  const handleSearch = useCallback((term) => {
    setSearchTerm(term);
  }, []);

  // ⚠️ still client-side filter (only on loaded data)
  const filteredJobs = useMemo(() => {
    if (selected === "All") return jobs;
    return jobs.filter((j) => j.job_type === selected);
  }, [jobs, selected]);

  return (
    <div className="min-h-screen bg-white px-4 py-8">
      <div className="mx-auto w-full max-w-6xl space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-black">
              Job Board
            </h1>
            <p className="mt-2 text-sm text-gray-500">
              Search, filter, and post jobs in real time.
            </p>
          </div>
          <button
            className="inline-flex items-center justify-center rounded-lg bg-black px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-black/20 hover:bg-gray-800 transition-colors"
            onClick={() => navigate("/post-job")}
          >
            Post a Job
          </button>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <Filters
            types={type_of_job}
            selected={selected}
            onSelect={handleSelect}
          />
          <Searching onSearch={handleSearch} />
        </div>

        <div className="rounded-2xl border border-gray-200 bg-white p-4 shadow-sm">
          <JobList jobs={filteredJobs} />
        </div>

        <div ref={sentinelRef} className="h-6" />

        <div className="space-y-2 text-center text-sm text-gray-600">
          {loading && <p>Loading jobs...</p>}
          {!hasMore && <p>No more jobs to load</p>}
          {error && <p className="text-red-500">Error: {error}</p>}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;