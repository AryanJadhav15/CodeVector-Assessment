const statusStyles = {
  Active: "border-emerald-200 bg-emerald-50 text-emerald-700",
  Expired: "border-neutral-200 bg-neutral-100 text-neutral-600",
};

function StatusBadge({ status }) {
  return (
    <span
      className={`inline-flex items-center rounded-full border px-2.5 py-1 text-xs font-medium ${
        statusStyles[status] || statusStyles.Expired
      }`}
    >
      {status}
    </span>
  );
}

export default StatusBadge;
