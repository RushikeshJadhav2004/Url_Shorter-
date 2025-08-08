const express = require('express');
const mongoose = require('mongoose');
const { shortenUrl, redirectToOriginal } = require('./controllers/url.js'); // ✅ destructure correctly

mongoose.connect("mongodb+srv://rj507943:RkduspLJsmp5MPik@cluster0.hdtpphn.mongodb.net/", {
  dbName: "NodeJs_Mastery_Course"
})
  .then(() => console.log("Connected to MongoDB"))
  .catch(() => console.log("Error connecting to MongoDB"));

const app = express();

app.use(express.urlencoded({ extended: true }));

// Routes
app.get('/', (req, res) => {
  res.render("index.ejs", { shortUrl: null });
});

app.post('/shorten', shortenUrl); // ✅ correct function
app.get('/:shortCode', redirectToOriginal); // ✅ correct function

const port = 1000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
