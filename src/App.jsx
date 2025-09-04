import React, { useState } from "react";
import { generateUnitTest } from "./utils/api";
import "./styles/globals.css";

export default function App() {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [unitTest, setUnitTest] = useState("");

  const handleFileChange = (e) => setFile(e.target.files[0]);

  const handleGenerate = async () => {
    if (!file) return alert("Please select a file first!");
    setLoading(true);
    setUnitTest("");

    try {
      const res = await generateUnitTest(file);
      setUnitTest(res); // store code but don’t display it
      // auto-trigger download
      handleDownload(res);
    } catch (err) {
      console.error(err);
      alert("Error generating unit test");
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = (code) => {
    if (!code || !file) return;
    const blob = new Blob([code], { type: "text/python" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    const filename = file.name.replace(".py", "_test.py");
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="container">
      <div className="card">
        <h1>Unit Test Generator</h1>
        <input type="file" onChange={handleFileChange} />
        <button onClick={handleGenerate} disabled={loading}>
          {loading ? "Generating..." : "Generate & Download Unit Test"}
        </button>
      </div>
    </div>
  );
}
