$(document).ready(function() {
    // Global variables
    let tasks = [];
    
    // Initialize the app
    init();
    
    function init() {
        loadTasks();
        setupEventListeners();
    }
    
    function setupEventListeners() {
        // Add task button click
        $('#addTaskBtn').on('click', addNewTask);
        
        // Enter key in title field
        $('#taskTitle').on('keypress', function(e) {
            if (e.which === 13) { // Enter key
                addNewTask();
            }
        });
    }
    
    function addNewTask() {
        const title = $('#taskTitle').val().trim();
        const description = $('#taskDescription').val().trim();
        
        // Validate input
        if (!title) {
            alert('Prosím, zadejte název úkolu');
            $('#taskTitle').focus();
            return;
        }
        
        // Show loading state
        const originalText = $('#addTaskBtn').text();
        $('#addTaskBtn').text('Přidávám...').prop('disabled', true);
        
        // Send AJAX request
        $.ajax({
            url: 'api/tasks.php',
            method: 'POST',
            contentType: 'application/json',
            data: JSON.stringify({
                title: title,
                description: description
            }),
            success: function(response) {
                // Clear form
                $('#taskTitle').val('');
                $('#taskDescription').val('');
                
                // Reload tasks
                loadTasks();
                
                // Show success message
                showMessage('Úkol byl úspěšně přidán!', 'success');
            },
            error: function(xhr) {
                const error = JSON.parse(xhr.responseText);
                showMessage('Chyba: ' + error.error, 'error');
            },
            complete: function() {
                // Restore button state
                $('#addTaskBtn').text(originalText).prop('disabled', false);
            }
        });
    }
    
    function loadTasks() {
        $('#tasksContainer').html('<div class="loading">Načítám úkoly...</div>');
        
        $.ajax({
            url: 'api/tasks.php',
            method: 'GET',
            success: function(response) {
                tasks = response;
                displayTasks(tasks);
                updateTasksCount();
            },
            error: function(xhr) {
                $('#tasksContainer').html('<div class="error">Chyba při načítání úkolů</div>');
            }
        });
    }
    
    function displayTasks(tasks) {
        const container = $('#tasksContainer');
        
        if (tasks.length === 0) {
            container.html('<div class="loading">Žádné úkoly. Přidejte první úkol!</div>');
            return;
        }
        
        container.empty();
        
        tasks.forEach(task => {
            const taskElement = createTaskElement(task);
            container.append(taskElement);
        });
        
        // Attach event listeners to action buttons
        attachTaskEventListeners();
    }
    
    function createTaskElement(task) {
        const isCompleted = task.status === 'completed';
        const statusText = isCompleted ? '✗ Vrátit zpět' : '✓ Hotovo';
        const statusClass = isCompleted ? 'completed' : 'pending';
        
        return `
            <div class="task ${statusClass}" data-id="${task.id}">
                <h3>${escapeHtml(task.title)}</h3>
                ${task.description ? `<p>${escapeHtml(task.description)}</p>` : ''}
                <div class="task-actions">
                    <button class="toggle-btn" data-id="${task.id}">
                        ${statusText}
                    </button>
                    <button class="delete-btn" data-id="${task.id}">🗑 Smazat</button>
                </div>
                <small>Vytvořeno: ${formatDate(task.created_at)}</small>
            </div>
        `;
    }
    
    function attachTaskEventListeners() {
        // Toggle task status
        $('.toggle-btn').on('click', function() {
            const taskId = $(this).data('id');
            const task = tasks.find(t => t.id == taskId);
            const newStatus = task.status === 'completed' ? 'pending' : 'completed';
            
            toggleTaskStatus(taskId, newStatus);
        });
        
        // Delete task
        $('.delete-btn').on('click', function() {
            const taskId = $(this).data('id');
            const taskTitle = tasks.find(t => t.id == taskId).title;
            
            if (confirm(`Opravdu chcete smazat úkol "${taskTitle}"?`)) {
                deleteTask(taskId);
            }
        });
    }
    
    function toggleTaskStatus(taskId, newStatus) {
        $.ajax({
            url: 'api/tasks.php',
            method: 'PUT',
            data: { 
                id: taskId, 
                status: newStatus 
            },
            success: function() {
                loadTasks();
                showMessage(`Úkol byl označen jako ${newStatus === 'completed' ? 'hotový' : 'nedokončený'}`, 'success');
            },
            error: function(xhr) {
                showMessage('Chyba při aktualizaci úkolu', 'error');
            }
        });
    }
    
    function deleteTask(taskId) {
        $.ajax({
            url: `api/tasks.php?id=${taskId}`,
            method: 'DELETE',
            success: function() {
                loadTasks();
                showMessage('Úkol byl smazán', 'success');
            },
            error: function(xhr) {
                showMessage('Chyba při mazání úkolu', 'error');
            }
        });
    }
    
    function updateTasksCount() {
        const total = tasks.length;
        const completed = tasks.filter(t => t.status === 'completed').length;
        $('#tasksCount').text(`(${completed}/${total} dokončeno)`);
    }
    
    function showMessage(text, type) {
        // Remove existing messages
        $('.message').remove();
        
        const messageClass = type === 'success' ? 'success-message' : 'error-message';
        const message = $(`<div class="message ${messageClass}">${text}</div>`);
        
        // Add basic styles for message
        message.css({
            'position': 'fixed',
            'top': '20px',
            'right': '20px',
            'padding': '15px 20px',
            'border-radius': '5px',
            'color': 'white',
            'font-weight': 'bold',
            'z-index': '1000',
            'background': type === 'success' ? '#28a745' : '#dc3545',
            'box-shadow': '0 3px 10px rgba(0,0,0,0.2)'
        });
        
        $('body').append(message);
        
        // Auto remove after 3 seconds
        setTimeout(() => {
            message.fadeOut(300, function() {
                $(this).remove();
            });
        }, 3000);
    }
    
    function formatDate(dateString) {
        const date = new Date(dateString);
        return date.toLocaleString('cs-CZ');
    }
    
    function escapeHtml(unsafe) {
        return unsafe
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;")
            .replace(/'/g, "&#039;");
    }
});