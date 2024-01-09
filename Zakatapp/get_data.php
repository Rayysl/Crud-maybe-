<?php
// get_data.php
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "zakatdb";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die("Koneksi gagal: " . $conn->connect_error);
}

// Ambil semua data dari tabel Zakat
$sql = "SELECT * FROM Zakat";
$result = $conn->query($sql);

$data = [];

if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        $data[] = $row;
    }
}

// Convert data ke format JSON dan kirim ke klien
echo json_encode($data);

$conn->close();
?>
