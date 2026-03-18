import {
  useState,
  useMemo,
  useCallback,
  useRef,
  useLayoutEffect,
  useImperativeHandle,
  forwardRef,
  useId
} from "react";
import { useParams, useOutletContext } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import useDebounce from "../hooks/useDebounce";
import useLocalStorage from "../hooks/useLocalStorage";
import usePrevious from "../hooks/usePrevious";
import DataGrid from "../components/DataGrid";

const ChartWidget = forwardRef((props, ref) => {
  const canvasRef = useRef();

  useImperativeHandle(ref, () => ({
    reset() {
      console.log("Chart reset");
    }
  }));

  useLayoutEffect(() => {
    // measure before paint
    console.log("Measured:", canvasRef.current?.offsetWidth);
  }, []);

  return <canvas ref={canvasRef} height="100" />;
});

export default function Users() {
  const { id } = useParams();
  const { layoutTitle } = useOutletContext();

  const [search, setSearch] = useState("");
  const debounced = useDebounce(search, 500);
  const [columns] = useLocalStorage("columns", ["id", "name"]);
  const prevSearch = usePrevious(search);

  const { data } = useFetch(`/api/users?q=${debounced}`);

  const filtered = useMemo(() => {
    return data?.filter(u => u.name.includes(debounced)) || [];
  }, [data, debounced]);

  const chartRef = useRef();

  const handleReset = useCallback(() => {
    chartRef.current.reset();
  }, []);

  const inputId = useId();

  return (
    <div>
      <h3>{layoutTitle} - User {id}</h3>

      <label htmlFor={inputId}>Search</label>
      <input
        id={inputId}
        value={search}
        onChange={e => setSearch(e.target.value)}
      />

      <button onClick={handleReset}>Reset Chart</button>

      <ChartWidget ref={chartRef} />

      <DataGrid columns={columns} data={filtered} />

      <div>Previous Search: {prevSearch}</div>
    </div>
  );
}
