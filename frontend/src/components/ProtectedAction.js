// Helper function — check if user is logged in
export const isLoggedIn = () => {
  const user = JSON.parse(localStorage.getItem("user") || "null");
  return user !== null && user.token !== undefined;
};