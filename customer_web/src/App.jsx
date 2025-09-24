import "./App.css";
import * as React from "react";
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
} from "@tanstack/react-table";

function App() {
  const [customers, setCustomers] = React.useState([]);
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [customerData, setCustomerData] = React.useState({
    name: "",
    email: "",
    balance: "",
  });
  const [searchTerm, setSearchTerm] = React.useState("");
  const [pageIndex, setPageIndex] = React.useState(0);
  const pageSize = 5;

  // Fetch customers once
  React.useEffect(() => {
    fetchCustomers();
  }, []);

  const fetchCustomers = () => {
    fetch("http://localhost:8080/api/customers")
      .then((response) => response.json())
      .then((data) => setCustomers(data))
      .catch((error) => console.error("Error fetching customers:", error));
  };

  // Handle add/edit customer
  const handleUpdate = (customer) => {
    setCustomerData(customer);
    setIsModalOpen(true);
  };

  const handleDelete = (customerId) => {
    if (!window.confirm("Are you sure you want to delete this customer?"))
      return;
    fetch(`http://localhost:8080/api/customers/${customerId}`, {
      method: "DELETE",
    })
      .then(() => fetchCustomers())
      .catch((error) => console.error("Error deleting customer:", error));
  };

  const handleSubmit = () => {
    const method = customerData.id ? "PUT" : "POST";
    const url = customerData.id
      ? `http://localhost:8080/api/customers/${customerData.id}`
      : "http://localhost:8080/api/customers";

    fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(customerData),
    })
      .then((response) => {
        if (!response.ok) throw new Error("Failed to save customer");
        return response.json();
      })
      .then(() => {
        fetchCustomers();
        setIsModalOpen(false);
        setCustomerData({ name: "", email: "", balance: "" });
      })
      .catch((error) => {
        console.error("Error saving customer:", error);
        alert("Failed to save customer");
      });
  };

  // Filtered + paginated customers
  const filteredCustomers = customers.filter(
    (c) =>
      c.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.email?.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const pageCount = Math.ceil(filteredCustomers.length / pageSize);
  const paginatedCustomers = filteredCustomers.slice(
    pageIndex * pageSize,
    pageIndex * pageSize + pageSize
  );

  // Define table columns
  const columns = React.useMemo(
    () => [
      { header: "CustomerId", accessorKey: "id" },
      { header: "Name", accessorKey: "name" },
      { header: "Email", accessorKey: "email" },
      { header: "Balance", accessorKey: "balance" },
      {
        header: "Edit",
        cell: ({ row }) => (
          <button
            className="editBtn"
            onClick={() => handleUpdate(row.original)}
          >
            Edit
          </button>
        ),
      },
      {
        header: "Delete",
        cell: ({ row }) => (
          <button
            className="deleteBtn"
            onClick={() => handleDelete(row.original.id)}
          >
            Delete
          </button>
        ),
      },
    ],
    []
  );

  const table = useReactTable({
    data: paginatedCustomers,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="main-container">
      <h3>Full stack Spring Boot and React project</h3>

      <div className="search-pannel">
        <input
          className="search_input"
          type="text"
          placeholder="search customer"
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setPageIndex(0);
          }}
        />
        <button
          className="add_btn"
          onClick={() => {
            setCustomerData({ name: "", email: "", balance: "" });
            setIsModalOpen(true);
          }}
        >
          Add customer
        </button>
      </div>

      {isModalOpen && (
        <div className="addPopUp">
          <span className="closeBtn" onClick={() => setIsModalOpen(false)}>
            &times;
          </span>
          <h4>Customer Details</h4>
          <div className="popupdiv">
            <label>Name</label>
            <br />
            <input
              className="popupinput"
              value={customerData.name}
              onChange={(e) =>
                setCustomerData({ ...customerData, name: e.target.value })
              }
              type="text"
              name="name"
            />
          </div>
          <div className="popupdiv">
            <label>Email</label>
            <br />
            <input
              className="popupinput"
              value={customerData.email}
              onChange={(e) =>
                setCustomerData({ ...customerData, email: e.target.value })
              }
              type="text"
              name="email"
            />
          </div>
          <div className="popupdiv">
            <label>Balance</label>
            <br />
            <input
              className="popupinput"
              value={customerData.balance}
              onChange={(e) =>
                setCustomerData({ ...customerData, balance: e.target.value })
              }
              type="text"
              name="balance"
            />
          </div>
          <br />
          <button className="submitBtn" onClick={handleSubmit}>
            Submit
          </button>
        </div>
      )}

      <table className="table">
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th key={header.id}>
                  {flexRender(
                    header.column.columnDef.header,
                    header.getContext()
                  )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id}>
                  {flexRender(
                    cell.column.columnDef.cell ?? cell.getValue(),
                    cell.getContext()
                  )}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination Controls */}
      <div style={{ marginTop: "10px", textAlign: "center" }}>
        <button
          onClick={() => setPageIndex((prev) => Math.max(prev - 1, 0))}
          disabled={pageIndex === 0}
        >
          Previous
        </button>
        <span style={{ margin: "0 10px" }}>
          Page {pageIndex + 1} of {pageCount}
        </span>
        <button
          onClick={() =>
            setPageIndex((prev) => Math.min(prev + 1, pageCount - 1))
          }
          disabled={pageIndex >= pageCount - 1}
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default App;
