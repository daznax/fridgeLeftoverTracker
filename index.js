import express from "express";
import bodyParser from "body-parser";
// import morgan from "morgan";

const app = express();
const port = 3000;
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
const list = [];
let id = 0;

app.get("/", (req, res) => {
  res.render("index.ejs");
});

app.post("/submit", (req, res) => {
  var name = req.body["itemName"];
  var descrip = req.body["descrip"];
  var expDate = req.body["expDate"];
  var newId = nextId();
  list.push(new foodItem(newId, name, descrip, expDate));
  console.log(list);
  res.render("index.ejs", { itemList: list });
});

class foodItem {
  constructor(id, name, description, date) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.date = new Date(date);
  }
}

// returns the next available numeric ID (simple)
function nextId() {
  return (id += 1);
}

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
