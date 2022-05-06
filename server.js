const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv");
const fileUpload = require("express-fileupload");

const app = express();
dotenv.config();

const PORT = process.env.port || 8070;

app.use(cors());
app.use(bodyParser.json());
app.use(express.json());
app.use(
  fileUpload({
    createParentPath: true,
  })
);

// MongoDB Connection

const URL = process.env.MONGODB_URL;

mongoose.connect(URL, {
  //  useCreateIndex: true,
  //  useNewUrlParser: true,
  useUnifiedTopology: true,
  //  useFindAndModify: false,
});

const connection = mongoose.connection;
connection.once("open", () => {
  console.log("Mongo DB connection success!");
});

//Setting Routes

const studentsRouter = require("./routes/students.js");
const groupsRouter = require("./routes/groups.js");
const topicSubmissionsRouter = require("./routes/topicsRegs");
const markingSchemeRouter = require("./routes/markingSchemes");
const roleRouter = require("./routes/roles");
const submissionTypeRouter = require("./routes/submissionTypes");
const templateRouter = require("./routes/templates");
const uploadRouter = require("./routes/uploads");
const adminRouter = require("./routes/admin");

app.use("/students", studentsRouter);
app.use("/groups", groupsRouter);
app.use("/topicsubs", topicSubmissionsRouter);
app.use("/markingschemes", markingSchemeRouter);
app.use("/roles", roleRouter);
app.use("/submissiontypes", submissionTypeRouter);
app.use("/templates", templateRouter);
app.use("/uploads", uploadRouter);
app.use("/admins", adminRouter);

app.listen(PORT, () => {
  console.log(`Server is up and running on port number ${PORT}`);
});
