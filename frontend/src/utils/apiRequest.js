const BASE_URL = "http://localhost:8000/api";

export const apiRequest = async (
  endpoint,
  { method = "GET", body = null } = {}
) => {
  const token = localStorage.getItem("token");
  if (!token) {
    window.location.href = "/login";
  }
  const config = {
    method,
    headers: {
      "Content-Type": "application/json",
      ...(token && { Authorization: `Bearer ${token}` }),
    },
  };

  if (body) {
    config.body = JSON.stringify(body);
  }

  const response = await fetch(`${BASE_URL}${endpoint}`, config);

  // Optional: handle auth errors globally
  if (response.status === 401) {
    localStorage.removeItem("token");
    window.location.href = "/login";
  }

  const data = await response.json();
  if (!response.ok) {
    const error = data?.message || data?.error || "API Error";
    throw new Error(error);
  }

  return data;
};
