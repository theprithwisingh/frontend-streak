export default function Button({
  children,
  variant = "primary",
  className = "",
  ...props
}) {
  const base =
    "inline-flex items-center justify-center gap-2 rounded-md font-mono font-bold text-sm transition focus:outline-none focus:ring-2 focus:ring-offset-2";

  const variants = {
    primary:
      "bg-white text-black hover:-translate-y-0.5 shadow hover:shadow-md focus:ring-white",
    secondary:
      "border-2 border-neutral-700 text-neutral-400 hover:border-neutral-400 hover:text-white focus:ring-neutral-400",
    ghost:
      "text-neutral-400 hover:text-white hover:bg-neutral-800 focus:ring-neutral-500",
    danger:
      "border-2 border-red-500 text-red-500 hover:bg-red-500 hover:text-white focus:ring-red-500",
  };

  return (
    <button
      className={`${base} ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
