import http from "http";

import { getUserById, getUsersAll } from "./user.js";
import readData from "./readFile.js";

let server = http.createServer(function (req, res) {
  console.log(req.method, req.url);
  if (req.method == "GET" && req.url.startsWith("/users")) {
    let routeData = req.url.split("/");
    let id = routeData[2];
    if (id && Number.isInteger(parseInt(id))) {
      getUserById(req, res, id);
    } else getUsersAll(req, res);
  } else if (req.method == "GET" && req.url == "/products") {
    let userData = readData("./products.json");
    res.writeHead(200, { "Content-Type": "application/json" });
    let arr = req.url.split("/");
    let idProduct = arr[2];
    if (idProduct && Number.isInteger(parseInt(idProduct))) {
      getUserById(req, res, idProduct);
    } else getUsersAll(req, res);
  } else {
    res.writeHead(200, { "Content-Type": "application/json" });
    res.write(JSON.stringify({ data: "Salom bu http serveri" }));
    res.end();
  }
});
server.listen(8000, () => {
  console.log("server runnin on 8000");
});
