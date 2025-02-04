import fs from "fs";
export default function readData(filename) {
  let users = fs.readFileSync(filename, "utf-8");
  return JSON.parse(users);
}
function writeData(filename, data) {
  fs.writeFileSync(filename, JSON.stringify(data), "utf8");
}
export { writeData };
