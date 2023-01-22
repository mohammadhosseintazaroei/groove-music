const Application = require("./app/server");
const DB_URL = "mongodb://localhost:27017/grooveMusic";
require('dotenv').config()
new Application(4000, DB_URL);


