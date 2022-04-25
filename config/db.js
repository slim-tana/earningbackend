const mongoose = require("mongoose");
const URI = process.env.MONGODB_URL;
mongoose
 .connect("mongodb+srv://" + process.env.DB_User_PASS + "@traversycluster.k7w0l.mongodb.net/pi?retryWrites=true&w=majority",
 {
  useNewUrlParser: true,
  useUnifiedTopology: true,

 
  }
)
.then(() => console.log("Connected to MongoDB"))
.catch((err) => console.log("Failed to connect to MongoDB", err));