# PHP Task Manager - Learning Project 🎓

A simple task management web application I built to learn **PHP, jQuery, and MariaDB**. This is my first full-stack project where I'm exploring how these technologies work together.

> **Note**: This is a learning project focused on understanding the basics of web development.

## Technologies I'm Learning

| What I Used | Why I Used It |
|-------------|---------------|
| **PHP** | Learn server-side programming and backend logic |
| **MariaDB** | Understand database operations and SQL |
| **jQuery** | Practice JavaScript and AJAX requests |
| **VS Code** | Get comfortable with a professional IDE |
| **Git & GitHub** | Learn version control and collaboration |
| **XAMPP** | Set up local development environment |

##  How to Run This Project

### What You Need
- XAMPP (or any PHP/MySQL stack)
- Web browser
- That's it! 

### Simple Setup
1. **Start XAMPP** (Apache and MySQL)
2. **Put this folder** in `htdocs` 
3. **Create database** in phpMyAdmin:
   ```sql
   CREATE DATABASE task_manager;
   USE task_manager;
   CREATE TABLE tasks (
       id INT AUTO_INCREMENT PRIMARY KEY,
       title VARCHAR(255) NOT NULL,
       description TEXT,
       status ENUM('pending', 'completed') DEFAULT 'pending',
       created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
   );
   ```
4. **Visit**: `http://localhost/task-manager`

## 📖 What This Project Does

It's a simple todo list where you can:
-  **Add tasks** with titles and descriptions  
-  **Mark tasks as done/not done**
-  **Delete tasks** you don't need anymore
-  **See updates instantly** without page refresh

## What I Learned Building This

### PHP & Backend
```php
// Learned: How to connect to database safely
$pdo = new PDO("mysql:host=localhost;dbname=task_manager", "root", "");

// Learned: How to handle different HTTP methods
switch($method) {
    case 'GET': getTasks($pdo); break;
    case 'POST': createTask($pdo); break;
    // ... etc
}
```

### jQuery & Frontend
```javascript
// Learned: How to make AJAX calls
$.ajax({
    url: 'api/tasks.php',
    method: 'POST',
    data: JSON.stringify({title: "Learn PHP"}),
    success: function(response) {
        // Update UI without refreshing
    }
});
```

### Database
```sql
-- Learned: Basic SQL operations
INSERT INTO tasks (title, description) VALUES ('Learn', 'PHP');
SELECT * FROM tasks ORDER BY created_at DESC;
UPDATE tasks SET status = 'completed' WHERE id = 1;
DELETE FROM tasks WHERE id = 1;
```

##  Skills I Practiced

- **PHP Basics**: Variables, functions, arrays, control structures
- **Database Operations**: CRUD operations with PDO
- **jQuery**: Selectors, events, AJAX, DOM manipulation  
- **REST Concepts**: HTTP methods, JSON responses
- **Git**: Commits, pushing to GitHub, version control
- **Problem Solving**: Debugging, error handling

##  Project Structure
```
task-manager/
├── index.php          # Main page
├── api/
│   ├── tasks.php      # API endpoints I built
│   └── config.php     # Database config
├── js/
│   └── app.js         # jQuery code I wrote
├── css/
│   └── style.css      # My CSS styling
└── README.md          # This file!
```
