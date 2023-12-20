const http = require("http");

const todoList = [
  {
    id: 1,
    name: "React",
    desc: "Learn hooks",
    priority: 1,
  },
  {
    id: 2,
    name: "CSS",
    desc: "Flexbox",
    priority: 2,
  },
  {
    id: 3,
    name: "HTML",
    desc: "Semantic tags",
    priority: 3,
  },
];
const urlRegex = /\/api\/todos\/(.*?)($|\/)/g;
http
  .createServer(function (req, res) {
    if (req.url === "/") {
      res.write("Welcome to my application");
      res.end();
    } else if (req.url === "/api/todos" && req.method === "GET") {
      res.write(JSON.stringify(todoList));
      res.end();
    } else if (urlRegex.test(req.url) && req.method === "GET") {
      const arr = req.url.split("/");
      const id = arr[3];

      const todo = todoList.find((todo) => todo.id === Number(id));

      res.write(JSON.stringify(todo));
      res.end();
    } else if (req.url === "/api/todos" && req.method === "POST") {
      let data = [];
      req.on("data", (chunk) => {
        data.push(chunk);
      });

      req.on("end", () => {
        data = data.toString();
        todoList.push(data);
        res.end(JSON.stringify(data));
      });
    }
  })
  .listen(8080, () => {
    console.log("Server has started on 8080 port");
  });
