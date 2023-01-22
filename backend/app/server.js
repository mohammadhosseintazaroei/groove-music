const { AllRoutes } = require('./router/router');
const cors = require("cors");

module.exports = class Application {
    #express = require('express')
    #app = this.#express()
    constructor(PORT, DB_URL) {
        this.configDatabase(DB_URL);
        this.configApplication();
        this.createRoutes();
        this.createServer(PORT);
        this.errorHandler();
    }
    configApplication() {
        const path = require('path');
        this.#app.use(this.#express.urlencoded({ extended: true }));
        this.#app.use(this.#express.static(path.join(__dirname, "..", "public")))
        this.#app.use(this.#express.json());
        // app.use(express.urlencoded({ extended: true }));
        // // app.use(cors());
        this.#app.use(cors({
          origin: 'http://localhost:3000',
          methods: ['POST', 'PUT', 'GET', 'OPTIONS', 'HEAD'],
          credentials: true
        }));
    }
    createServer(PORT) {
        const http = require('http');
        const server = http.createServer(this.#app);
        server.listen(PORT, () => {
            console.log(`server run on http://localhost:${PORT}`);
        })
    }
    configDatabase(DB_URL) {
        const mongoose = require('mongoose')
        mongoose.connect(DB_URL, (error) => {
            if (error) throw error
            return console.log("connect to DB successful...");
        })
    }
    errorHandler() {
        this.#app.use((req, res, next) => {
            return res.status(404).json({
                status: 404,
                success: false,
                message: "صفحه یا ادرس مورد نظر یافت نشد"
            });
        })
        this.#app.use((error, req, res, next) => {
            const status = error?.status || 500;
            const message = error?.message || "InternalServerError";
            return res.status(status).json({
                status,
                success: false,
                message
            })
        })
    }
    createRoutes() {
        this.#app.get('/', (req, res, next) => {
            return res.json({
                message: "this is a new Express application"
            })
        })
        this.#app.use(AllRoutes)
    }
}