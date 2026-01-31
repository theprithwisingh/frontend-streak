export default function Select({
  value,
  onChange,
  children,
  className = "",
  ...props
}) {
  return (
    <select
      value={value}
      onChange={onChange}
      className={`w-full bg-neutral-800 border-2 border-neutral-700 rounded-md px-3 py-2 text-sm focus:outline-none focus:border-white transition ${className}`}
      {...props}
    >
      {children}
    </select>
  );
}
