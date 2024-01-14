// ---Obsługa dodawania notatki---

const addBox = document.querySelector(".add-box");
popupBox = document.querySelector(".popup-box");
popupTitle = document.querySelector("header p");
closeIcon = popupBox.querySelector("header i");
titleTag = popupBox.querySelector("input");
decsTag = popupBox.querySelector("textarea");
addBtn = popupBox.querySelector("button");

function getAuthHeader() {
  const token = localStorage.getItem("jwtToken");
  return token ? { Authorization: "Bearer " + token } : {};
}

// ---Ustawienie powitania---

function getName() {
  var name = localStorage.getItem("name");
  name = `Hello ${name}!`;
  return name;
}

document.querySelector("#hello-user").textContent = getName();

const notes = JSON.parse(localStorage.getItem("notes") || "[]");
let isUpdate = false,
  updateId;

addBox.addEventListener("click", () => {
  titleTag.focus();
  popupBox.classList.add("show");
});

closeIcon.addEventListener("click", () => {
  isUpdate = false;
  titleTag.value = "";
  decsTag.value = "";
  addBtn.innerText = "Add Note";
  popupTitle.innerText = "Add a new Note";
  popupBox.classList.remove("show");
});

// ---Funkcja wyświetlająca notatki uzytkownika---
function showNotes() {
  let userId = localStorage.getItem("userId");
  if (!userId) {
    console.error("User ID not found");
    return;
  }

  fetch(`http://localhost:3000/notes/user/${userId}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok " + response.statusText);
      }
      return response.json();
    })
    .then((data) => {
      const notes = data.info;
      document.querySelectorAll(".note").forEach((note) => note.remove());
      notes.forEach((note) => {
        let liTag = `<li class="note">
                        <div class="details">
                          <p>${note.title}</p>
                          <span>${note.content}</span>
                        </div>
                        <div class="bottom-content">
                          <span>${new Date(
                            note.date
                          ).toLocaleDateString()}</span>
                          <div class="settings">
                            <i onclick="showMenu(this)" class="uil uil-ellipsis-h"></i>
                            <ul class="menu">
                              <li onclick="updateNote('${note._id}', '${
          note.title
        }', '${note.content}')">
                                <i class="uil uil-pen"></i>Edit
                              </li>
                              <li onclick="deleteNote('${note._id}')">
                                <i class="uil uil-trash"></i>Delete
                              </li>
                            </ul>
                          </div>
                        </div>
                      </li>`;
        addBox.insertAdjacentHTML("afterend", liTag);
      });
    })
    .catch((error) => console.log("error", error));
}

document.addEventListener("DOMContentLoaded", function () {
  var token = localStorage.getItem("jwtToken");
  var userId = localStorage.getItem("userId");
  var email = localStorage.getItem("email");

  // Sprawdzenie czy któraś z wartości jest pusta
  if (!token || !userId || !email) {
    window.location.href = "/login";
  } else {
    showNotes();
  }
});

function showMenu(elem) {
  elem.parentElement.classList.add("show");
  document.addEventListener("click", (e) => {
    if (e.target.tagName != "I" || e.target != elem) {
      elem.parentElement.classList.remove("show");
    }
  });
}

// ---Funkcja usunięcia notatki---

function deleteNote(noteId) {
  let confirmDel = confirm("Are you sure you want to delete this note?");
  if (!confirmDel) return;

  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  var requestOptions = {
    method: "DELETE",
    headers: myHeaders,
    redirect: "follow",
  };

  fetch(`http://localhost:3000/notes/${noteId}`, requestOptions)
    .then((response) => response.text())
    .then((result) => {
      console.log(result);
      showNotes();
    })
    .catch((error) => console.log("error", error));
}

// ---EDYCJA NOTATKI---
const editPopupBox = document.querySelector("#editNotePopup");
const editTitleTag = editPopupBox.querySelector("#editTitle");
const editDescTag = editPopupBox.querySelector("#editContent");
const editCloseIcon = editPopupBox.querySelector("#editClose");
const editBtn = editPopupBox.querySelector("#editButton");

function updateNote(noteId, title, desc) {
  editTitleTag.value = title;
  editDescTag.value = desc;
  editBtn.onclick = function (e) {
    e.preventDefault();
    saveEditedNote(noteId);
  };
  editPopupBox.classList.add("show"); // pokaz popup
}

editCloseIcon.addEventListener("click", () => {
  editTitleTag.value = "";
  editDescTag.value = "";
  editPopupBox.classList.remove("show"); // ukryj popup
});

function saveEditedNote(noteId) {
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  var raw = JSON.stringify({
    title: editTitleTag.value,
    content: editDescTag.value,
  });

  var requestOptions = {
    method: "PUT",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };

  fetch(`http://localhost:3000/notes/${noteId}`, requestOptions)
    .then((response) => response.text())
    .then((result) => {
      console.log(result);
      showNotes();
      editCloseIcon.click();
    })
    .catch((error) => console.log("error", error));
}

// ---FUNKCJA DODAJ---
addBtn.addEventListener("click", (e) => {
  e.preventDefault();
  let noteTitle = titleTag.value,
    noteDesc = decsTag.value;
  let userId = localStorage.getItem("userId");

  if (noteTitle && noteDesc) {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      title: noteTitle,
      content: noteDesc,
      userId: userId,
    });

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch("http://localhost:3000/notes", requestOptions)
      .then((response) => response.text())
      .then((result) => {
        console.log(result);
        showNotes();
        closeIcon.click();
      })
      .catch((error) => console.log("error", error));
  } else {
    console.log("Title and content are required.");
  }
});

// ---Wylogowanie---

document.getElementById("logoutButton").addEventListener("click", function () {
  window.location.href = "/views/login.html";
  localStorage.removeItem("jwtToken");
  localStorage.removeItem("userId");
  localStorage.removeItem("email");
});
