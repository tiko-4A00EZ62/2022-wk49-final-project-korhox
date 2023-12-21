const refreshTable = () => {
  const searchRecipient = "&recipient=" + document.getElementById("searchRecipient")?.value || "";
  const searchDescription = "&description=" + document.getElementById("searchDescription")?.value || "";
  const searchCategory = "&category=" + document.getElementById("searchCategory")?.value || "";
  const searchAmountMin = "&amountFrom=" + document.getElementById("searchAmountMin")?.value || 0;
  const searchAmountMax = "&amountTo=" + document.getElementById("searchAmountMax")?.value || 1000000000;
  const searchDateMin = "&dateFrom=" + document.getElementById("searchDateMin")?.value || "1970-01-01";
  const searchDateMax = "&dateTo=" + document.getElementById("searchDateMax")?.value || "9999-12-31";

  const page = document.getElementById("pageNumber")?.value || 1;
  const limit = document.getElementById("pageSize")?.value || 10;

  fetch("/api/expenses?page=" + page + "&limit=" + limit + searchRecipient + searchDescription + searchCategory + searchAmountMin + searchAmountMax + searchDateMin + searchDateMax, {
    method: "GET",
    headers: {
      "Content-Type": "application/json"
    }
  }).then((data) => {
    return data.json();
  }).then((data) => {
    const table = document.getElementById("expenses");
    while (table.rows.length > 1) {
      table.deleteRow(1);
    }
    if (data.data.length == 0) {
      const row = table.insertRow(1);
      const cell = row.insertCell(0);
      cell.colSpan = 6;
      cell.innerHTML = `<div class="text-start fs-5">No expenses found.</div>`;
    } else {
      for (let i = 0; i < data.data.length; i++) {
        const row = table.insertRow(i + 1);
        const recipient = row.insertCell(0);
        const description = row.insertCell(1);
        const category = row.insertCell(2);
        const amount = row.insertCell(3);
        const date = row.insertCell(4);
        const actions = row.insertCell(5);
        description.innerHTML = decodeURIComponent(data.data[i].description);
        category.innerHTML = decodeURIComponent(data.data[i].category);
        recipient.innerHTML = decodeURIComponent(data.data[i].recipient);
        amount.innerHTML = `<div class="text-end">${(data.data[i].amount).toFixed(2)} €</div>`;
        date.innerHTML = `<div class="text-end">${moment(data.data[i].date).format("DD/MM/YYYY")} </div>`;
        actions.innerHTML = `<div class="d-flex gap-3 justify-content-end">
        <button class="btn btn-primary" onclick="editExpense(${data.data[i].id})">
          <i class="fa-solid fa-fw fa-pencil"></i>
        </button>
        <button class="btn btn-danger" onclick="deleteExpense(${data.data[i].id})">
          <i class="fa-solid fa-fw fa-trash"></i>
        </button>
      </div>`;
        document.getElementById("pageNumber").max = data.meta.pages.total;
        document.getElementById("pageNumber").value = data.meta.pages.current;
        document.getElementById("totalPages").innerHTML = data.meta.pages.total;
        document.getElementById("totalEntries").innerHTML = data.meta.results;
        document.getElementById("summarySearch").innerHTML = Intl.NumberFormat("fi", { minimumFractionDigits: 2 }).format(data.meta.amount.total) + " €";
      }
    }
  }).catch(() => {
    Swal.fire({
      title: "Error",
      text: "An error occurred while updating the table",
      icon: "error",
    });
  }
  )
}

refreshTable();

const refreshSummary = () => {
  fetch(`/api/expenses?dateFrom=${moment().startOf("year").format(moment.DATE)}&dateTo=${moment().endOf("year").format(moment.DATE)}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json"
    }
  }).then((data) => {
    return data.json();
  }).then((data) => {
    document.getElementById("summaryThisYear").innerHTML = Intl.NumberFormat("fi", { minimumFractionDigits: 2 }).format(data.meta.amount.total) + " €";
  }).catch((e) => {
    console.log("error", e);
  });
  fetch(`/api/expenses?dateFrom=${moment().subtract(1, "month").startOf("month").format(moment.DATE)}&dateTo=${moment().subtract(1, "month").endOf("month").format(moment.DATE)}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json"
    }
  }).then((data) => {
    return data.json();
  }).then((data) => {
    document.getElementById("summaryLastMonth").innerHTML = Intl.NumberFormat("fi", { minimumFractionDigits: 2 }).format(data.meta.amount.total) + " €";
  }).catch((e) => {
    console.log("error", e);
  });
  fetch(`/api/expenses?dateFrom=${moment().startOf("month").format(moment.DATE)}&dateTo=${moment().endOf("month").format(moment.DATE)}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json"
    }
  }).then((data) => {
    return data.json();
  }).then((data) => {
    document.getElementById("summaryMonth").innerHTML = Intl.NumberFormat("fi", { minimumFractionDigits: 2 }).format(data.meta.amount.total) + " €";
  }).catch((e) => {
    console.log("error", e);
  });
};

refreshSummary();

const addExpense = () => {
  Swal.fire({
    title: "Add Expense",
    html: `<div class="text-start p-2">
      <div class="input-group mb-3">
        <div class="form-floating">
          <input id="amount" class="form-control" type="number" min="0.00" step="0.05" />
          <label for="amount">Amount</label>
        </div>
        <span class="input-group-text">
          <i class="fa-solid fa-fw fa-euro-sign"></i>
        </span>
      </div>
      <div class="form-floating">
        <input id="recipient" class="form-control mb-3" type="text"/>
        <label for="recipient">Recipient</label>
      </div>
      <div class="form-floating">
        <textarea id="description" class="form-control mb-3"></textarea>
        <label for="description">Description</label>
      </div>
      <div class="form-floating">
        <input id="category" class="form-control mb-3" type="text"/>
        <label for="category">Category</label>
      </div>
      <div class="form-floating">
        <input id="date" class="form-control" type="date"/>
        <label for="date">Date</label>
      </div>
      <input type="button" class="btn btn-primary mt-3" value="Add Expense" onclick="insertExpense()" />
      <input type="reset" class="btn btn-secondary mt-3" value="Cancel" onclick="Swal.close()" />
    </div>
  `,
    customClass: {
      title: "text-start"
    },
    showCancelButton: false,
    showConfirmButton: false,
  })
};

const insertExpense = () => {
  fetch(
    "/api/expenses",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        amount: document.getElementById("amount").value,
        recipient: encodeURIComponent(document.getElementById("recipient").value),
        description: encodeURIComponent(document.getElementById("description").value),
        category: encodeURIComponent(document.getElementById("category").value),
        date: document.getElementById("date").value
      })
    }
  ).then(() => {
    refreshTable();
    Swal.fire({
      title: "Expense added",
      icon: "success",
    });
  }).catch(() => {
    Swal.fire({
      title: "Error",
      text: "An error occurred while adding the expense",
      icon: "error",
    });
  });
};

const editExpense = (id) => {
  fetch("/api/expenses/" + id,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    }
  ).then((data) => {
    return data.json();
  }).then((data) => {
    Swal.fire({
      title: "Edit Expense",
      html: `<div class="text-start p-2">
      <div class="input-group mb-3">
        <div class="form-floating">
          <input id="amount" class="form-control" type="number" min="0.00" step="0.05" value="${data.data.amount}"/>
          <label for="amount">Amount</label>
        </div>
        <span class="input-group-text">
          <i class="fa-solid fa-fw fa-euro-sign"></i>
        </span>
      </div>
      <div class="form-floating">
        <input id="recipient" class="form-control mb-3" type="text" value="${decodeURIComponent(data.data.recipient)}"/>
        <label for="recipient">Recipient</label>
      </div>
      <div class="form-floating">
        <textarea id="description" class="form-control mb-3">${decodeURIComponent(data.data.description)}</textarea>
        <label for="description">Description</label>
      </div>
      <div class="form-floating">
        <input id="category" class="form-control mb-3" type="text" value="${decodeURIComponent(data.data.category)}"/>
        <label for="category">Category</label>
      </div>
      <div class="form-floating">
        <input id="date" class="form-control" type="date" value="${moment(data.data.date).format("YYYY-MM-DD")}"/>
        <label for="date">Date</label>
      </div>
      <input type="button" class="btn btn-primary mt-3" value="Save Changes" onclick="updateExpense(${data.data.id})" />
      <input type="reset" class="btn btn-secondary mt-3" value="Cancel" onclick="Swal.close()" />
    </div>
  `,
      customClass: {
        title: "text-start"
      },
      showCancelButton: false,
      showConfirmButton: false,
    })
  }).catch(() => {
    Swal.fire({
      title: "Error",
      text: "An error occurred while editing the expense",
      icon: "error",
    });
  });
}

const updateExpense = (id) => {
  fetch("/api/expenses/" + id,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        amount: document.getElementById("amount").value,
        recipient: encodeURIComponent(document.getElementById("recipient").value),
        description: encodeURIComponent(document.getElementById("description").value),
        category: encodeURIComponent(document.getElementById("category").value),
        date: document.getElementById("date").value
      })
    }
  ).then(() => {
    refreshTable();
    Swal.fire({
      title: "Expense edited",
      icon: "success",
    });
  }).catch(() => {
    Swal.fire({
      title: "Error",
      text: "An error occurred while editing the expense",
      icon: "error",
    });
  });
}

const deleteExpense = (id) => {
  Swal.fire({
    title: "Are you sure?",
    text: "You won't be able to revert this!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonText: "Yes, delete it!",
    cancelButtonText: "No, cancel!",
  }).then((result) => {
    if (result.isConfirmed) {
      fetch("/api/expenses/" + id,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json"
          }
        }
      ).then(() => {
        refreshTable();
        Swal.fire({
          title: "Expense deleted",
          icon: "success",
          onClose: () => {
            Swal.close();
          }
        });
      }).catch(() => {
        Swal.fire({
          title: "Error",
          text: "An error occurred while deleting the expense",
          icon: "error",
        });
      });
    }
  });
}

const nextPage = () => {
  const input = document.getElementById("pageNumber");
  if (input.value <= input.max) {
    input.value++;
    refreshTable(input.value)
    document.getElementById("prevButton").disabled = false;
    if (input.value == input.max) document.getElementById("nextButton").disabled = true;
  }
}

const prevPage = () => {
  const input = document.getElementById("pageNumber");
  if (input.value >= input.min) {
    input.value--;
    refreshTable(input.value)
    document.getElementById("nextButton").disabled = false;
    if (input.value == input.min) document.getElementById("prevButton").disabled = true;
  }
}

const startSearch = () => {
  const el = document.getElementById("searchForm");
  el.style.display == "none" ? el.style.display = "flex" : el.style.display = "none";
  document.getElementById("filterToggle").style.display = "none";
}

const startFilter = () => {
  const el = document.getElementById("filterForm");
  el.style.display == "none" ? el.style.display = "flex" : el.style.display = "none";
  document.getElementById("filterToggle").style.display = "none";
}

const startAmount = () => {
  const el = document.getElementById("amountForm");
  el.style.display == "none" ? el.style.display = "flex" : el.style.display = "none";
  document.getElementById("filterToggle").style.display = "none";
}

const startDate = () => {
  const el = document.getElementById("dateForm");
  el.style.display == "none" ? el.style.display = "flex" : el.style.display = "none";
  document.getElementById("filterToggle").style.display = "none";
}

const closeForm = () => {
  document.getElementById("searchForm").style.display = "none";
  document.getElementById("filterForm").style.display = "none";
  document.getElementById("amountForm").style.display = "none";
  document.getElementById("dateForm").style.display = "none";
  document.getElementById("filterToggle").style.display = "flex";
}
