require("dotenv").config();
const connectDB = require("./db");
const app = require("./app");

const port = process.env.PORT || 8000;

connectDB()
  .then(() => {
    app.on("error", (error) => {
      console.log("ERROR : ", error);
      process.exit(1);
    });
    app.listen(port, () => {
      console.log(`Server is running at PORT : ${port}`);
    });
  })
  .catch((error) => console.log("APP failed !!!", error));
