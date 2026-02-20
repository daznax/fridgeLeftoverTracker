import express from "express";
import bodyParser from "body-parser";

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
  if (req.body["delItem"]) {
    let delItem = findObjToDelete(req.body["delItem"]);
    list.splice(delItem, 1);
  } else {
    var name = req.body["itemName"];
    var descrip = req.body["descrip"];
    var expDate = req.body["expDate"];
    var newId = nextId();
    list.push(new foodItem(newId, name, descrip, expDate));
  }
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

function findObjToDelete(searchId) {
  for (let i = 0; i < list.length; i++) {
    if (list[i].id == searchId) return i;
  }
  return -1;
}

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
