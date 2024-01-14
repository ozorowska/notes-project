document.addEventListener("DOMContentLoaded", function () {
  var form = document.getElementById("registrationForm");
  if (form) {
    form.addEventListener("submit", function (event) {
      event.preventDefault();

      //proba z name
      var name = document.getElementById("name").value;
      var email = document.getElementById("email").value;
      var password = document.getElementById("password").value;
      var confirmPassword = document.getElementById("confirmPassword").value;

      // Sprawdzenie, czy hasła się zgadzają
      if (password !== confirmPassword) {
        alert("Passwords do not match!");
        return;
      }

      var myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");

      var raw = JSON.stringify({
        name: name,
        email: email,
        password: password,
      });

      var requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow",
      };

      // Wysyłam ządanie rejestracji uzytkownika
      fetch("http://localhost:3000/users/register", requestOptions)
        .then((response) => {
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          return response.text();
        })
        .then((result) => {
          console.log(result);
          alert("User has been created");
          window.location.href = "/dashboard";
        })
        .catch((error) => {
          console.log("error", error);
          alert("Failed to create user: " + error.message);
        });
    });
  }
});

document.addEventListener("DOMContentLoaded", function () {
  var form = document.getElementById("loginForm");
  if (form) {
    form.addEventListener("submit", function (event) {
      event.preventDefault();

      var email = document.getElementById("email").value;
      var password = document.getElementById("password").value;

      var myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");

      var raw = JSON.stringify({
        email: email,
        password: password,
      });

      var requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow",
      };

      // Wysłanie ządania logowania uzytkownika

      fetch("http://localhost:3000/users/login", requestOptions)
        .then((response) => {
          if (!response.ok) {
            throw new Error(`Error: ${response.status}`);
          }
          return response.json();
        })
        .then((result) => {
          console.log(result);
          if (result.token) {
            // Zapisanie tokena, ID, adresu e-mail i imienia w localStorage
            localStorage.setItem("jwtToken", result.token);
            localStorage.setItem("userId", result.userId);
            localStorage.setItem("email", result.email);
            localStorage.setItem("name", result.name);
            window.location.href = "/dashboard";
          } else {
            console.error("Login failed: Token not received");
          }
        })
        .catch((error) => {
          console.error("Login error:", error.message);
          alert("Failed to login user: " + error.message);
        });
    });
  }
});
