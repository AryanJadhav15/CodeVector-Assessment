import { apiClient } from "./client";

export const getMembers = async ({ page, limit, category }) => {
  const response = await apiClient.get("/members", {
    params: {
      page,
      limit,
      ...(category ? { category } : {}),
    },
  });

  return response.data;
};
