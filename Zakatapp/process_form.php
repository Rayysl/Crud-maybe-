<?php
// process_form.php
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "zakatdb";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die("Koneksi gagal: " . $conn->connect_error);
}

// Ambil data dari formulir HTML
$datetime = $_POST['datetime'];
$userId = $_POST['userId'];
$muzakkiId = $_POST['muzakkiId'];
$keterangan = $_POST['keterangan'];
$nonota = $_POST['nonota'];

// Ambil ID baris unik dari formulir
$rowId = $_POST['rowId'];

// Masukkan data ke dalam tabel Zakat
$sql = "INSERT INTO Zakat (Id, Datetime, User_id, Muzakki_id, Keterangan, Nonota)
        VALUES ('$rowId', '$datetime', '$userId', '$muzakkiId', '$keterangan', '$nonota')";

if ($conn->query($sql) === TRUE) {
    // Ambil data yang baru ditambahkan
    $newData = array(
        "Id" => $rowId,
        "Datetime" => $datetime,
        "User_id" => $userId,
        "Muzakki_id" => $muzakkiId,
        "Keterangan" => $keterangan,
        "Nonota" => $nonota
    );

    // Convert data ke format JSON dan kirim ke klien
    echo json_encode($newData);
} else {
    echo "Error: " . $sql . "<br>" . $conn->error;
}

$conn->close();
?>
