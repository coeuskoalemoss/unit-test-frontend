export async function generateUnitTest(file) {
  const formData = new FormData();
  formData.append("file", file); // must match FastAPI parameter name

  const response = await fetch("https://unit-test-generator-backend.onrender.com", {
    method: "POST",
    body: formData,
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  const data = await response.json();
  return data.unit_test; // your backend should return JSON with key "unit_test"
}
