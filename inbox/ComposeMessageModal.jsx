import React, { useState } from "react";
import { useMockData } from "../contexts/MockData";

const ComposeMessageModal = ({ isOpen, onClose }) => {
  const { users, currentUser, sendMessage } = useMockData();

  const [search, setSearch] = useState("");
  const [message, setMessage] = useState("");
  const [selectedUser, setSelectedUser] = useState(null);

  // Filter users based on search
  const filteredUsers = users.filter(
    (u) =>
      u.id !== currentUser.id &&
      u.name.toLowerCase().includes(search.toLowerCase())
  );

  const handleSend = () => {
    if (!selectedUser || !message.trim()) return;

    sendMessage(selectedUser, message);

    // Reset
    setSearch("");
    setMessage("");
    setSelectedUser(null);

    onClose();
  };

  if (!isOpen) return null;

  return (
    <div style={{ background: "rgba(0,0,0,0.7)", padding: "20px" }}>
      <div style={{ background: "white", padding: "20px" }}>
        <h2>New Message</h2>

        {/* Search */}
        <input
          placeholder="Search user..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        {/* User list */}
        {filteredUsers.map((user) => (
          <div key={user.id} onClick={() => setSelectedUser(user.id)}>
            {user.name}
          </div>
        ))}

        {/* Message */}
        <textarea
          placeholder="Type message..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />

        <button onClick={handleSend}>Send</button>
        <button onClick={onClose}>Cancel</button>
      </div>
    </div>
  );
};

export default ComposeMessageModal;