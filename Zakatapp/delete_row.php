<?php
// delete_row.php
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "zakatdb";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die("Koneksi gagal: " . $conn->connect_error);
}

// Ambil ID baris unik dari permintaan POST
$rowId = $_POST['rowId'];

// Hapus data dari tabel Zakat berdasarkan ID
$sql = "DELETE FROM Zakat WHERE Id='$rowId'";

if ($conn->query($sql) === TRUE) {
    // Kirim respons JSON ke klien
    echo json_encode(['success' => true]);
} else {
    echo "Error: " . $sql . "<br>" . $conn->error;
}

$conn->close();
?>
