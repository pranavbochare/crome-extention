const text = document.querySelector("#input");

const btn = document.querySelector("#btn");

const result = document.querySelector("#result");

btn.addEventListener("click", () => {
  result.innerText = text.value;
  text.value = "";
});
