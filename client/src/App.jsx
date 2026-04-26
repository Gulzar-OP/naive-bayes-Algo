import { useState } from "react";
import axios from "axios";
import Form from "./components/Form";

function App() {
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handlePredict = async (formData) => {
    try {
      if (!formData.outlook || !formData.temp || !formData.humidity || !formData.wind) {
        setError("Fill all fields!");
        return;
      }

      setLoading(true);
      setError("");

      const res = await axios.post("https://naive-bayes-algo.onrender.com/predict", formData);
      setResult(res.data.result);
    } catch (err) {
      console.error(err);
      setError("Prediction failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-100 via-indigo-100 to-purple-100 px-4 py-10 flex items-center justify-center">
      <div className="w-full max-w-xl rounded-3xl bg-white/90 backdrop-blur-md shadow-2xl border border-white p-8 md:p-10">
        <div className="text-center mb-8">
          <p className="text-sm font-medium text-indigo-600 uppercase tracking-widest">
            Machine Learning App
          </p>
          <h2 className="mt-2 text-3xl md:text-4xl font-bold text-gray-800">
            Naive Bayes Predictor
          </h2>
          <p className="mt-3 text-sm text-gray-500">
            Fill the form and get prediction instantly
          </p>
        </div>

        <Form onSubmit={handlePredict} loading={loading} />

        {error && (
          <div className="mt-5 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
            {error}
          </div>
        )}

        {result && (
          <div className="mt-6 rounded-2xl border border-emerald-200 bg-emerald-50 px-5 py-4 text-center shadow-sm">
            <p className="text-sm text-emerald-700">Prediction Result</p>
            <h3 className="mt-1 text-2xl font-bold text-emerald-700">{result}</h3>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;