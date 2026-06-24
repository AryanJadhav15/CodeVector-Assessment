export const formatDate = (dateValue) => {
  if (!dateValue) {
    return "N/A";
  }

  const date = new Date(dateValue);

  if (Number.isNaN(date.getTime())) {
    return "N/A";
  }

  return new Intl.DateTimeFormat("en", {
    year: "numeric",
    month: "short",
    day: "numeric",
  }).format(date);
};

export const getMemberEndDate = (joinDate, duration) => {
  const date = new Date(joinDate);

  if (Number.isNaN(date.getTime())) {
    return null;
  }

  date.setMonth(date.getMonth() + Number(duration || 0));
  return date;
};

export const getMemberStatus = (endDate) => {
  if (!endDate || Number.isNaN(new Date(endDate).getTime())) {
    return "Expired";
  }

  return new Date(endDate) >= new Date() ? "Active" : "Expired";
};
