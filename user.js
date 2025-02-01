import readData from "./readFile.js";
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

export { getUserById, getUsersAll };
