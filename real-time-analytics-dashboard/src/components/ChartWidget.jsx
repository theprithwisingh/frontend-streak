import React from "react";
import {
  forwardRef,
  useRef,
  useLayoutEffect,
  useImperativeHandle,
  memo
} from "react";

const ChartWidget = forwardRef((props, ref) => {
  const canvasRef = useRef(null);

  useImperativeHandle(ref, () => ({
    reset() {
      const ctx = canvasRef.current.getContext("2d");
      ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
      drawChart(ctx);
    }
  }));

  useLayoutEffect(() => {
    const ctx = canvasRef.current.getContext("2d");
    drawChart(ctx);
  }, []);

  const drawChart = (ctx) => {
    ctx.fillStyle = "#4caf50";
    ctx.fillRect(10, 10, 100, 50);
  };

  return (
    <div style={{ marginTop: 20 }}>
      <canvas
        ref={canvasRef}
        width="300"
        height="150"
        style={{ border: "1px solid #ccc" }}
      />
    </div>
  );
});

export default memo(ChartWidget);
