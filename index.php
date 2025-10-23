<!DOCTYPE html>
<html lang="cs">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Úkolníček</title>
    <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
    <link rel="stylesheet" href="css/style.css">
</head>
<body>
    <div class="container">
        <header>
            <h1>Úkolníček</h1>
        </header>
        
        <div class="add-task-section">
            <h2>Přidat nový úkol</h2>
            <div class="task-form">
                <input type="text" id="taskTitle" placeholder="Co potřebuješ udělat?" maxlength="255">
                <textarea id="taskDescription" placeholder="Podrobnosti (volitelné)"></textarea>
                <button id="addTaskBtn" class="btn-primary">Přidat úkol</button>
            </div>
        </div>
        
        <div class="tasks-section">
            <h2>Moje úkoly <span id="tasksCount">(0)</span></h2>
            <div id="tasksContainer" class="tasks-container">
                <!-- Tasks will be loaded here -->
            </div>
        </div>
    </div>
    
    <script src="js/app.js"></script>
</body>
</html>