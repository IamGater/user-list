let users = [];
let editingIndex = -1;

function toggleForm() {
  const form = document.getElementById("userForm");
  form.style.display = form.style.display === "none" ? "block" : "none";
}

document.getElementById("form").addEventListener("submit", function (e) {
  e.preventDefault();

  const user = {
    firstName: document.getElementById("firstName").value,
    lastName: document.getElementById("lastName").value,
    email: document.getElementById("email").value,
    phone: document.getElementById("phone").value,
    birthDate: document.getElementById("birthDate").value,
    avatar: document.getElementById("avatar").files[0]
      ? URL.createObjectURL(document.getElementById("avatar").files[0])
      : null,
  };

  if (editingIndex !== -1) {
    users[editingIndex] = user;
    editingIndex = -1;
  } else {
    users.push(user);
  }

  displayUsers();
  toggleForm();
  document.getElementById("form").reset();
});

function displayUsers() {
  const list = document.getElementById("userList");
  list.innerHTML = users
    .map(
      (user, index) => `
        <li>
            <p><strong>${user.firstName} ${user.lastName}</strong></p>
            <p>Email: ${user.email}</p>
            <p>Телефон: ${user.phone}</p>
            <p>Дата народження: ${user.birthDate}</p>
            ${
              user.avatar
                ? `<img src="${user.avatar}" alt="avatar" style="width: 50px; height: 50px; border-radius: 50%;">`
                : ""
            }
            <button onclick="editUser(${index})">Редагувати</button>
        </li>
    `
    )
    .join("");
}

function editUser(index) {
  const user = users[index];
  document.getElementById("firstName").value = user.firstName;
  document.getElementById("lastName").value = user.lastName;
  document.getElementById("email").value = user.email;
  document.getElementById("phone").value = user.phone;
  document.getElementById("birthDate").value = user.birthDate;
  editingIndex = index;
  toggleForm();
}
