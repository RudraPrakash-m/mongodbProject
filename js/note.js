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

// Hamburger menu functionality
// Hamburger menu functionality
const hamburger = document.getElementById('hamburger');
const navCenter = document.querySelector('.nav-center');

hamburger.addEventListener('click', (e) => {
  e.stopPropagation();
  const isExpanded = hamburger.getAttribute('aria-expanded') === 'true';
  hamburger.setAttribute('aria-expanded', !isExpanded);
  navCenter.setAttribute('aria-expanded', !isExpanded);
  
  // Add class for styling
  if (!isExpanded) {
    navCenter.classList.add('mobile-menu-visible');
  } else {
    navCenter.classList.remove('mobile-menu-visible');
  }
});

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
  if (window.innerWidth <= 992 && 
      !navCenter.contains(e.target) && 
      e.target !== hamburger &&
      !hamburger.contains(e.target)) {
    hamburger.setAttribute('aria-expanded', 'false');
    navCenter.setAttribute('aria-expanded', 'false');
    navCenter.classList.remove('mobile-menu-visible');
  }
});

// Close mobile menu when clicking on nav links
const navLinks = document.querySelectorAll('.nav-links a, .nav-links button');
navLinks.forEach(link => {
  link.addEventListener('click', () => {
    if (window.innerWidth <= 992) {
      hamburger.setAttribute('aria-expanded', 'false');
      navCenter.setAttribute('aria-expanded', 'false');
      navCenter.classList.remove('mobile-menu-visible');
    }
  });
});

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

//redirect to index page
document.getElementById('logoButton').addEventListener('click', function() {
  window.location.href = '../../index.html';
});

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
              {
                title: "Name Origin",
                content: [
                  "From 'humongous' → 'mongo' + 'db'",
                  "Reflects ability to handle massive data"
                ]
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
        {
          id: "mongodb-storage",
          title: "Data Storage",
          content: {
            description: [
              "How MongoDB organizes and stores data internally."
            ],
            sections: [
              {
                title: "BSON Format",
                content: [
                  "Binary JSON with additional data type support"
                ],
                points: [
                  "0.02% size of equivalent JSON",
                  "Supports Date, Binary, Int32, etc.",
                  "Optimized for speed and storage efficiency"
                ]
              },
              {
                title: "Architecture",
                points: [
                  "Database → Collections → Documents → Fields",
                  "Collections = Tables in SQL",
                  "Documents = Rows in SQL"
                ]
              }
            ]
          }
        },
        {
  id: "development",
  title: "Development",
  content: {
    description: [
      "A brief history of how NoSQL and MongoDB came into development."
    ],
    sections: [
      {
        title: "Development",
        points: [
          "When JavaScript was first recognized as a programming language, developers thought of creating a SQL-like database using JavaScript that can do more than just SQL tasks — hence the name NoSQL, meaning Not Only SQL.",
          "MongoDB was first developed by a company named 10gen in 2007.",
          "In 2009, MongoDB was officially released as open-source software."
        ]
      }
    ]
  }
        }
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
    {
  id: "fundamentals",
  title: "Database Fundamentals",
  icon: "fas fa-database",
  topics: [
    {
      id: "data-concepts",
      title: "Data vs Information",
      content: {
        description: [
          "Understanding the core concepts of data and how it becomes meaningful information."
        ],
        sections: [
          {
            title: "What is Data?",
            content: [
              "Raw facts or details without inherent meaning."
            ],
            points: [
              "Numbers like 50 or words like 'banana'",
              "Dates like 2025-05-23",
              "Temperature values like 98.6 or 40°C",
              "Survey responses like 'Yes', 'No', or 'Maybe'",
              "Like mixed puzzle pieces without context",
              "Alone, data does not answer questions like 'what', 'why', or 'how'"
            ],
            example: {
              title: "Example Data",
              code: [50, 'banana', '2025-05-23', 98.6, 'Yes', 'India']
            }
          },
          {
            title: "What is Information?",
            content: [
              "Organized data that provides meaning and context.",
              "Information answers questions and helps in decision making.",
              "When data is grouped, analyzed, and presented clearly, it becomes information."
            ],
            points: [
              "A doctor's report showing that 98.6°F is a normal temperature",
              "A news article explaining that banana exports rose 50% in India",
              "A weather app telling you it's going to rain tomorrow",
              "Your exam results showing you scored 80 out of 100",
              "Information is purposeful — it tells a story or explains something clearly"
            ],
            example: {
              title: "Example Transformation",
              code: `Data: 50, 'banana', '2025-05-23'
→ Information: Ravi ate 50 bananas on 2025-05-23.

Data: 40°C, 'Yes', 'India'
→ Information: The survey shows that 40°C was recorded in India where 90% people voted 'Yes'.`
            }
          }
        ]
      }
    },
    {
      id: "database-types",
      title: "Database Types",
      content: {
        description: [
          "Comparison between different database paradigms."
        ],
        sections: [
          {
            title: "What is a Database?",
            points: [
              "Simple Definition: A database is like a smart digital notebook that stores lots of data so you can easily find and use it later.",
              "Why it's useful: Helps store big amounts of data in one place and find it quickly when needed."
            ]
          },
          {
            title: "Types of Databases",
            points: [
              "Relational Database: Stores data in rows and columns like an Excel sheet (e.g., MySQL).",
              "NoSQL Database: Stores data in other formats like documents (e.g., MongoDB), which is more flexible."
            ]
          },
          {
            title: "When to Use Each",
            example: {
              title: "Use Case Examples",
              code: `SQL: Banking systems, inventory management
NoSQL: Real-time analytics, content management`
            }
          }
        ]
      }
    },
    {
      id: "sql-nosql",
      title: "SQL vs NoSQL",
      content: {
        description: [
          "Understanding the difference between relational (SQL) and non-relational (NoSQL) databases."
        ],
        sections: [
          {
            title: "What is SQL (Relational)?",
            points: [
              "SQL (Structured Query Language) databases store data in tables (rows and columns).",
              "They are ideal when your data has a clear and consistent structure.",
              "Used for data that has strong relationships (like users and orders).",
              "Examples: MySQL, PostgreSQL, Oracle"
            ]
          },
          {
            title: "When to Use SQL",
            points: [
              "You have structured data like customer records or inventory tables.",
              "You need to perform complex queries or use transactions.",
              "You need to maintain data relationships and consistency."
            ]
          },
          {
            title: "What is NoSQL (Non-Relational)?",
            points: [
              "NoSQL stands for Not Only SQL. These databases store data in flexible formats such as documents, key-value pairs, graphs, or wide-columns.",
              "They are great for rapidly changing or unstructured data.",
              "NoSQL is often used in real-time applications and big data environments.",
              "Examples: MongoDB, Redis, Cassandra"
            ]
          },
          {
            title: "When to Use NoSQL",
            points: [
              "Your data is unstructured or changes frequently.",
              "You want faster development and flexibility without strict schemas.",
              "You need to scale horizontally for big data or high traffic apps."
            ]
          }
        ]
      }
    }
  ]
    },
    {
  id: "important-terms",
  title: "Some Important Terms",
  icon: "fas fa-tags",
  topics: [
    {
      id: "schema",
      title: "Schema",
      content: {
        description: [
          "A schema is the structure or blueprint of a database that defines how data is organized — including tables, fields, and data types.",
          "Used to ensure data is stored in a consistent format and to validate data before saving it to the database."
        ],
        sections: [
          {
            title: "Example (SQL)",
            example: {
              title: "Create Table Example",
              code: `CREATE TABLE Users (
  id INT,
  name VARCHAR(100),
  email VARCHAR(100)
);`
            }
          }
        ]
      }
    },
    {
      id: "structure",
      title: "Structure",
      content: {
        description: [
          "Structure refers to the way data is organized, stored, and related within a database.",
          "A well-defined structure makes data easy to store, retrieve, update, and manage efficiently."
        ],
        sections: [
          {
            title: "Example (SQL Structure)",
            points: [
              "Data is stored in tables (rows and columns).",
              "Tables are related using keys (like id and foreign key)."
            ]
          }
        ]
      }
    },
    {
      id: "relational",
      title: "Relational",
      content: {
        description: [
          "Relational refers to a type of database where data is stored in tables and the tables are connected (related) using keys.",
          "Used to organize structured data with clear relationships, such as users and their orders."
        ],
        sections: [
          {
            title: "Example: Related Tables",
            example: {
              title: "Users and Orders",
              code: `Users Table:
| id | name  |
|--- |-------|
| 1  | Alice |
| 2  | Bob   |

Orders Table:
| order_id | user_id | item   |
|----------|---------|--------|
| 101      | 1       | Book   |
| 102      | 2       | Laptop |`
            }
          }
        ]
      }
    },
    {
      id: "scalability",
      title: "Scalability",
      content: {
        description: [
          "Scalability is the ability of a database to handle more data or traffic by upgrading the system.",
          "Important for apps that grow over time (e.g., social media, e-commerce), so the database can serve more users without slowing down."
        ],
        sections: [
          {
            title: "Types of Scalability",
            points: [
              "Vertical Scalability (Scale Up): Add more power to one server (CPU, RAM). Common in SQL databases.",
              "Horizontal Scalability (Scale Out): Add more servers to share the load. Common in NoSQL databases."
            ]
          }
        ]
      }
    }
  ]
    },
    {
  id: "prerequisites",
  title: "Prerequisites",
  icon: "fas fa-lightbulb",
  topics: [
    {
      id: "basic-javascript",
      title: "Basic JavaScript",
      content: {
        description: [
          "JavaScript is a programming language used to create interactive and dynamic content on websites. It's essential to understand basic JavaScript concepts to work with MongoDB in web apps."
        ],
        sections: [
          {
            title: "Where is JavaScript Used?",
            points: [
              "Making web pages respond to user actions (e.g., clicks, form inputs).",
              "Used in both frontend (browsers) and backend (Node.js) development."
            ],
            example: {
  title: "Simple Button Click",
  code: `&lt;button onclick="sayHello()"&gt;Click Me&lt;/button&gt;
&lt;script&gt;
  function sayHello() {
    alert("Hello, world!");
  }
&lt;/script&gt;`
            }
          }
        ]
      }
    },
    {
      id: "js-syntax",
      title: "Basic Syntax",
      content: {
        description: ["JavaScript syntax includes how you declare variables and write instructions."],
        sections: [
          {
            title: "Variable Declaration",
            points: ["Variables are containers for storing data values."],
            example: {
              title: "Example",
              code: `let name = "Alice";
const age = 25;`
            }
          }
        ]
      }
    },
    {
      id: "js-datatypes",
      title: "JavaScript Data Types",
      content: {
        description: ["Data types define the kind of data a variable can hold."],
        sections: [
          {
            title: "1. Primitive Data Types",
            points: [
              "String: Text wrapped in quotes — \"Hello\"",
              "Number: Numeric values — 42, 3.14",
              "Boolean: true or false",
              "Undefined: A declared variable with no value",
              "Null: Represents no value",
              "Symbol: Unique and immutable values (ES6+)",
              "BigInt: For very large integers"
            ]
          },
          {
            title: "2. Non-Primitive (Reference) Data Types",
            points: [
              "Object: Key-value pairs — { name: \"Alice\" }",
              "Array: List of values — [1, 2, 3]",
              "Function: Reusable block of code — function greet() { ... }"
            ]
          }
        ]
      }
    },
    {
      id: "js-objects",
      title: "JavaScript Objects",
      content: {
        description: ["Objects are used to store collections of data as key-value pairs."],
        sections: [
          {
            title: "Basic Object",
            example: {
              title: "Single Object",
              code: `const person = {
  name: "Alice",
  age: 25,
  isStudent: true
};`
            }
          },
          {
            title: "Array of Objects",
            example: {
              title: "Multiple Objects",
              code: `const users = [
  { name: "Alice", age: 25 },
  { name: "Bob", age: 30 },
  { name: "Charlie", age: 28 }
];`
            }
          },
          {
            title: "Nested Object",
            example: {
              title: "Object inside Object",
              code: `const employee = {
  name: "David",
  address: {
    street: "123 Main St",
    city: "New York"
  }
};`
            }
          },
          {
            title: "Array Inside Object",
            example: {
              title: "Array Property",
              code: `const student = {
  name: "Emma",
  subjects: ["Math", "Science", "English"]
};`
            }
          }
        ]
      }
    },
    {
      id: "json-bson",
      title: "JSON and BSON",
      content: {
        description: ["JSON and BSON are formats for representing data structures."],
        sections: [
          {
            title: "What is JSON?",
            content: [
              "JSON (JavaScript Object Notation) is a lightweight format for storing and transferring data.",
              "It's easy to read and write for both humans and machines."
            ],
            example: {
              title: "Object to JSON",
              code: `const user = {
  name: "Alice",
  age: 25
};

const jsonString = JSON.stringify(user);
console.log(jsonString); // {"name":"Alice","age":25}`
            }
          },
          {
            title: "What is BSON?",
            content: [
              "BSON stands for Binary JSON.",
              "MongoDB uses BSON internally to store documents.",
              "BSON supports additional data types like Date and int.",
              "You don't need to convert manually — MongoDB handles it automatically."
            ]
          }
        ]
      }
    }
  ]
    },
    {
  id: "installation-setup",
  title: "Installation & Setup",
  icon: "fas fa-download",
  topics: [
    {
      id: "installation",
      title: "Installing MongoDB on Windows",
      content: {
        description: [
          "Learn how to download, install, and start using MongoDB on a Windows computer."
        ],
        sections: [
          {
            title: "Step 1: Download MongoDB",
            points: [
              "Go to the official MongoDB download page: https://www.mongodb.com/try/download/community",
              "Choose these options:",
              "- Version: Current or LTS",
              "- Platform: Windows",
              "- Package: MSI",
              "Click the Download button."
            ]
          },
          {
            title: "Step 2: Install MongoDB",
            points: [
              "Run the downloaded .msi installer file.",
              "Select the Complete setup option.",
              "Make sure to check:",
              "- Install MongoDB as a Service (Recommended)",
              "- Optionally: Install MongoDB Compass (a visual tool for MongoDB)"
            ]
          },
          {
            title: "Step 3: Verify Installation",
            points: [
              "After installation, open the Command Prompt (search 'cmd').",
              "Type the following to check if MongoDB is installed correctly:"
            ],
            example: {
              title: "Command to Check Installation",
              code: "mongod --version"
            }
          },
          {
            title: "Using MongoDB Shell (mongosh)",
            points: [
              "Make sure the MongoDB server (mongod) is running.",
              "To start the MongoDB shell, open Command Prompt and type:"
            ],
            example: {
              title: "Command to Start Shell",
              code: "mongosh"
            }
          }
        ]
      }
    }
  ]
    },
    {
  id: "mongodb-operations",
  title: "MongoDB Operations",
  icon: "fas fa-cogs",
  topics: [
    {
      id: "create-operation",
      title: "Create (Insert Data)",
      content: {
        description: ["Insert single or multiple documents into a collection."],
        sections: [
          {
            title: "Create a Database & Collection",
            points: [
              "use myDatabase – Creates and switches to the database.",
              "db.createCollection('users') – Creates a collection called users."
            ]
          },
          {
            title: "Insert Documents",
            points: [
              "insertOne() for one document.",
              "insertMany() for multiple documents.",
              "insert() is deprecated but still works."
            ],
            example: {
              title: "Insert Examples",
              code: `db.users.insertOne({ name: "Hari", age: 22 })

db.users.insertMany([
  { name: "Radha", age: 20 },
  { user: "Gobinda", experience: "2+" }
])`
            }
          },
          {
            title: "Common Mistakes",
            points: [
              "Forgetting to wrap field names/strings in quotes.",
              "Using insert() despite its deprecation – prefer insertOne or insertMany."
            ]
          }
        ]
      }
    },
    {
      id: "read-operation",
      title: "Read (Retrieve Data)",
      content: {
        description: ["Fetch documents using filters and projections."],
        sections: [
          {
            title: "Find Methods",
            points: [
              "find() – Returns all matching documents.",
              "findOne() – Returns only the first match.",
              "show dbs, show collections – Inspect DB and collections."
            ],
            example: {
              title: "Read Examples",
              code: `db.users.find({ age: { $gt: 20 } })

db.users.findOne({ name: "Hari" })`
            }
          },
          {
            title: "Tips",
            points: [
              "Use {} to get all documents.",
              "Use projections to limit fields: db.users.find({}, { name: 1 })"
            ]
          }
        ]
      }
    },
    {
      id: "update-operation",
      title: "Update (Modify Data)",
      content: {
        description: ["Modify existing documents using updateOne or updateMany."],
        sections: [
          {
            title: "Update Methods",
            points: [
              "updateOne() – Modifies one document.",
              "updateMany() – Modifies all matching documents.",
              "Use $set to update specific fields."
            ],
            example: {
              title: "Update Examples",
              code: `db.users.updateOne(
  { name: "Hari" },
  { $set: { age: 23 } }
)

db.users.updateMany(
  { age: { $lt: 18 } },
  { $set: { DL: false } }
)`
            }
          },
          {
            title: "Deprecated Method",
            points: [
              "update() is deprecated – avoid using it."
            ]
          }
        ]
      }
    },
    {
      id: "delete-operation",
      title: "Delete (Remove Data)",
      content: {
        description: ["Remove documents, collections, or entire databases."],
        sections: [
          {
            title: "Delete Methods",
            points: [
              "deleteOne() – Deletes the first matching document.",
              "deleteMany() – Deletes all matching documents.",
              "drop() – Deletes a collection.",
              "dropDatabase() – Deletes the current database."
            ],
            example: {
              title: "Delete Examples",
              code: `db.users.deleteOne({ name: "Ravi" })

db.users.deleteMany({ age: { $lt: 20 } })

db.users.drop() // deletes 'users' collection
db.dropDatabase() // deletes current DB`
            }
          },
          {
            title: "Important Notes",
            points: [
              "Drop operations are irreversible – use with caution!",
              "deleteMany can wipe out large datasets if used incorrectly."
            ]
          }
        ]
      }
    }
  ]
    },
    {
  id: "aggregation",
  title: "Aggregation",
  icon: "fas fa-filter",
  topics: [
    {
      id: "aggregation-basics",
      title: "What is Aggregation?",
      content: {
        description: [
          "Aggregation in MongoDB is a powerful way to process and analyze large volumes of data within a collection.",
          "It allows filtering, grouping, sorting, projecting, and transforming documents to produce customized outputs."
        ],
        sections: [
          {
            title: "Aggregation Overview",
            points: [
              "Aggregation lets you group and analyze data in MongoDB collections.",
              "You can filter, transform, and summarize data using multiple stages.",
              "It's similar to using GROUP BY in SQL with extra flexibility.",
              "Aggregation works on an array of stages, each modifying the result step by step.",
              "Very useful for dashboards, reporting, analytics, and custom logic."
            ],
            example: {
              title: "Syntax",
              code: `db.collection.aggregate([
  { stage1 },
  { stage2 },
  ...
])`
            }
          }
        ]
      }
    },
    {
  id: "aggregation-pipeline",
  title: "Aggregation Pipeline",
  content: {
    description: [
      "The aggregation pipeline is a framework in MongoDB that allows for powerful data processing and transformation through multiple stages."
    ],
    sections: [
      {
        title: "What is a Pipeline?",
        points: [
          "A pipeline is an array of stages that process documents sequentially.",
          "Each stage performs a specific task and passes the result to the next stage.",
          "The aggregation syntax is always inside an array: db.collection.aggregate([ ... ])"
        ],
        example: {
          title: "Pipeline Syntax Example",
          code: `db.students.aggregate([
  { $match: { subject: "Math" } },
  { $group: { _id: "$name", totalScore: { $sum: "$score" } } }
])`
        }
      },
      {
        title: "Sample Data",
        example: {
          title: "Data Input",
          code: `[
  { name: "Alice", subject: "Math", score: 80 },
  { name: "Alice", subject: "Science", score: 90 },
  { name: "Bob", subject: "Math", score: 70 },
  { name: "Bob", subject: "Science", score: 60 },
  { name: "Charlie", subject: "Math", score: 85 },
  { name: "Charlie", subject: "Science", score: 95 }
]`
        }
      }
    ]
  }
    },
    {
  id: "aggregation-benefits",
  title: "Features and Uses",
  content: {
    description: [
      "Aggregation is ideal when you need advanced data processing and analysis directly within MongoDB collections.",
      "It lets you filter, reshape, and summarize data for real-time insights, dashboards, or complex logic."
    ],
    sections: [
      {
        title: "Key Features of Aggregation",
        points: [
          "Perform multi-stage transformations with ease.",
          "Highly composable — stages like $match, $group, $project, $lookup, etc., work together seamlessly.",
          "Supports computed fields and complex calculations.",
          "Efficiently summarizes data (totals, averages, counts).",
          "Can join data from other collections using $lookup.",
          "Optimized for performance and scalability even on large datasets."
        ]
      },
      {
        title: "Common Use Cases",
        points: [
          "Generating reports (e.g., sales by user, monthly orders).",
          "Creating dashboards that need grouped or filtered data.",
          "Real-time analytics for applications (like charts or insights).",
          "Joining documents across collections (e.g., user orders with user details).",
          "Filtering and transforming documents beyond what find() allows.",
          "Re-shaping documents for frontend or API responses."
        ]
      },
      {
        title: "Example Summary Query",
        example: {
          title: "Group by Subject and Sum Scores",
          code: `db.students.aggregate([
  { $group: { _id: "$subject", totalScore: { $sum: "$score" } } }
])`
        }
      }
    ]
  }
    }
  ]
    },
    {
  id: "aggregation-operators",
  title: "Aggregation Operators",
  icon: "fas fa-filter",
  topics: [
    {
      id: "query-operators",
      title: "Query Operators",
      content: {
        description: [
          "Operators used to filter documents in find() queries."
        ],
        sections: [
          {
            title: "$eq (Equal To)",
            points: [
              "Matches values that are equal to a specified value."
            ],
            example: {
              title: "Find users with age 25",
              code: "db.users.find({ age: { $eq: 25 } })"
            }
          },
          {
            title: "$ne (Not Equal To)",
            points: [
              "Matches values that are not equal to a specified value."
            ],
            example: {
              title: "Find users not aged 25",
              code: "db.users.find({ age: { $ne: 25 } })"
            }
          },
          {
            title: "$gt (Greater Than)",
            points: [
              "Matches values that are greater than a specified value."
            ],
            example: {
              title: "Find users older than 25",
              code: "db.users.find({ age: { $gt: 25 } })"
            }
          },
          {
            title: "$gte (Greater Than or Equal To)",
            points: [
              "Matches values greater than or equal to a specified value."
            ],
            example: {
              title: "Find users aged 25 or more",
              code: "db.users.find({ age: { $gte: 25 } })"
            }
          },
          {
            title: "$lt (Less Than)",
            points: [
              "Matches values that are less than a specified value."
            ],
            example: {
              title: "Find users younger than 25",
              code: "db.users.find({ age: { $lt: 25 } })"
            }
          },
          {
            title: "$lte (Less Than or Equal To)",
            points: [
              "Matches values that are less than or equal to a specified value."
            ],
            example: {
              title: "Find users aged 25 or less",
              code: "db.users.find({ age: { $lte: 25 } })"
            }
          },
          {
            title: "$in (Matches Any in Array)",
            points: [
              "Matches any value in the specified array."
            ],
            example: {
              title: "Find users named Alice or Bob",
              code: `db.users.find({ name: { $in: ["Alice", "Bob"] } })`
            }
          },
          {
            title: "$nin (Not in Array)",
            points: [
              "Matches none of the values in the specified array."
            ],
            example: {
              title: "Find users except Alice",
              code: `db.users.find({ name: { $nin: ["Alice"] } })`
            }
          }
        ]
      }
    },
    {
  id: "logical-operators",
  title: "Logical Operators",
  content: {
    description: [
      "Logical operators are used to combine multiple conditions in MongoDB queries."
    ],
    sections: [
      {
        title: "$and (Logical AND)",
        points: [
          "Joins multiple conditions and returns documents that match all conditions."
        ],
        example: {
          title: "Find users aged between 20 and 30",
          code: `db.users.find({
  $and: [
    { age: { $gt: 20 } },
    { age: { $lt: 30 } }
  ]
})`
        }
      },
      {
        title: "$or (Logical OR)",
        points: [
          "Returns documents that match at least one condition."
        ],
        example: {
          title: "Find users named Alice or Bob",
          code: `db.users.find({
  $or: [
    { name: "Alice" },
    { name: "Bob" }
  ]
})`
        }
      },
      {
        title: "$not (Logical NOT)",
        points: [
          "Inverts the effect of a query expression."
        ],
        example: {
          title: "Find users NOT older than 30",
          code: `db.users.find({
  age: { $not: { $gt: 30 } }
})`
        }
      },
      {
        title: "$nor (Logical NOR)",
        points: [
          "Returns documents that do not match any of the conditions."
        ],
        example: {
          title: "Find users who are not 25 years old and not named Alice",
          code: `db.users.find({
  $nor: [
    { age: 25 },
    { name: "Alice" }
  ]
})`
        }
      }
    ]
  }
    },
    {
  id: "update-operators",
  title: "Update Operators",
  content: {
    description: [
      "Operators used to modify documents in update operations like updateOne, updateMany, and findOneAndUpdate."
    ],
    sections: [
      {
        title: "$set (Set Field Value)",
        points: [
          "Updates the value of a field. Creates the field if it doesn’t exist."
        ],
        example: {
          title: "Update user's age to 26",
          code: `db.users.updateOne({ name: "Alice" }, { $set: { age: 26 } })`
        }
      },
      {
        title: "$unset (Remove a Field)",
        points: [
          "Removes the specified field from the document."
        ],
        example: {
          title: "Remove email field",
          code: `db.users.updateOne({ name: "Alice" }, { $unset: { email: "" } })`
        }
      },
      {
        title: "$inc (Increment a Field)",
        points: [
          "Increments the value of a field by the specified amount."
        ],
        example: {
          title: "Increase age by 1",
          code: `db.users.updateOne({ name: "Bob" }, { $inc: { age: 1 } })`
        }
      },
      {
        title: "$mul (Multiply Field)",
        points: [
          "Multiplies the value of the field by the specified number."
        ],
        example: {
          title: "Double the price field",
          code: `db.products.updateOne({ name: "Pen" }, { $mul: { price: 2 } })`
        }
      },
      {
        title: "$rename (Rename Field)",
        points: [
          "Renames a field without changing its data."
        ],
        example: {
          title: "Rename oldName to newName",
          code: `db.users.updateOne({}, { $rename: { oldName: "newName" } })`
        }
      }
    ]
  }
    },
    {
  id: "array-operators",
  title: "Array Operators",
  content: {
    description: [
      "Operators used to modify array fields inside documents in MongoDB."
    ],
    sections: [
      {
        title: "$push (Add to Array)",
        points: [
          "Adds a value to an array field.",
          "If the field does not exist, it creates it."
        ],
        example: {
          title: "Add a tag to tags array",
          code: `db.posts.updateOne({ _id: 1 }, { $push: { tags: "new" } })`
        }
      },
      {
        title: "$addToSet (Add Unique Value)",
        points: [
          "Adds a value to an array only if it doesn’t already exist."
        ],
        example: {
          title: "Add unique tag",
          code: `db.posts.updateOne({ _id: 1 }, { $addToSet: { tags: "unique" } })`
        }
      },
      {
        title: "$pop (Remove First or Last)",
        points: [
          "Removes the first (−1) or last (1) element of an array."
        ],
        example: {
          title: "Remove last tag",
          code: `db.posts.updateOne({ _id: 1 }, { $pop: { tags: 1 } })`
        }
      },
      {
        title: "$pull (Remove Matching Value)",
        points: [
          "Removes all array elements that match a specified condition."
        ],
        example: {
          title: "Remove tag 'old'",
          code: `db.posts.updateOne({ _id: 1 }, { $pull: { tags: "old" } })`
        }
      },
      {
        title: "$each (Add Multiple Values)",
        points: [
          "Used with $push to add multiple elements to an array."
        ],
        example: {
          title: "Add multiple tags",
          code: `db.posts.updateOne({ _id: 1 }, {
  $push: {
    tags: {
      $each: ["a", "b"]
    }
  }
})`
        }
      }
    ]
  }
    },
    {
  id: "element-operators",
  title: "Element Operators",
  content: {
    description: [
      "Operators used to check for the presence of fields or their data types."
    ],
    sections: [
      {
        title: "$exists (Check Field Presence)",
        points: [
          "Checks whether a field exists in a document.",
          "Returns documents where the field is present or absent depending on the value (true/false)."
        ],
        example: {
          title: "Find users with email field",
          code: `db.users.find({ email: { $exists: true } })`
        }
      },
      {
        title: "$type (Check Field Type)",
        points: [
          "Selects documents where the value of the field is of a specific BSON type.",
          "You can use type names like 'string', 'int', 'bool', or numeric codes."
        ],
        example: {
          title: "Find users where age is an integer",
          code: `db.users.find({ age: { $type: "int" } })`
        }
      }
    ]
  }
    },
    {
  id: "evaluation-operators",
  title: "Evaluation Operators",
  content: {
    description: [
      "Evaluation operators perform expression-based comparisons or use expressions within queries to match data."
    ],
    sections: [
      {
        title: "$regex (Pattern Matching)",
        points: [
          "Matches documents using regular expression patterns.",
          "Case-sensitive by default. Use $options: 'i' for case-insensitive matching."
        ],
        example: {
          title: "Find users whose names start with 'A'",
          code: `db.users.find({ name: { $regex: "^A" } })`
        }
      },
      {
        title: "$expr (Compare Fields or Use Expressions)",
        points: [
          "Allows using aggregation expressions in query documents.",
          "Helpful for comparing fields in the same document."
        ],
        example: {
          title: "Find items where price is greater than cost",
          code: `db.items.find({ $expr: { $gt: ["$price", "$cost"] } })`
        }
      },
      {
        title: "$mod (Remainder Match)",
        points: [
          "Selects documents where a field value divided by a divisor has a specific remainder."
        ],
        example: {
          title: "Find users with age divisible by 5",
          code: `db.users.find({ age: { $mod: [5, 0] } })`
        }
      },
      {
        title: "$text (Full-Text Search)",
        points: [
          "Performs text search on fields indexed with a text index.",
          "You must create a text index before using this operator."
        ],
        example: {
          title: "Search for users with the word 'hello'",
          code: `db.users.find({ $text: { $search: "hello" } })`
        }
      }
    ]
  }
    },
    {
  id: "aggregation-stages-overview",
  title: "When to Use Aggregation Stages",
  content: {
    description: [
      "You don’t need to use all aggregation stages every time. Just choose the ones needed for your data transformation or analysis."
    ],
    sections: [
      {
        title: "Commonly Used Stages",
        points: [
          "$match – Filter documents like in find()",
          "$group – Group documents and perform calculations like $sum or $avg",
          "$project – Reshape documents by including, excluding, or renaming fields",
          "$sort – Sort documents by field values",
          "$limit – Limit the number of results",
          "$lookup – Join documents from another collection",
          "$unwind – Flatten arrays inside documents"
        ]
      },
      {
        title: "Optional or Specialized Stages",
        points: [
          "$addFields – Add new fields or modify existing ones",
          "$replaceRoot – Replace the entire document with a nested object",
          "$facet – Run multiple pipelines in parallel and return combined results",
          "$bucket / $bucketAuto – Categorize data into ranges or buckets",
          "$merge / $out – Output the result to another collection",
          "$sample – Return random documents from the collection",
          "$fill / $densify – Handle missing data in time-series use cases"
        ]
      },
      {
        title: "Can You Skip Stages?",
        points: [
          "Absolutely! Only use the stages that are required for your specific use case.",
          "Simple reports may just need $match and $group.",
          "If you’re reshaping or joining data, consider $project, $addFields, and $lookup.",
          "Skipping unnecessary stages improves performance and clarity."
        ]
      }
    ]
  }
    }
  ]
    },
    {
  id: "advanced-aggregation",
  title: "Advanced Aggregation",
  icon: "fas fa-project-diagram",
  topics: [
    {
      id: "lookup-stage",
      title: "$lookup Stage",
      content: {
        description: [
          "Use $lookup to perform a left outer join to combine data from multiple collections — similar to SQL joins in MongoDB."
    ],
    sections: [
      {
        title: "Definition",
        content: [
          "$lookup is a stage in the Aggregation Framework that lets you combine documents from two collections based on a matching field.",
          "It mimics SQL-like joins within MongoDB's NoSQL structure."
        ]
      },
      {
        title: "Why It’s Useful",
        points: [
          "MongoDB is a NoSQL database and doesn’t support traditional joins like SQL.",
          "$lookup gives you relational-like behavior in MongoDB when you need it.",
          "Very useful when working with multiple related collections, like users and orders."
        ]
      },
      {
        title: "Syntax",
        example: {
          title: "Basic Syntax",
          code: `{
  $lookup: {
    from: "<otherCollection>",
    localField: "<localField>",
    foreignField: "<foreignField>",
    as: "<outputField>"
  }
}`
        }
      },
      {
        title: "Example Join",
        content: [
          "Join two collections using a common field to pull in related data."
        ],
        example: {
          title: "Join Students and Classes",
          code: `db.students.aggregate([
  {
    $lookup: {
      from: "classes",
      localField: "classId",
      foreignField: "_id",
      as: "classDetails"
    }
  }
])`
        }
      },
      {
        title: "Output Example",
        example: {
          title: "Joined Document Output",
          code: `{
  "_id": 1,
  "name": "Alice",
  "classId": 101,
  "classDetails": [
    { "_id": 101, "subject": "Math" }
  ]
}`
        }
      },
          {
            title: "Basic Syntax",
            example: {
              title: "$lookup Example",
              code: `db.students.aggregate([
  {
    $lookup: {
      from: "classes",
      localField: "classId",
      foreignField: "_id",
      as: "classDetails"
    }
  }
])`
            }
          },
          {
            title: "Sample Data",
            example: {
              title: "Student & Class",
              code: `// students
{ "_id": 1, "name": "Alice", "classId": 101 }

// classes
{ "_id": 101, "subject": "Math" }`
            }
          },
          {
            title: "Lookup Output",
            example: {
              title: "Joined Result",
              code: `{
  "_id": 1,
  "name": "Alice",
  "classId": 101,
  "classDetails": [{ "_id": 101, "subject": "Math" }]
}`
            }
          }
        ]
      }
    },
    {
      id: "lookup-notes",
      title: "$lookup Tips & Notes",
      content: {
        description: [
          "Important details and best practices when using $lookup."
        ],
        sections: [
          {
            title: "Key Concepts",
            points: [
           "$lookup always performs a left outer join — original documents appear even if no matches are found.",
    "Joined results are returned as an array under the field specified by as.",
    "Use $unwind to flatten the joined array if you want individual documents instead of nested arrays.",
    "You can match fields from nested objects using dot notation (e.g., user.id).",
    "After $lookup, you can chain other stages like $project, $match, $group, or $addFields to transform the joined data further."
            ]
          }
        ]
      }
    }
  ]
    }

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

    category.topics.forEach((topic) => {
      const menuItem = document.createElement("div");
      menuItem.className = "menu-item";
      menuItem.dataset.category = category.id;
      menuItem.dataset.topic = topic.id;
      menuItem.innerHTML = `<span>${topic.title}</span>`;

      menuItem.addEventListener("click", function() {
        document.querySelectorAll(".menu-item").forEach((item) => {
          item.classList.remove("active");
        });
        this.classList.add("active");

        // Reset all scroll containers
        [document.getElementById("topicContent"),
         document.querySelector(".main-content"),
         document.documentElement].forEach(el => {
          if (el) {
            el.scrollTop = 0;
            el.scrollLeft = 0;
          }
        });

        loadContent(category.id, topic.id);

        if (window.innerWidth <= 768) {
          document.getElementById("sidebar").classList.remove("open");
        }
      });

      menuItems.appendChild(menuItem);
    });

    categoryTitle.addEventListener("click", function(e) {
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

  // Reset all scroll containers
  [document.getElementById("topicContent"),
   document.querySelector(".main-content"),
   document.documentElement].forEach(el => {
    if (el) {
      el.scrollTop = 0;
      el.scrollLeft = 0;
    }
  });

  loadContent(firstCategory.id, firstTopic.id);
}

function loadContent(categoryId, topicId) {
  // Reset all possible scroll containers
  const resetScroll = () => {
    const containers = [
      document.getElementById("topicContent"),
      document.querySelector(".main-content"),
      document.querySelector(".content-body"),
      document.documentElement,
      document.body
    ];
    
    containers.forEach(container => {
      if (container) {
        container.scrollTop = 0;
        container.scrollLeft = 0;
      }
    });
  };

  // Reset before loading new content
  resetScroll();
  
  // Force layout calculation to ensure scroll reset takes effect
  document.body.getBoundingClientRect();

  const category = contentData.categories.find((c) => c.id === categoryId);
  if (!category) return;
  const topic = category.topics.find((t) => t.id === topicId);
  if (!topic) return;

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

  const contentDiv = document.getElementById("topicContent");
  contentDiv.innerHTML = html;
  highlightCode();

  // Reset again after content is loaded
  setTimeout(resetScroll, 0);
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
