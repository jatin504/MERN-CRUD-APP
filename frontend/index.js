const postdata = async () => {
  try {
    const user_input = document.getElementById("user_input").value;
    const response = await fetch("http://localhost:4000/api/posttdo", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ user_data: user_input }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    console.log(data);

    document.getElementById("user_input").value = "";

    getdata();
    
  } catch (err) {
    console.error("Error:", err);
  }
};

const getdata = async () => {
  try {
    const res = await fetch("http://localhost:4000/api/gettodo");
    const jsonData = await res.json();
    console.log(jsonData);

    const table = document.getElementById("table");

    // Clear the table before adding new rows
    table.innerHTML = `
            <thead>
                <tr>
                    <th>User Data</th>
                    <th>Created At</th>
                    <th>Updated At</th>
                    <th>Action</th>
                    <th>UPDATE</th>
                </tr>
            </thead>
            <tbody></tbody>
        `;

    const tbody = table.querySelector("tbody");

    jsonData.data.forEach((item) => {

      const tr = document.createElement("tr");
      const tdUserData = document.createElement("td");
      const tdCreatedAt = document.createElement("td");
      const tdUpdatedAt = document.createElement("td");
      const tdDelete = document.createElement("td");
      const tdUpdate = document.createElement("td");
      const deleteButton = document.createElement("button");
      const updateButton = document.createElement("button");

      // for deleting task
      deleteButton.onclick = async () => {
        try {
          const id = item._id; // Use _id to match your MongoDB field

          await fetch(`http://localhost:4000/api/delete/${id}`, {
            method: "DELETE",
          });

          getdata();
        } catch (err) {
          console.log(err);
        }
        console.log("Data deleted successfully");
      };

      //for updating task
      updateButton.onclick = async () => {
        const user_input = prompt("Enter the data here", item.user_data);

        if (user_input !== null) {
            await fetch(`http://localhost:4000/api/todoupdate/${item._id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ user_data: user_input })
            });

            // Refresh the table data after update
            getdata();
        }
      };

      deleteButton.className = "deleteButton";
      updateButton.className = "updateButton";
      tdUserData.className = "tdUserData";
      tdCreatedAt.className = "tdCreatedAt";
      tdUpdatedAt.className = "tdUpdatedAt";
      tr.className = "tr";

      tdUserData.innerHTML = item.user_data;
      tdCreatedAt.innerHTML = new Date(item.createdAt).toLocaleString();
      tdUpdatedAt.innerHTML = new Date(item.updatedAt).toLocaleString();
      deleteButton.innerHTML = "Delete";
      updateButton.innerHTML = "UPDATE";

      // Append buttons to their respective td elements
      tdDelete.appendChild(deleteButton);
      tdUpdate.appendChild(updateButton);

      // Append all td elements to the tr
      tr.appendChild(tdUserData);
      tr.appendChild(tdCreatedAt);
      tr.appendChild(tdUpdatedAt);
      tr.appendChild(tdDelete);
      tr.appendChild(tdUpdate);

      tbody.appendChild(tr);
    });
  } catch (err) {
    console.log(err);
  }
};

getdata();
