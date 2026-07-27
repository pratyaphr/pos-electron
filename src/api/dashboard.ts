export async function getDashboard() {
  const result = await window.api.dashboard.get();

  if (!result.success) {
    throw new Error(result.message);
  }

  return result.data;
}
