const url = "data/members.json";
const memberContainer = document.querySelector("#member-container");
const gridButton = document.querySelector("#grid");
const listButton = document.querySelector("#list");

// Async function to fetch member data
const getMembers = async () => {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        displayMembers(data.members);
    } catch (error) {
        console.error("Error fetching member data:", error);
    }
};

// Function to render members
const displayMembers = (members) => {
    memberContainer.innerHTML = ""; // Clear content

    members.forEach((member) => {
        let card = document.createElement("section");
        card.classList.add("member-card");

        const isFirst = index === 0;
        
        card.innerHTML = `
            <img src="${member.image}" alt="${member.representative}" width="300" height="180" class="member-img">
            <h3>${member.name}</h3>
            <p class="rep-info"><strong>Representative:</strong> ${member.representative} (${member.role})</p>
            <p><strong>Address:</strong> ${member.address}</p>
            <p><strong>Phone:</strong> ${member.phone}</p>
            <p><strong>Email:</strong> ${member.email}</p>
            <p class="membership"><strong>Level:</strong> ${member.membershipLevel}</p>
            <a href="${member.website}" target="_blank" rel="noopener noreferrer">Visit Website</a>
        `;

        memberContainer.appendChild(card);
    });
};

// Event Listeners Grid / List Toggles
gridButton.addEventListener("click", () => {
    memberContainer.classList.add("grid");
    memberContainer.classList.remove("list");
    gridButton.classList.add("active");
    listButton.classList.remove("active");
});

listButton.addEventListener("click", () => {
    memberContainer.classList.add("list");
    memberContainer.classList.remove("grid");
    listButton.classList.add("active");
    gridButton.classList.remove("active");
});

// Initialize fetch
getMembers();