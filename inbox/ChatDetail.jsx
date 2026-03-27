import React, { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import { useMockData } from "../contexts/MockData";

const ChatDetail = () => {
  // Get ID from URL
  const { id } = useParams();

  const { conversations, users, currentUser, sendMessage } =
    useMockData();

  // Find this conversation
  const conversation = conversations.find((c) => c.id === id);

  // Message input
  const [message, setMessage] = useState("");

  // Typing indicator
  const [isTyping, setIsTyping] = useState(false);

  // Scroll reference
  const bottomRef = useRef(null);

  // Auto scroll when messages update
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [conversation]);

  // Mark messages as read when opening chat
  useEffect(() => {
    if (!conversation) return;

    conversation.messages.forEach((msg) => {
      if (msg.receiverId === currentUser.id) {
        msg.read = true;
      }
    });
  }, [conversation, currentUser.id]);

  if (!conversation) return <p>Conversation not found</p>;

  // Get other user
  const otherUserId = conversation.participantIds.find(
    (uid) => uid !== currentUser.id
  );

  const otherUser = users.find((u) => u.id === otherUserId);

  // Send message
  const handleSend = (e) => {
    e.preventDefault();

    if (!message.trim()) return;

    sendMessage(otherUserId, message);

    setMessage("");

    // Simulate typing
    setIsTyping(true);
    setTimeout(() => setIsTyping(false), 2000);
  };

  return (
    <div>
      {/* Header */}
      <h3>{otherUser.name}</h3>
      <p>{otherUser.isOnline ? "Online" : "Offline"}</p>

      {/* Messages */}
      <div>
        {conversation.messages.map((msg) => {
          const isSent = msg.senderId === currentUser.id;

          return (
            <div
              key={msg.id}
              style={{
                textAlign: isSent ? "right" : "left",
                margin: "10px",
              }}
            >
              {/* Message text */}
              <p>{msg.content}</p>

              {/* Timestamp */}
              <small>
                {new Date(msg.timestamp).toLocaleTimeString()}
              </small>

              {/* Read receipt */}
              {isSent && <span>{msg.read ? " ✓✓" : " ✓"}</span>}
            </div>
          );
        })}

        {/* Typing indicator */}
        {isTyping && <p>{otherUser.name} is typing...</p>}

        <div ref={bottomRef}></div>
      </div>

      {/* Input */}
      <form onSubmit={handleSend}>
        <input
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type message..."
        />
        <button type="submit">Send</button>
      </form>
    </div>
  );
};

export default ChatDetail;