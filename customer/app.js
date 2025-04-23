function addCustomer() {
    let name = document.getElementById("name").value,
        email = document.getElementById("email").value,
        number = document.getElementById("phoneNumber").value,
        location = document.getElementById("location").value

  if (name.length == 0 || number.length == 0 || email.length == 0 || location.length == 0) {
    alert("TextField empty!!!");
  } else if (number.length != 10) {
    number = "";
    alert("Inavlid Phone Number");
  } else {

    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    
    const raw = JSON.stringify({
      "name": name,
      "email": email,
      "number": number,
      "location": location
    });
    
    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow"
    };
    
    fetch("http://localhost:8080/customer/add", requestOptions)
      .then((response) => response.text())
      .then((result) => console.log(result))
      .catch((error) => console.error(error));

    document.getElementById("name").value = "";
    document.getElementById("email").value = "";
    document.getElementById("phoneNumber").value = "";
    document.getElementById("location").value = "";

    alert("Customer added successfully");

  }
}

function searchCustomer() {

  const raw = document.getElementById("search-input").value.trim();

  const requestOptions = {
      method: "GET",
      redirect: "follow"
  };

  fetch(`http://localhost:8080/customer/search?id=${raw}`, requestOptions)
      .then(response => {
        if (!response.ok) {
            throw new Error("Customer not found");
        }
        return response.json();
    })
      .then(customer => {

          document.getElementById("viewName").value = customer.name || "Null";
          document.getElementById("viewEmail").value = customer.email || "Null";
          document.getElementById("viewPhoneNumber").value = customer.number || "Null";
          document.getElementById("viewLocation").value = customer.location || "Null";
      })
      .catch(error => {

          document.getElementById("viewName").value = "";
          document.getElementById("viewEmail").value = "";
          document.getElementById("viewPhoneNumber").value = "";
          document.getElementById("viewLocation").value = "";
          
          alert("Customer not found. Please enter a valid ID.");
      });
}

function updateCustomer() {
  let name = document.getElementById("viewName").value,
      id = document.getElementById("search-input").value,
      email = document.getElementById("viewEmail").value,
      number = document.getElementById("viewPhoneNumber").value,
      location = document.getElementById("viewLocation").value

if (name.length == 0 || number.length == 0 || email.length == 0 || location.length == 0) {
  alert("TextField empty!!!");
} else if (number.length != 10) {
  number = "";
  alert("Inavlid Phone Number");
} else {

  const myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");

const raw = JSON.stringify({
    "id": id,
    "name": name,
    "email": email,
    "number": number,
    "location": location
});

const requestOptions = {
  method: "PUT",
  headers: myHeaders,
  body: raw,
  redirect: "follow"
};

fetch("http://localhost:8080/customer/update", requestOptions)
  .then((response) => response.text())
  .then((result) => console.log(result))
  .catch((error) => console.error(error));

  document.getElementById("viewName").value = "";
  document.getElementById("viewEmail").value = "";
  document.getElementById("viewPhoneNumber").value = "";
  document.getElementById("viewLocation").value = "";

  alert("Customer Updated successfully");

}
}

function deleteCustomer() {

  const raw = document.getElementById("search-input").value.trim();
  
  const requestOptions = {
    method: "DELETE",
    redirect: "follow"
  };
  
  fetch(`http://localhost:8080/customer/delete?id=${raw}`, requestOptions)
    .then(response => {
            if (response.ok) {
                alert("Customer deleted successfully!");
                
                document.getElementById("search-input").value = "";
                document.getElementById("viewName").value = "";
                document.getElementById("viewEmail").value = "";
                document.getElementById("viewPhoneNumber").value = "";
                document.getElementById("viewLocation").value = "";
            } else {
                throw new Error("Failed to delete customer. Customer may not exist.");
            }
        })
    .then((result) => console.log(result))
    .catch((error) => console.error(error));
}

function loadTable() {
  let table = document.getElementById("customerTbl");

  let body = `<thead style="position: sticky; top: 0; z-index: 1;">
              <tr style="background-color: #ffd32a;">
                  <th scope="col">Customer ID</th>
                  <th scope="col">Name</th>
                  <th scope="col">Email</th>
                  <th scope="col">Contact Number</th>
                  <th scope="col">Location</th>
              </tr>
          </thead>
          <tbody class="table-group-divider">`;

  fetch("http://localhost:8080/customer/all")
    .then((response) => response.json()) 
    .then((customers) => {
      customers.forEach(customer => {
        body += `
          <tr>
              <th scope="row">${customer.id}</th>
              <td>${customer.name}</td>
              <td>${customer.email}</td>
              <td>${customer.number}</td>
              <td>${customer.location}</td>
          </tr>`;
      });

      body += `</tbody>`;
      table.innerHTML = body;
    })
    .catch((error) => console.error("Error fetching customer data:", error));
}

