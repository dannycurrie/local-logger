const { appendFile } = require("fs");
const http = require("http");

const port = 8080;

const getLogToFile = () => {
  const fileName = `logfile${Date.now()}.txt`;
  return (data) =>
    appendFile(fileName, `${data}\r\n`, (err) => {
      if (err) console.error(`couldn't log data: ${data}`);
    });
};

// set logger here
// uses simple log to file function by default
const log = getLogToFile();

const app = http.createServer((req, res) => {
  const methods = ["OPTIONS", "POST"];

  const resHeaders = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": methods.join(","),
    "Access-Control-Max-Age": 2592000, // 30 days
  };

  if (req.method === "OPTIONS") {
    res.writeHead(204, resHeaders);
    res.end();
    return;
  }

  if (req.method === "POST") {
    // get log message
    let message = [];
    req.on("data", (chunk) => {
      message.push(chunk);
    });

    // log message
    req.on("end", () => {
      log(Buffer.concat(message).toString());
    });
    res.writeHead(200, resHeaders);
    res.end("Done");
    return;
  }
});

app.listen(port);
console.log(`Sever running on port ${port}`);
