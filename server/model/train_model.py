import pandas as pd
from sklearn.preprocessing import LabelEncoder
from sklearn.naive_bayes import CategoricalNB
import joblib

# load data
df = pd.read_csv("./data/play_tennis.csv")

# encoders
le_outlook = LabelEncoder()
le_temp = LabelEncoder()
le_humidity = LabelEncoder()
le_wind = LabelEncoder()
le_play = LabelEncoder()

df['outlook'] = le_outlook.fit_transform(df['outlook'])
df['temp'] = le_temp.fit_transform(df['temp'])
df['humidity'] = le_humidity.fit_transform(df['humidity'])
df['wind'] = le_wind.fit_transform(df['wind'])
df['play'] = le_play.fit_transform(df['play'])

X = df[['outlook','temp','humidity','wind']]
y = df['play']

model = CategoricalNB()
model.fit(X, y)

# save model + encoders
joblib.dump(model, "model.pkl")
joblib.dump(le_outlook, "le_outlook.pkl")
joblib.dump(le_temp, "le_temp.pkl")
joblib.dump(le_humidity, "le_humidity.pkl")
joblib.dump(le_wind, "le_wind.pkl")
joblib.dump(le_play, "le_play.pkl")

print("Model trained & saved ✅")