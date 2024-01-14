document.addEventListener("DOMContentLoaded", function () {
  const loginButton = new LoginButton("loginButton");

  // Pobieranie losowego cytatu motywacyjnego z nowego API
  fetch("https://type.fit/api/quotes")
    .then((response) => response.json())
    .then((data) => {
      const randomQuote = data[Math.floor(Math.random() * data.length)];

      const quoteText = `"${randomQuote.text}"\n\n- ${randomQuote.author}`;

      const quoteElement = document.getElementById("quote");

      // Wywołanie funkcji typeWriter z cytatem
      typeWriter(quoteText, quoteElement);
    })
    .catch((error) => console.error("Error fetching quote:", error));

  // Funkcja dodająca efekt typeingu do tekstu
  function typeWriter(text, element, delay = 100) {
    let i = 0;
    let characters = text.split(""); // Rozbij tekst na pojedyncze litery
    let line = "";

    function type() {
      if (i < characters.length) {
        line += characters[i++];
        element.innerHTML = line + "<br>";
        setTimeout(type, delay);
      }
    }

    type();
  }
});

class LoginButton {
  constructor(buttonId) {
    this.button = document.getElementById(buttonId);
    this.addEventListeners();
  }

  addEventListeners() {
    this.button.addEventListener("mouseenter", () => this.onMouseEnter());
    this.button.addEventListener("click", () => this.onClick());
  }

  onMouseEnter() {
    this.button.style.transform = "scale(1.1)";
  }
  onClick() {
    // Przekierowanie do formularza logowania po kliknięciu
    window.location.href = "/login";
  }
}
