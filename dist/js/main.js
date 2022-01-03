const create = async () => {
  const url = "/.netlify/functions/create";
  const createDB = await fetch(url, {
    body: JSON.stringify({ name: "Todo-list", desc: "Patrick's mother" }),
    method: "POST",
    "Content-Type": "application/json",
  });
  const res = await createDB.json();
  const data = res.body;

  console.log(data);
};

const readAll = async () => {
  const url = "/.netlify/functions/read";
  const readNotes = await fetch(url);
  const res = await readNotes.json();
  const data = res.body;

  console.log(data);
};

const update = async () => {
  const url = "/.netlify/functions/update";
  const readNotes = await fetch(url, {
    body: JSON.stringify({ name: "negative", desc: "Jesus's mother" }),
    method: "PATCH",
    "Content-Type": "application/json",
  });
  const res = await readNotes.json();
  const data = res.body;

  console.log(data);
};

const deleteOne = async () => {
  const url = "/.netlify/functions/delete";
  const readNotes = await fetch(url);
  const res = await readNotes.json();
  const data = res.body;

  console.log(data);
};


// // create();
// // readAll();
// update();
// // deleteOne();


document.querySelector("#create").addEventListener("click", create);
document.querySelector("#read").addEventListener("click", readAll);
document.querySelector("#update").addEventListener("click", update);
document.querySelector("#delete").addEventListener("click", deleteOne);
