import React, { useState } from "react";
import { useMockData } from "../contexts/MockData";
import { Link } from "react-router-dom";
import ComposeMessageModal from "../components/ComposeMessageModal";

const Inbox = () => {
  // Get data from global context
  const { conversations, users, currentUser } = useMockData();

  // Control modal visibility
  const [isModalOpen, setIsModalOpen] = useState(false);

  // STEP 1: Get only conversations that belong to current user
  const userConversations = conversations
    .filter((c) => c.participantIds.includes(currentUser.id))

    // STEP 2: Sort by latest message (newest first)
    .sort(
      (a, b) =>
        new Date(b.lastMessageAt) - new Date(a.lastMessageAt)
    );

  return (
    <div>
      <h2>Inbox</h2>

      {/* Button to open new message modal */}
      <button onClick={() => setIsModalOpen(true)}>
        New Message
      </button>

      {/* If no conversations */}
      {userConversations.length === 0 && (
        <p>No conversations yet</p>
      )}

      {/* Loop through conversations */}
      {userConversations.map((convo) => {
        // Find the OTHER user (not current user)
        const otherUserId = convo.participantIds.find(
          (id) => id !== currentUser.id
        );

        const otherUser = users.find((u) => u.id === otherUserId);

        // Get last message
        const lastMessage =
          convo.messages[convo.messages.length - 1];

        return (
          <Link key={convo.id} to={`/inbox/${convo.id}`}>
            <div style={{ border: "1px solid gray", margin: "10px", padding: "10px" }}>
              
              {/* User name */}
              <strong>{otherUser.name}</strong>

              {/* Online status */}
              <p>
                {otherUser.isOnline ? "🟢 Online" : "⚪ Offline"}
              </p>

              {/* Last message preview */}
              <p>{lastMessage.content}</p>

              {/* Show unread dot */}
              {!lastMessage.read &&
                lastMessage.receiverId === currentUser.id && (
                  <span>🔴 New</span>
                )}
            </div>
          </Link>
        );
      })}

      {/* Modal component */}
      <ComposeMessageModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
};

export default Inbox;