const readLine = require("readline");
const fs = require("fs");
const V = 1000;

const extractTestFromFile = (filename) => {
  const map = new Map();
  const lineReader = readLine.createInterface({
    input: fs.createReadStream(filename),
  });

  return new Promise((resolve, reject) => {
    lineReader.on("line", (line) => {
      const [u, v] = line.split(" ");
      if (Number(u) >= V) {
        resolve(map);
      } else if (Number(u) <= V) {
        map.set(Number(u), (map.get(Number(u)) || []).concat(Number(v)));
      }
    });

    lineReader.on("error", (error) => reject(error));
  });
};

if (fs.existsSync("sample.txt")){
  fs.unlinkSync("sample.txt");
}

extractTestFromFile("facebook_combined.txt")
  .then((data) => {
    const entries = Array.from(data.entries())
      .map(([key, value]) => [key, value.sort((a, b) => b - a)])
      .map(([key, value]) => [
        key,
        value.map((item) => Math.floor(item / Math.ceil(value[0] / V))),
      ])
      .map(([key, value]) => [key, Array.from(new Set(value)).reverse()]);

    const fileWriter = fs.createWriteStream("sample.txt", { flags: "a" });
    entries.forEach(([u, values]) => {
      values.forEach((v) => {
        fileWriter.write(`${u} ${v}\n`);
      });
    });

    // fileWriter.destroy();
  })
  .catch((error) => console.log(error));
