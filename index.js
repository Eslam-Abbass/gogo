
const express = require("express");
const { dbConnection } = require("./src/database/dbConnection");
const index = express();
var cors = require('cors')
require("dotenv").config({ path: "./config/.env" });
const port = process.env.PORT;
const AppError = require("./src/utils/AppError");
const globalMiddlewareErr = require("./src/utils/globalMiddlewareErr");
//middleware
index.use(express.json());
index.use(express.urlencoded({extended:false}))
index.use(cors({}))
index.use(express.static("uploads"));

index.use("/api/v1/users", require("./src/components/user/user.api"));
index.use("/api/v1/driver", require("./src/components/driver/driver.api"));
index.all("*", (req, res, next) => {
  next(
    new AppError(`can't find this route: ${req.originalUrl} on server`, 404)
  );
});

// global error handling middleware
index.use(globalMiddlewareErr);

dbConnection();
index.listen(port, () => console.log(`Example app listening on port ${port}!`));
