import { useState } from "react";

function Form({ onSubmit, loading }) {
  const [formData, setFormData] = useState({
    outlook: "",
    temp: "",
    humidity: "",
    wind: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <SelectField
        label="Outlook"
        name="outlook"
        value={formData.outlook}
        onChange={handleChange}
        options={[
          { value: "", label: "Select Outlook" },
          { value: "sunny", label: "Sunny" },
          { value: "overcast", label: "Overcast" },
          { value: "rainy", label: "Rainy" }
        ]}
      />

      <SelectField
        label="Temperature"
        name="temp"
        value={formData.temp}
        onChange={handleChange}
        options={[
          { value: "", label: "Select Temperature" },
          { value: "hot", label: "Hot" },
          { value: "mild", label: "Mild" },
          { value: "cool", label: "Cool" }
        ]}
      />

      <SelectField
        label="Humidity"
        name="humidity"
        value={formData.humidity}
        onChange={handleChange}
        options={[
          { value: "", label: "Select Humidity" },
          { value: "high", label: "High" },
          { value: "normal", label: "Normal" }
        ]}
      />

      <SelectField
        label="Wind"
        name="wind"
        value={formData.wind}
        onChange={handleChange}
        options={[
          { value: "", label: "Select Wind" },
          { value: "weak", label: "Weak" },
          { value: "strong", label: "Strong" }
        ]}
      />

      <button
        type="submit"
        disabled={loading}
        className="w-full rounded-xl bg-indigo-600 py-3 font-semibold text-white shadow-lg transition duration-200 hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {loading ? "Predicting..." : "Predict"}
      </button>
    </form>
  );
}

function SelectField({ label, name, value, onChange, options }) {
  return (
    <div>
      <label className="mb-2 block text-sm font-medium text-gray-700">
        {label}
      </label>
      <select
        name={name}
        value={value}
        onChange={onChange}
        className="w-full rounded-xl border border-gray-300 bg-gray-50 px-4 py-3 text-gray-700 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}

export default Form;