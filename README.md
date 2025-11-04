# PHP Task Manager - Learning Project 🎓

A simple task management web application I built to learn **PHP, jQuery, and MariaDB**.

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
