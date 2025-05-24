// Enhanced Theme Application
function applyTheme() {
  const savedTheme =
    localStorage.getItem("theme") ||
    (window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light");

  document.body.classList.remove("light", "dark");
  document.body.classList.add(savedTheme);
  updateThemeDependentElements(savedTheme);
}

function updateThemeDependentElements(theme) {
  // Update background elements
  const bgElements = document.querySelectorAll(".bg-element");
  bgElements.forEach((el) => {
    el.style.opacity = theme === "dark" ? "0.15" : "0.05"; // More subtle in light mode
  });

  // Update text contrast
  const textElements = document.querySelectorAll(
    ".content-text, .topic-title, .subtopic-title"
  );
  textElements.forEach((el) => {
    el.style.color = "";
  });

  // Force redraw for code blocks
  document.querySelectorAll(".code-block pre").forEach((block) => {
    block.style.display = "none";
    block.offsetHeight;
    block.style.display = "";
  });
}

// Update your theme system initialization
function initThemeSystem() {
  const themeToggle = document.getElementById("input"); // Changed to match your existing toggle ID

  // Set initial state
  const savedTheme =
    localStorage.getItem("theme") ||
    (window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light");
  themeToggle.checked = savedTheme === "light";

  // Apply theme
  applyTheme();

  // Theme toggle event
  themeToggle.addEventListener("change", () => {
    const newTheme = themeToggle.checked ? "light" : "dark";
    document.body.classList.remove("light", "dark");
    document.body.classList.add(newTheme);
    localStorage.setItem("theme", newTheme);
    updateThemeDependentElements(newTheme);
  });

  // Sync across tabs
  window.addEventListener("storage", (event) => {
    if (event.key === "theme") {
      document.body.classList.remove("light", "dark");
      document.body.classList.add(event.newValue);
      themeToggle.checked = event.newValue === "light";
      updateThemeDependentElements(event.newValue);
    }
  });
}

// Call this at the start of your script
initThemeSystem();
// All content data in a structured object
const contentData = {
  categories: [
    {
      id: "intro",
      title: "Introduction",
      icon: "fas fa-info-circle",
      topics: [
        {
          id: "what-is-mongodb",
          title: "What is MongoDB?",
          content: {
            description: [
              "MongoDB is a source-available, cross-platform, document-oriented database program. Classified as a NoSQL database, MongoDB uses JSON-like documents with optional schemas.",
            ],
            sections: [
              {
                title: "Document Database",
                content: [
                  "MongoDB stores data in flexible, JSON-like documents, meaning fields can vary from document to document and data structure can be changed over time. The document model maps to the objects in your application code, making data easy to work with.",
                ],
                example: {
                  title: "Example Document",
                  code: `{
  _id: ObjectId("5099803df3f4948bd2f98391"),
  username: "mongouser",
  email: "user@example.com",
  age: 25,
  interests: ["coding", "databases", "technology"],
  address: {
    street: "123 Main St",
    city: "New York",
    zip: "10001"
  }
}`,
                },
              },
              {
                title: "Key Characteristics",
                content: [
                  "MongoDB differs from traditional relational databases in several important ways:",
                ],
                points: [
                  "Schema-less: Collections don't enforce document structure",
                  "Document-oriented: Data stored as documents (not rows and columns)",
                  "Rich query language: Supports dynamic queries on documents",
                  "Horizontal scalability: Supports sharding for large datasets",
                  "High performance: Embedding and indexing support fast queries",
                ],
              },
            ],
            note: {
              title: "Note",
              content:
                "MongoDB is developed by MongoDB Inc. and licensed under the Server Side Public License (SSPL). It's one of the most popular NoSQL databases and is often used for big data and real-time applications.",
            },
          },
        },
        {
          id: "features",
          title: "Key Features",
          content: {
            description: [
              "MongoDB offers several powerful features that make it a popular choice for modern applications.",
            ],
            sections: [
              {
                title: "Main Features",
                points: [
                  "Document-Oriented Storage: JSON-style documents with dynamic schemas",
                  "Full Index Support: Index any field for faster queries",
                  "Replication & High Availability: Mirror across LANs and WANs",
                  "Auto-Sharding: Horizontal scaling across multiple machines",
                  "Rich Query Language: Support for ad-hoc queries",
                  "Fast In-Place Updates: Atomic modifiers for contention-free performance",
                  "Map/Reduce: Flexible aggregation and data processing",
                  "GridFS: Store files of any size without complicating your stack",
                ],
              },
              {
                title: "Performance Features",
                content: [
                  "MongoDB is designed with performance in mind, offering several features that help applications run faster:",
                ],
                points: [
                  "Embedded data models reduce I/O activity",
                  "Indexes support faster queries",
                  "Sharding allows for horizontal scaling",
                  "Native replication provides high availability",
                ],
              },
            ],
          },
        },
        {
          id: "advantages",
          title: "Advantages",
          content: {
            description: [
              "MongoDB provides several advantages over traditional relational database systems.",
            ],
            sections: [
              {
                title: "Flexibility",
                content: [
                  "MongoDB's document data model is flexible and allows you to store data in a way that is natural for your application.",
                  "Fields can vary from document to document - there's no need to declare the structure of documents to the system.",
                ],
              },
              {
                title: "Scalability",
                content: [
                  "MongoDB scales horizontally using sharding, distributing data across multiple machines.",
                  "This allows for very large datasets and high throughput operations.",
                ],
                example: {
                  title: "Sharding Configuration Example",
                  code: `sh.addShard("rs1/mongodb1.example.net:27017")
sh.addShard("rs2/mongodb2.example.net:27017")
sh.enableSharding("myDatabase")`,
                },
              },
              {
                title: "Performance",
                content: [
                  "MongoDB provides high performance through:",
                  "- Embedded data models that reduce I/O activity",
                  "- Indexes that support faster queries",
                  "- Optional streaming for large result sets",
                ],
              },
            ],
          },
        },
      ],
    },
    {
      id: "basics",
      title: "MongoDB Basics",
      icon: "fas fa-book",
      topics: [
        {
          id: "documents",
          title: "Documents",
          content: {
            description: [
              "In MongoDB, data is stored as documents which are JSON-style data structures composed of field-and-value pairs.",
            ],
            sections: [
              {
                title: "Document Structure",
                content: [
                  "MongoDB documents are similar to JSON objects but use a variant called BSON which supports additional data types.",
                  "Documents are composed of field-and-value pairs with the following structure:",
                  "{ field1: value1, field2: value2, ..., fieldN: valueN }",
                ],
                example: {
                  title: "Document Example",
                  code: `{
  name: "John Doe",
  age: 30,
  status: "A",
  groups: ["news", "sports"],
  address: {
    street: "123 Main St",
    city: "Springfield"
  },
  join_date: new Date("2020-05-15")
}`,
                },
              },
              {
                title: "Field Value Types",
                content: [
                  "MongoDB supports a wide range of data types for field values:",
                ],
                points: [
                  "String, Integer, Boolean, Double",
                  "Arrays, Embedded documents",
                  "ObjectId, Date, Timestamp",
                  "Null, Regular Expression",
                  "Binary Data, Code",
                ],
              },
            ],
          },
        },
        {
          id: "collections",
          title: "Collections",
          content: {
            description: [
              "MongoDB stores documents in collections, which are analogous to tables in relational databases.",
            ],
            sections: [
              {
                title: "Collection Characteristics",
                content: [
                  "Collections are groups of MongoDB documents. A collection is the equivalent of an RDBMS table.",
                  "Collections don't enforce a schema. Documents within a collection can have different fields.",
                ],
                points: [
                  "Documents in a collection can have different fields",
                  "Collections are created automatically when first referenced",
                  "There is no need to explicitly create collections",
                ],
              },
              {
                title: "Capped Collections",
                content: [
                  "MongoDB supports fixed-size collections called capped collections that maintain insertion order.",
                ],
                example: {
                  title: "Creating a Capped Collection",
                  code: `db.createCollection("logs", {
  capped: true,
  size: 100000,
  max: 5000
})`,
                },
              },
            ],
          },
        },
        {
          id: "databases",
          title: "Databases",
          content: {
            description: [
              "In MongoDB, databases hold collections of documents.",
            ],
            sections: [
              {
                title: "Database Basics",
                content: [
                  "A MongoDB server can host multiple databases.",
                  "Each database gets its own set of files on the file system.",
                  "A single MongoDB instance typically has multiple databases.",
                ],
              },
              {
                title: "Working with Databases",
                content: ["Common database operations:"],
                example: {
                  title: "Database Commands",
                  code: `// Switch to a database (creates if doesn't exist)
use myNewDatabase

// Show current database
db

// List all databases
show dbs

// Drop current database
db.dropDatabase()`,
                },
              },
            ],
          },
        },
      ],
    },
    // Additional categories can be added here following the same structure
  ],
};

document.addEventListener("DOMContentLoaded", function () {
  // Initialize the application
  initSidebar();
  loadInitialContent();

  // Sidebar toggle for mobile
  const sidebar = document.getElementById("sidebar");
  const sidebarToggle = document.getElementById("sidebarToggle");

  sidebarToggle.addEventListener("click", function () {
    sidebar.classList.toggle("open");
  });

  // Close sidebar when clicking outside on mobile
  window.addEventListener("click", function (e) {
    if (
      window.innerWidth <= 768 &&
      !sidebar.contains(e.target) &&
      e.target !== sidebarToggle &&
      !sidebarToggle.contains(e.target)
    ) {
      sidebar.classList.remove("open");
    }
  });
});

function initSidebar() {
  const sidebarMenu = document.getElementById("sidebarMenu");

  contentData.categories.forEach((category) => {
    const categoryElement = document.createElement("div");
    categoryElement.className = "menu-category";

    const categoryTitle = document.createElement("div");
    categoryTitle.className = "menu-category-title collapsed";
    categoryTitle.innerHTML = `
        <span>${category.title}</span>
        <i class="fas fa-chevron-down"></i>
      `;

    const menuItems = document.createElement("div");
    menuItems.className = "menu-items collapsed";
    menuItems.style.maxHeight = "0";

    // Add topics to this category
    category.topics.forEach((topic) => {
      const menuItem = document.createElement("div");
      menuItem.className = "menu-item";
      menuItem.dataset.category = category.id;
      menuItem.dataset.topic = topic.id;
      menuItem.innerHTML = `<span>${topic.title}</span>`;

      menuItem.addEventListener("click", function () {
        document.querySelectorAll(".menu-item").forEach((item) => {
          item.classList.remove("active");
        });
        this.classList.add("active");
        loadContent(category.id, topic.id);
        if (window.innerWidth <= 768) {
          document.getElementById("sidebar").classList.remove("open");
        }
      });

      menuItems.appendChild(menuItem);
    });

    categoryTitle.addEventListener("click", function (e) {
      if (e.target !== this && !this.contains(e.target)) return;
      this.classList.toggle("collapsed");
      menuItems.classList.toggle("collapsed");
      menuItems.style.maxHeight = menuItems.classList.contains("collapsed")
        ? "0"
        : menuItems.scrollHeight + "px";
    });

    categoryElement.appendChild(categoryTitle);
    categoryElement.appendChild(menuItems);
    sidebarMenu.appendChild(categoryElement);
  });
}

function loadInitialContent() {
  const firstCategory = contentData.categories[0];
  const firstTopic = firstCategory.topics[0];
  const firstMenuItem = document.querySelector(
    `.menu-item[data-topic="${firstTopic.id}"]`
  );
  if (firstMenuItem) firstMenuItem.classList.add("active");
  loadContent(firstCategory.id, firstTopic.id);
}

function loadContent(categoryId, topicId) {
  const category = contentData.categories.find((c) => c.id === categoryId);
  if (!category) return;
  const topic = category.topics.find((t) => t.id === topicId);
  if (!topic) return;

  const contentDiv = document.getElementById("topicContent");
  let html = `<h1 class="topic-title">${topic.title}</h1>`;

  if (topic.content.description) {
    topic.content.description.forEach((p) => {
      html += `<p class="content-text">${p}</p>`;
    });
  }

  if (topic.content.sections) {
    topic.content.sections.forEach((section) => {
      html += `<h2 class="subtopic-title">${section.title}</h2>`;

      if (section.content) {
        section.content.forEach((p) => {
          html += `<p class="content-text">${p}</p>`;
        });
      }

      if (section.points) {
        html += `<div class="important-points">`;
        section.points.forEach((point) => {
          html += `
              <div class="point-item">
                <div class="point-icon"><i class="fas fa-circle"></i></div>
                <div class="content-text">${point}</div>
              </div>`;
        });
        html += `</div>`;
      }

      if (section.example) {
        html += `
            <div class="example-container">
              <h3 class="example-title">
                <i class="fas fa-code"></i> ${section.example.title}
              </h3>
              <div class="code-block">
                <pre>${formatCode(section.example.code)}</pre>
              </div>
            </div>`;
      }
    });
  }

  if (topic.content.note) {
    html += `
        <div class="note">
          <div class="note-title">
            <i class="fas fa-lightbulb"></i> ${topic.content.note.title}
          </div>
          <p class="content-text">${topic.content.note.content}</p>
        </div>`;
  }

  contentDiv.innerHTML = html;
  highlightCode();
}

function formatCode(code) {
  return code
    .replace(/"([^"]*)"/g, '<span class="string">"$1"</span>')
    .replace(
      /\b(true|false|null|new|ObjectId)\b/g,
      '<span class="keyword">$1</span>'
    )
    .replace(/\b([0-9]+)\b/g, '<span class="number">$1</span>')
    .replace(/\/\/.*$/gm, '<span class="comment">$&</span>');
}

function highlightCode() {
  document.querySelectorAll(".code-block pre").forEach((block) => {
    // Already handled by formatCode
  });
}
