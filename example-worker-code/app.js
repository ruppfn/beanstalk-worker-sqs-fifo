const port = process.env.PORT || 3000;
const express = require("express");

const app = express();

const pingRouter = express.Router();

pingRouter.post("/", (req, res) => {
    console.log("PING ENDPOINT");
    return res.status(200).json({ message: 'ok' });
})

app.use("/ping", pingRouter);

const scheduledRouter = express.Router();

scheduledRouter.post("/", (req, res) => {
    console.log("SCHEDULED ENDPOINT");
    return res.status(200).json({ message: 'ok' });
});

app.use("/scheduled", scheduledRouter);

app.post("/", (req, res, next) => {
    const headers = req.headers;
    const path = headers["x-aws-sqsd-attr-app-path"];

    req.url = path;

    app.handle(req, res, next);
});

// Listen on port 3000, IP defaults to 127.0.0.1
app.listen(port);

// Put a friendly message on the terminal
console.log('Server running at http://127.0.0.1:' + port + '/');
