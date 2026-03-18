import React from "react";
import { useMemo } from "react";
import { useOutletContext } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import useFetch from "../hooks/useFetch";
import ChartWidget from "../components/ChartWidget";

export default function Overview() {
  const { layoutTitle } = useOutletContext();
  const { user } = useAuth();

  const { data } = useFetch("/api/stats");

  const totalUsers = useMemo(() => {
    return data?.users?.length || 0;
  }, [data]);

  const revenue = useMemo(() => {
    return data?.revenue || 0;
  }, [data]);

  return (
    <div>
      <h3>{layoutTitle} - Overview</h3>
      <p>Logged in as: {user.name}</p>

      <div style={{ display: "flex", gap: 20 }}>
        <div>
          <h4>Total Users</h4>
          <p>{totalUsers}</p>
        </div>

        <div>
          <h4>Revenue</h4>
          <p>${revenue}</p>
        </div>
      </div>

      <ChartWidget />
    </div>
  );
}
