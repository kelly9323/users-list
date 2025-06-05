import React, { useState, useEffect } from 'react';

function UserList() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetch("https://randomuser.me/api/?results=5")  // Request multiple users
      .then(response => response.json())
      .then(json => setUsers(json.results))
      .catch(err => console.error("Error fetching users:", err))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="App">
      {loading ? (
        <div>Loading...</div>
      ) : (
        <>
          {users.map(user => (
            <div 
              key={user.login.uuid} 
              style={{
                border: '1px solid #ccc',
                padding: '10px',
                margin: '10px',
                borderRadius: '6px',
                display: 'flex',
                alignItems: 'center',
                gap: '10px'
              }}
            >
              <img 
                src={user.picture.thumbnail} 
                alt={`${user.name.first} ${user.name.last}`} 
                style={{ borderRadius: '50%' }}
              />
              <div>
                <div>
                  <strong>{user.name.first} {user.name.last}</strong>
                </div>
                <div>{user.email}</div>
              </div>
            </div>
          ))}
        </>
      )}
    </div>
  );
}

export default UserList;
