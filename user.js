import readData, { writeData } from "./readFile.js";
import fs from "fs";
let getUsersAll = (req, res) => {
  let userData = readData("./users.json");
  res.writeHead(200, { "Content-Type": "application/json" });
  res.write(JSON.stringify(userData));
  res.end();
};
let getUserById = (req, res, id) => {
  let userData = readData("./users.json");
  res.writeHead(200, { "Content-Type": "application/json" });
  res.write(
    JSON.stringify(
      userData[+id - 1]
        ? userData[+id - 1]
        : { message: "Bu iddida malumot yo'q" }
    )
  );
  res.end();
};

let addUser = (req, res) => {
  console.log("POST reaquest keldi");
  let body = "";

  req.on("data", (chunk) => {
    body += chunk;
  });

  req.on("end", () => {
    try {
      // Attempt to parse the JSON data
      const jsonData = JSON.parse(body);

      let users = readData("users.json");
      let lastUserId = users[users.length - 1].id;
      console.log(lastUserId, jsonData);

      if (!jsonData.username || !jsonData.name) {
        throw new Error("Siz ma'lumotingiz to'liq emas!!");
      }
      let user = {
        id: lastUserId + 1,
        name: jsonData.name,
        username: jsonData.username,
        // ...jsonData,
      };
      users.push(user);
      writeData("./users.json", users);
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ message: "Data received and processed", user })); // Send a JSON response
    } catch (error) {
      // Handle JSON parsing errors
      console.error("Error parsing JSON:", error);
      res.writeHead(400, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ error: "Invalid JSON" + error.message }));
    }
  });
};

export { getUserById, getUsersAll, addUser };
