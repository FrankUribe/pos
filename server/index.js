const cors = require("cors");
const express = require("express");
const bodyParser = require('body-parser')

const PORT = process.env.PORT || 3500

const app = express();

app.use(cors());
app.use(bodyParser.json({ limit: '5mb' }));
app.use(bodyParser.urlencoded({ limit: '5mb', extended: true }));
app.use(express.json());

//Routes
app.use(require("./routes/users"));

// Route
app.get('/', (req, res) => {
  res.send('POS API!');
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));