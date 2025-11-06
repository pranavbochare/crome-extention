//Listen for messages from popup
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "fillForm") {
    try {
      const data = request.data;
      console.log("received data : ", data);

      // Fill inputs by ID (if present)
      setFieldValue("data_1", data.firstName);
      setFieldValue("data_2", data.lastName);
      setFieldValue("phone", data.mobile);
      setFieldValue("data_3", data.email);

      // Optionally auto-submit the form after filling
      const form = document.querySelector("form");
      if (form) form.submit();

      sendResponse({ success: true, message: "Form filled successfully!" });
    } catch (error) {
      sendResponse({ success: false, message: "Error filling form: " + error.message });
    }
  }
});

// Helper: fill a single field by ID (if exists)
function setFieldValue(id, value) {
  const field = document.getElementById(id);
  if (field) {
    field.value = value;
  }
}
