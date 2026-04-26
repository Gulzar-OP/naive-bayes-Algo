import express from "express";
import cors from "cors";
import bayes from "naivebayes";

const app = express();
app.use(cors());
app.use(express.json());

// 🧠 create classifier
const classifier = bayes();

// 🎯 Training data
classifier.learn("hot high weak", "NO");
classifier.learn("hot high strong", "NO");
classifier.learn("mild high weak", "YES");
classifier.learn("cool normal weak", "YES");
// (aur data add karo full dataset ke liye)

app.post("/predict", (req, res) => {
  const { temp, humidity, wind } = req.body;

  const input = `${temp} ${humidity} ${wind}`;
  const result = classifier.categorize(input);

  res.json({ result });
});

app.listen(3000, () => console.log("Server running on port 3000"));