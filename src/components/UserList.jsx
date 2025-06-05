import React, { useState, useEffect } from "react";

function UserList({ searchInput }) {
  const [allUsers, setAllUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  useEffect(() => {
    setLoading(true);
    fetch("https://randomuser.me/api/?results=50&seed=abc")
      .then((res) => res.json())
      .then((json) => setAllUsers(json.results))
      .catch((err) => console.error("Error fetching users:", err))
      .finally(() => setLoading(false));
  }, []);

  const filteredUsers = allUsers.filter((user) => {
    const fullName = `${user.name.first} ${user.name.last}`.toLowerCase();
    const email = user.email.toLowerCase();
    const input = searchInput.toLowerCase();
    return fullName.includes(input) || email.includes(input);
  });

  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentItems = filteredUsers.slice(startIndex, startIndex + itemsPerPage);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="App" style={{ fontFamily: "Arial", maxWidth: "600px", margin: "0 auto" }}>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <>
          {currentItems.map((user) => (
            <div
              key={user.login.uuid}
              style={{
                border: "1px solid #ccc",
                padding: "10px",
                marginBottom: "10px",
                borderRadius: "6px",
                display: "flex",
                alignItems: "center",
                gap: "10px",
              }}
            >
              <img
                src={user.picture.thumbnail}
                alt={`${user.name.first} ${user.name.last}`}
                style={{ borderRadius: "50%" }}
              />
              <div>
                <div>
                  <strong>{user.name.first} {user.name.last}</strong>
                </div>
                <div>{user.email}</div>
              </div>
            </div>
          ))}

          {/* Pages */}
          <div style={{ marginTop: "20px", textAlign: "center" }}>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => handlePageChange(page)}
              >
                {page}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default UserList;
