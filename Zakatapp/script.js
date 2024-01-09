// script.js
document.addEventListener("DOMContentLoaded", function () {
    // Load existing data from localStorage when the page loads
    loadExistingData();
});

function submitForm(event) {
    event.preventDefault();

    // Get form data
    var formData = new FormData(document.getElementById("zakatForm"));

    // Determine if it's an edit or a new entry
    var isEdit = formData.get("rowId") !== "";

    // Send form data to the server using AJAX
    var xhr = new XMLHttpRequest();
    xhr.open("POST", isEdit ? "process_edit.php" : "process_form.php", true);
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            // Update the table with the new data or edited data
            if (isEdit) {
                editExistingRow(JSON.parse(xhr.responseText));
            } else {
                updateTable(JSON.parse(xhr.responseText));
            }

            // Clear the form fields
            clearForm();

            // Save the updated data to localStorage
            saveDataToLocalStorage();
        }
    };
    xhr.send(formData);
}

function updateTable(data) {
    var tableBody = document.getElementById("zakatTableBody");
    var newRow = tableBody.insertRow(tableBody.rows.length);

    // Create cells and populate data in the new row
    var cell1 = newRow.insertCell(0);
    var cell2 = newRow.insertCell(1);
    var cell3 = newRow.insertCell(2);
    var cell4 = newRow.insertCell(3);
    var cell5 = newRow.insertCell(4);
    var cell6 = newRow.insertCell(5);
    var cell7 = newRow.insertCell(6);

    cell1.innerHTML = data.Id;
    cell2.innerHTML = data.Datetime;
    cell3.innerHTML = data.User_id;
    cell4.innerHTML = data.Muzakki_id;
    cell5.innerHTML = data.Keterangan;
    cell6.innerHTML = data.Nonota;

    // Add edit and delete buttons
    var editButton = document.createElement("button");
    editButton.innerHTML = "Edit";
    editButton.onclick = function() {
        editRow(this);
    };
    cell7.appendChild(editButton);

    var deleteButton = document.createElement("button");
    deleteButton.innerHTML = "Delete";
    deleteButton.onclick = function() {
        deleteRow(this);
    };
    cell7.appendChild(deleteButton);
}

function editRow(button) {
    var row = button.parentNode.parentNode;
    var table = document.getElementById("zakatTableBody");

    // Fill the form with the data of the selected row
    document.getElementById("datetime").value = row.cells[1].innerHTML;
    document.getElementById("userId").value = row.cells[2].innerHTML;
    document.getElementById("muzakkiId").value = row.cells[3].innerHTML;
    document.getElementById("keterangan").value = row.cells[4].innerHTML;
    document.getElementById("nonota").value = row.cells[5].innerHTML;

    // Set the rowId to be updated
    document.getElementById("rowId").value = row.cells[0].innerHTML;
}

function clearForm() {
    document.getElementById("zakatForm").reset();
    document.getElementById("rowId").value = ""; // Clear the rowId for a new entry
}

function editExistingRow(data) {
    // Find the row with the matching Id and update its cells
    var tableRows = document.getElementById("zakatTableBody").getElementsByTagName("tr");
    for (var i = 0; i < tableRows.length; i++) {
        if (tableRows[i].cells[0].innerHTML === data.Id) {
            tableRows[i].cells[1].innerHTML = data.Datetime;
            tableRows[i].cells[2].innerHTML = data.User_id;
            tableRows[i].cells[3].innerHTML = data.Muzakki_id;
            tableRows[i].cells[4].innerHTML = data.Keterangan;
            tableRows[i].cells[5].innerHTML = data.Nonota;
            break;
        }
    }
}

function deleteRow(button) {
    var row = button.parentNode.parentNode;
    var table = document.getElementById("zakatTableBody");
    table.deleteRow(row.rowIndex);

    // Save the updated data to localStorage after deleting a row
    saveDataToLocalStorage();
}

function saveDataToLocalStorage() {
    var tableRows = document.getElementById("zakatTableBody").innerHTML;
    localStorage.setItem("zakatData", tableRows);

    console.log("Data saved to localStorage.");
}

function loadExistingData() {
    var storedData = localStorage.getItem("zakatData");
    if (storedData) {
        document.getElementById("zakatTableBody").innerHTML = storedData;
    }
}
