// Sample event data
const events = [
  {
      id: 1,
      name: "Rock Concert",
      date: "2025-03-20",
      location: "Lagos Arena",
      category: "Music",
      description: "A thrilling night of rock music with top bands.",
      image: "images/rock-concert.jpg"
  },
  {
      id: 2,
      name: "Tech Meetup",
      date: "2025-04-05",
      location: "Tech Hub Lagos",
      category: "Technology",
      description: "Meet industry experts and network with tech enthusiasts.",
      image: "images/tech-meetup.webp"
  },
  {
      id: 3,
      name: "Football Match",
      date: "2025-04-10",
      location: "National Stadium",
      category: "Sports",
      description: "Watch your favorite teams compete in an intense match!",
      image: "images/football-match.jpeg"
  },
  {
      id: 4,
      name: "Jazz Night",
      date: "2025-03-25",
      location: "City Jazz Club",
      category: "Music",
      description: "Relax and enjoy live jazz performances by top artists.",
      image: "images/jazz-night.webp"
  }
];

// Function to apply filters from index.html and redirect to events.html
function applyFilters() {
  const searchInput = document.getElementById("searchBar").value.toLowerCase();
  const selectedDate = document.getElementById("eventDate").value;
  const selectedCategory = document.getElementById("eventCategory").value;

  // Redirect to events.html with query parameters
  const queryParams = new URLSearchParams();
  if (searchInput) queryParams.append("search", searchInput);
  if (selectedDate) queryParams.append("date", selectedDate);
  if (selectedCategory) queryParams.append("category", selectedCategory);

  window.location.href = `events.html?${queryParams.toString()}`;
}

// Function to load and filter events based on URL parameters
function loadFilteredEvents() {
  const urlParams = new URLSearchParams(window.location.search);
  const searchInput = urlParams.get("search") ? urlParams.get("search").toLowerCase() : "";
  const selectedDate = urlParams.get("date") || "";
  const selectedCategory = urlParams.get("category") || "";

  const filteredEvents = events.filter(event => {
      const matchesSearch = event.name.toLowerCase().includes(searchInput) || event.description.toLowerCase().includes(searchInput);
      const matchesDate = selectedDate ? event.date === selectedDate : true;
      const matchesCategory = selectedCategory ? event.category === selectedCategory : true;
      
      return matchesSearch && matchesDate && matchesCategory;
  });

  displayEvents(filteredEvents);
}

// Function to display events dynamically on events.html
function displayEvents(eventList) {
  const container = document.getElementById("eventsContainer");
  if (!container) return; // Prevents errors if the container is not found

  container.innerHTML = ""; // Clear previous content

  if (eventList.length === 0) {
      container.innerHTML = "<p class='text-center text-muted'>No events found.</p>";
      return;
  }

  eventList.forEach(event => {
      const eventCard = document.createElement("div");
      eventCard.classList.add("col-md-4", "mb-4");

      eventCard.innerHTML = `
          <div class="card shadow-sm">
              <img src="${event.image}" class="card-img-top" alt="${event.name}">
              <div class="card-body">
                  <h5 class="card-title">${event.name}</h5>
                  <p class="card-text"><strong>Date:</strong> ${event.date}</p>
                  <p class="card-text"><strong>Location:</strong> ${event.location}</p>
                  <p class="card-text">${event.description}</p>
                  <a href="event-details.html?id=${event.id}" class="btn btn-primary">View Details</a>
              </div>
          </div>
      `;
      
      container.appendChild(eventCard);
  });
}

// Function to handle filtering in events.html
function filterEventsOnPage() {
  const searchInput = document.getElementById("searchBar").value.toLowerCase();
  const selectedDate = document.getElementById("eventDate").value;
  const selectedCategory = document.getElementById("eventCategory").value;

  const filteredEvents = events.filter(event => {
      const matchesSearch = event.name.toLowerCase().includes(searchInput) || event.description.toLowerCase().includes(searchInput);
      const matchesDate = selectedDate ? event.date === selectedDate : true;
      const matchesCategory = selectedCategory ? event.category === selectedCategory : true;
      
      return matchesSearch && matchesDate && matchesCategory;
  });

  displayEvents(filteredEvents);
}

// Function to display event details on event-details.html
function displayEventDetails() {
  const urlParams = new URLSearchParams(window.location.search);
  const eventId = urlParams.get("id");

  if (!eventId) {
      document.getElementById("eventDetails").innerHTML = "<p class='text-center text-muted'>Event not found.</p>";
      return;
  }

  const event = events.find(e => e.id == eventId);

  if (!event) {
      document.getElementById("eventDetails").innerHTML = "<p class='text-center text-muted'>Event not found.</p>";
      return;
  }

  document.getElementById("eventDetails").innerHTML = `
      <div class="card">
          <img src="${event.image}" class="card-img-top" alt="${event.name}">
          <div class="card-body">
              <h2 class="card-title">${event.name}</h2>
              <p><strong>Date:</strong> ${event.date}</p>
              <p><strong>Location:</strong> ${event.location}</p>
              <p><strong>Category:</strong> ${event.category}</p>
              <p>${event.description}</p>
              <a href="events.html" class="btn btn-secondary">Back to Events</a>
          </div>
      </div>
  `;
}

// Load events on page load
document.addEventListener("DOMContentLoaded", () => {
  if (document.getElementById("eventsContainer")) {
      loadFilteredEvents(); // Load events when visiting events.html
  }
  if (document.getElementById("eventDetails")) {
      displayEventDetails(); // Load event details when visiting event-details.html
  }
});
