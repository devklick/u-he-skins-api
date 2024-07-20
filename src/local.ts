import fs from "node:fs";
import path from "node:path";
import express from "express";
import cors from "cors";

/*
  This is a local entry point only used for local development. 
  The intention here is to have a way of running the API without worrying 
  about Vercel (which is where the app is hosted in production).

  The approach taken here is to create an Express application, load the Vercel 
  function handlers from the /api folder, and route the Express request to the 
  relevant Vercel function handler.

  It's a bit hacky, but it does the job for now.
*/

const PORT = 3000;

const app = express();

app.use(
  cors({
    origin: "https://devklick.github.io",
  })
);

// The path to the /api folder where the handler files can be found
const baseApiHandlerPath = path.join(__dirname, "../api");

// Find the handler files, and when a request to the express API comes in,
// redirect it to the relevant handler
for (const file of fs.readdirSync(path.join(__dirname, "../api"))) {
  const filePath = path.join(baseApiHandlerPath, file);
  const module = require(filePath);

  app.use(`/api/${path.parse(file).name}`, async (req, res) => {
    // Convert the express headers to node headers
    const nodeHeaders = Object.entries(req.headers).flatMap(([name, value]) => {
      const headers: Array<[string, string]> = [];
      if (Array.isArray(value)) {
        value.forEach((v) => headers.push([name, v]));
      } else {
        headers.push([name, value ?? ""]);
      }
      return headers;
    });

    // The node request needs an absolute url, which express does not provide,
    // so we need to construct it from the various parts express gives us
    const fullUrl = `${req.protocol}://${req.hostname}${req.baseUrl}`;
    const nodeRequest = new Request(fullUrl, {
      body: req.body,
      headers: nodeHeaders,
      method: req.method,
    });

    // The handler functions in the module will be named after the http method
    // it handles requests for. Get the handler for this request.
    const handler = module[req.method.toUpperCase()];

    if (!handler) {
      res.status(404).send();
    }

    // Execute the handler, passing in the node request
    const nodeResponse: Response = await handler(nodeRequest);

    // send the express response using the node response we got back from the handler
    res.status(nodeResponse.status).send(await nodeResponse.json());
  });
}

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
