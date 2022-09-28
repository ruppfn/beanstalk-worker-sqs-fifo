const port = process.env.PORT || 3000;
const express = require("express");

const app = express();

const router = express.Router();

router.post("/", (req, res) => {
    const message = "*** PONG ***";
    console.log(message);
    return res.status(200).json({ message });
})

app.use("/ping", router);

app.post("/", (req, res, next) => {
    console.log("\n--- BEGIN REQUEST ---");

    const headers = req.headers;
    const path = headers["x-aws-sqsd-attr-app-path"];

    req.url = path;

    app.handle(req, res, next);

    console.log("--- END REQUEST ---\n");
});

// Listen on port 3000, IP defaults to 127.0.0.1
app.listen(port);

// Put a friendly message on the terminal
console.log('Server running at http://127.0.0.1:' + port + '/');
