<?php


 

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE');
header('Access-Control-Allow-Headers: Content-Type');
session_start();

$servername = "localhost";
$username = "webshoppp";  // Cseréld ki a saját adatbázis bejelentkezési adataidra
$password = "Premo900";
$dbname = "webshoppp";

// Kapcsolódás az adatbázishoz
$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Lekérjük a csoportot, ha van
$cs = isset($_GET['cs']) ? $_GET['cs'] : 0;

// Rekurzív lekérdezés a csoport termékeinek és al-csoportjainak lekérésére
function getProducts($cs, $conn) {
    // Lekérjük az összes terméket az adott csoportból
    $sql = "SELECT * FROM termekek WHERE csoport = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("i", $cs);
    $stmt->execute();
    $result = $stmt->get_result();
    
    $products = [];
    if ($result->num_rows > 0) {
        while ($row = $result->fetch_assoc()) {
            $products[] = $row;
        }
    }

    // Lekérjük az al-csoportokat
    $sql2 = "SELECT * FROM csoport WHERE csoport = ?";
    $stmt2 = $conn->prepare($sql2);
    $stmt2->bind_param("i", $cs);
    $stmt2->execute();
    $result2 = $stmt2->get_result();

    if ($result2->num_rows > 0) {
        while ($row2 = $result2->fetch_assoc()) {
            $subgroupProducts = getProducts($row2['azonosito'], $conn);
            $products = array_merge($products, $subgroupProducts);
        }
    }

    return $products;
}

// Lekérjük a termékeket
$products = getProducts($cs, $conn);

// JSON formátumban visszaadjuk a termékeket
echo json_encode($products);

$conn->close();
?>
