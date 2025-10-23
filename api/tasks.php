<?php
require_once 'config.php';

header('Content-Type: application/json');

// Get the HTTP method
$method = $_SERVER['REQUEST_METHOD'];
$pdo = getDB();

// Handle different HTTP methods
switch($method) {
    case 'GET':
        // Get all tasks
        getTasks($pdo);
        break;
        
    case 'POST':
        // Create new task
        createTask($pdo);
        break;
        
    case 'PUT':
        // Update task status
        updateTask($pdo);
        break;
        
    case 'DELETE':
        // Delete task
        deleteTask($pdo);
        break;
        
    default:
        http_response_code(405);
        echo json_encode(['error' => 'Method not allowed']);
}

function getTasks($pdo) {
    try {
        $stmt = $pdo->query("SELECT * FROM tasks ORDER BY created_at DESC");
        $tasks = $stmt->fetchAll(PDO::FETCH_ASSOC);
        echo json_encode($tasks);
    } catch(PDOException $e) {
        http_response_code(500);
        echo json_encode(['error' => $e->getMessage()]);
    }
}

function createTask($pdo) {
    $input = json_decode(file_get_contents('php://input'), true);
    
    if (!isset($input['title']) || empty(trim($input['title']))) {
        http_response_code(400);
        echo json_encode(['error' => 'Task title is required']);
        return;
    }
    
    try {
        $stmt = $pdo->prepare("INSERT INTO tasks (title, description) VALUES (?, ?)");
        $stmt->execute([
            trim($input['title']),
            isset($input['description']) ? trim($input['description']) : ''
        ]);
        
        echo json_encode([
            'id' => $pdo->lastInsertId(),
            'success' => true
        ]);
    } catch(PDOException $e) {
        http_response_code(500);
        echo json_encode(['error' => $e->getMessage()]);
    }
}

function updateTask($pdo) {
    parse_str(file_get_contents('php://input'), $input);
    
    if (!isset($input['id']) || !isset($input['status'])) {
        http_response_code(400);
        echo json_encode(['error' => 'ID and status are required']);
        return;
    }
    
    try {
        $stmt = $pdo->prepare("UPDATE tasks SET status = ? WHERE id = ?");
        $stmt->execute([$input['status'], $input['id']]);
        
        echo json_encode(['success' => true]);
    } catch(PDOException $e) {
        http_response_code(500);
        echo json_encode(['error' => $e->getMessage()]);
    }
}

function deleteTask($pdo) {
    $id = $_GET['id'] ?? null;
    
    if (!$id) {
        http_response_code(400);
        echo json_encode(['error' => 'Task ID is required']);
        return;
    }
    
    try {
        $stmt = $pdo->prepare("DELETE FROM tasks WHERE id = ?");
        $stmt->execute([$id]);
        
        echo json_encode(['success' => true]);
    } catch(PDOException $e) {
        http_response_code(500);
        echo json_encode(['error' => $e->getMessage()]);
    }
}
?>