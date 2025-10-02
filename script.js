const userContainer = document.getElementById("user-container");
const errorMsg = document.getElementById("errorMsg");
const reloadBtn = document.getElementById("reloadBtn");
const loader = document.getElementById("loader");

// Some dummy Indian names, emails, and cities
const indianNames = [
  { name: "Ravi Kumar", email: "ravi.kumar@example.in", city: "Delhi", street: "Rajpath" },
  { name: "Priya Sharma", email: "priya.sharma@example.in", city: "Mumbai", street: "Marine Drive" },
  { name: "Amit Verma", email: "amit.verma@example.in", city: "Bengaluru", street: "MG Road" },
  { name: "Neha Singh", email: "neha.singh@example.in", city: "Lucknow", street: "Hazratganj" },
  { name: "Arjun Mehta", email: "arjun.mehta@example.in", city: "Ahmedabad", street: "CG Road" },
  { name: "Sunita Reddy", email: "sunita.reddy@example.in", city: "Hyderabad", street: "Banjara Hills" },
  { name: "Vikram Das", email: "vikram.das@example.in", city: "Kolkata", street: "Park Street" },
  { name: "Anjali Nair", email: "anjali.nair@example.in", city: "Kochi", street: "MG Road" },
  { name: "Rohit Patil", email: "rohit.patil@example.in", city: "Pune", street: "FC Road" },
  { name: "Kiran Joshi", email: "kiran.joshi@example.in", city: "Jaipur", street: "MI Road" }
];

async function fetchUsers() {
  userContainer.innerHTML = ""; // clear old data
  errorMsg.textContent = "";   // clear old error
  loader.style.display = "block"; // show spinner

  try {
    const response = await fetch("https://jsonplaceholder.typicode.com/users");

    if (!response.ok) {
      throw new Error(`HTTP Error: ${response.status}`);
    }

    let users = await response.json();

    // Replace API data with Indian names
    users = users.map((user, index) => {
      const indianUser = indianNames[index % indianNames.length];
      return {
        name: indianUser.name,
        email: indianUser.email,
        address: {
          street: indianUser.street,
          city: indianUser.city
        }
      };
    });

    if (users.length === 0) {
      userContainer.innerHTML = "<p style='text-align:center;'>No users found.</p>";
      return;
    }

    users.forEach(user => {
      const card = document.createElement("div");
      card.classList.add("user-card");
      card.innerHTML = `
        <h3>${user.name}</h3>
        <p><b>Email:</b> ${user.email}</p>
        <p><b>Address:</b> ${user.address.street}, ${user.address.city}</p>
      `;
      userContainer.appendChild(card);
    });

  } catch (error) {
    errorMsg.textContent = "⚠️ Failed to fetch data. Please check your connection.";
    console.error(error);
  } finally {
    loader.style.display = "none"; // hide spinner
  }
}

// Fetch users on page load
fetchUsers();

// Reload button functionality
reloadBtn.addEventListener("click", fetchUsers);
