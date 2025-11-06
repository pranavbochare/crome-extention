// Save button functionality
document.querySelector("#saveBtn").addEventListener("click", () => {
  const userData = {
    firstName: document.querySelector("#firstName").value,
    lastName: document.querySelector("#lastName").value,
    mobile: document.querySelector("#mobile").value,
    email: document.querySelector("#email").value,
  };

  chrome.storage.sync.set(userData, () => {
    showStatus("Information saved successfully!", "success");
  });
});

// Fill & Apply button functionality
document.querySelector("#fillBtn").addEventListener("click", () => {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    chrome.storage.sync.get(["firstName", "lastName", "mobile", "email"], (data) => {
      chrome.tabs.sendMessage(
        tabs[0].id,
        {
          action: "fillForm",
          data: data,
        },
        (response) => {
          if (chrome.runtime.lastError) {
            showStatus("Error: Please refresh the page and try again", "error");
          } else {
            showStatus(response.message, response.success ? "success" : "error");
          }
        }
      );
    });
  });
});

// Show status message
function showStatus(message, type) {
  const statusDiv = document.querySelector("#status");
  statusDiv.textContent = message;
  statusDiv.className = type;
  statusDiv.style.display = "block";

  setTimeout(function () {
    statusDiv.style.display = "none";
  }, 3000);
}
