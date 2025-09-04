const BACKEND_URL = "https://unit-test-generator-backend.onrender.com";

export async function generateUnitTest(file) {
  const formData = new FormData();
  formData.append("file", file);

  const response = await fetch(`${BACKEND_URL}/generate_tests`, {
    method: "POST",
    body: formData,
  });

  if (!response.ok) throw new Error("Failed to generate unit test");

  const data = await response.json();
  return data.unit_test || "No unit test generated";
}
