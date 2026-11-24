const params = new URLSearchParams(window.location.search);
const summaryList = document.querySelector("#application-summary");

const requiredFields = [
    { key: "fname", label: "First Name" },
    { key: "lname", label: "Last Name" },
    { key: "email", label: "Email Address" },
    { key: "phone", label: "Mobile Phone Number" },
    { key: "orgname", label: "Business / Organization Name" },
    { key: "timestamp", label: "Submitted Date & Time" }
];

if (summaryList) {
    requiredFields.forEach(({ key, label }) => {
        const dt = document.createElement("dt");
        dt.textContent = label;

        const dd = document.createElement("dd");
        dd.textContent = params.get(key) || "Not provided";

        summaryList.appendChild(dt);
        summaryList.appendChild(dd);
    });
}