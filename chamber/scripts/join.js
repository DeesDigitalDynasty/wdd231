// Populate hidden timestamp field when the form loads
const timestampField = document.querySelector("#timestamp");
if (timestampField) {
    timestampField.value = new Date().toLocaleString("en-NG", {
        dateStyle: "medium",
        timeStyle: "short"
    });
}

// Open and close membership benefit modals
const triggers = document.querySelectorAll(".modal-trigger");
const closeButtons = document.querySelectorAll(".close-modal");

triggers.forEach((button) => {
    button.addEventListener("click", () => {
        const modalId = button.getAttribute("data-modal");
        const modal = document.getElementById(modalId);
        if (modal && typeof modal.showModal === "function") {
            modal.showModal();
        }
    });
});

closeButtons.forEach((button) => {
    button.addEventListener("click", () => {
        const modal = button.closest("dialog");
        if (modal) {
            modal.close();
        }
    });
});