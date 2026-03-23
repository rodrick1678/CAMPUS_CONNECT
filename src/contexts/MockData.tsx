

import React, { createContext, useContext, useState } from "react";
import type {
  User, Post, Conversation, Location, MockDataContextType,
} from "../types";

// ─── Seed Users ───────────────────────────────────────────────

const SEED_USERS: User[] = [
  {
    id: "u1", name: "Ama Owusu", username: "ama.owusu",
    avatar: "https://i.pravatar.cc/150?img=47",
    faculty: "Business School", programme: "MBA", workField: "Finance",
    bio: "Finance nerd. Coffee enthusiast. MBA candidate.",
    followersCount: 312, followingCount: 140, postsCount: 47,
    isOnline: true, joinedAt: "2024-09-01",
  },
  {
    id: "u2", name: "Kwame Asante", username: "kwame.asante",
    avatar: "https://i.pravatar.cc/150?img=12",
    faculty: "School of Technology", programme: "MSc Computer Science", workField: "Software Engineering",
    bio: "Building things one commit at a time.",
    followersCount: 205, followingCount: 98, postsCount: 63,
    isOnline: false, joinedAt: "2024-09-03",
  },
  {
    id: "u3", name: "Efua Mensah", username: "efua.mensah",
    avatar: "https://i.pravatar.cc/150?img=32",
    faculty: "Public Administration", programme: "MPA", workField: "Government",
    bio: "Policy. People. Progress.",
    followersCount: 178, followingCount: 220, postsCount: 29,
    isOnline: true, joinedAt: "2024-09-10",
  },
  {
    id: "u4", name: "Kofi Boateng", username: "kofi.boateng",
    avatar: "https://i.pravatar.cc/150?img=53",
    faculty: "Business School", programme: "DBA", workField: "Consulting",
    bio: "Doctoral researcher. Part-time entrepreneur.",
    followersCount: 410, followingCount: 310, postsCount: 88,
    isOnline: false, joinedAt: "2024-08-28",
  },
  {
    id: "u5", name: "Abena Frempong", username: "abena.frempong",
    avatar: "https://i.pravatar.cc/150?img=25",
    faculty: "School of Technology", programme: "MSc Data Science", workField: "Analytics",
    bio: "Data tells stories. I listen.",
    followersCount: 267, followingCount: 155, postsCount: 41,
    isOnline: true, joinedAt: "2024-09-05",
  },
];

// ─── Seed Posts ───────────────────────────────────────────────

const SEED_POSTS: Post[] = [
  {
    id: "p1", authorId: "u2",
    content: "Just finished the System Design midterm. That CAP theorem question was 🔥 — anyone else find it tricky or just me? #SystemDesign",
    timestamp: "2025-03-20T08:30:00Z",
    likes: ["u1", "u3"], dislikes: [], saves: ["u5"], tags: ["SystemDesign"],
    replies: [
      { id: "r1", authorId: "u5", content: "Brutal. I went with eventual consistency and crossed my fingers 😂", timestamp: "2025-03-20T08:45:00Z", likes: ["u2"] },
      { id: "r2", authorId: "u1", content: "I explained partition tolerance first and built from there.", timestamp: "2025-03-20T09:00:00Z", likes: [] },
    ],
  },
  {
    id: "p2", authorId: "u3",
    content: "The library closes at 9pm on weekdays now. Plan your study sessions accordingly! 📚",
    timestamp: "2025-03-19T14:00:00Z",
    likes: ["u1", "u2", "u4", "u5"], dislikes: [], saves: ["u1", "u2"], tags: ["CampusInfo"],
    replies: [
      { id: "r3", authorId: "u4", content: "Thanks for the heads-up! I always end up rushing out last minute.", timestamp: "2025-03-19T14:20:00Z", likes: ["u3"] },
    ],
  },
  {
    id: "p3", authorId: "u1",
    content: "Anyone interested in a study group for Corporate Finance? Café near Block C — Thursday 5pm. DM me! 💼",
    timestamp: "2025-03-18T10:15:00Z",
    likes: ["u4", "u5"], dislikes: [], saves: [], tags: ["StudyGroup", "Finance"],
    replies: [],
  },
  {
    id: "p4", authorId: "u4",


content: "Reminder: The entrepreneurship pitch event is Friday at the main hall. All programmes welcome. Free food guaranteed 🍱 #Startup",
    timestamp: "2025-03-17T09:00:00Z",
    likes: ["u1", "u2", "u3", "u5"], dislikes: [], saves: ["u3"], tags: ["Startup"],
    replies: [
      { id: "r4", authorId: "u2", content: "Free food said everything I needed to hear.", timestamp: "2025-03-17T09:30:00Z", likes: ["u1", "u4"] },
    ],
  },
  {
    id: "p5", authorId: "u5",
    content: "Hot take: Kaggle competitions are the best way to learn ML in practice. Nothing beats a real dataset 🤖 #DataScience",
    timestamp: "2025-03-16T16:45:00Z",
    likes: ["u2"], dislikes: ["u4"], saves: ["u2"], tags: ["DataScience"],
    replies: [
      { id: "r5", authorId: "u2", content: "100% agree. Kaggle forced me to write cleaner pipelines than any assignment did.", timestamp: "2025-03-16T17:00:00Z", likes: ["u5"] },
    ],
  },
];

// ─── Seed Conversations ───────────────────────────────────────

const SEED_CONVERSATIONS: Conversation[] = [
  {
    id: "c1", participantIds: ["u1", "u2"], lastMessageAt: "2025-03-20T10:00:00Z",
    messages: [
      { id: "m1", senderId: "u1", receiverId: "u2", content: "Hey! Are you going to the pitch event on Friday?", timestamp: "2025-03-20T09:50:00Z", read: true },
      { id: "m2", senderId: "u2", receiverId: "u1", content: "Definitely! Heard there's free food 😄", timestamp: "2025-03-20T10:00:00Z", read: false },
    ],
  },
  {
    id: "c2", participantIds: ["u1", "u3"], lastMessageAt: "2025-03-19T16:30:00Z",
    messages: [
      { id: "m3", senderId: "u3", receiverId: "u1", content: "Are you joining the Corporate Finance study group?", timestamp: "2025-03-19T16:00:00Z", read: true },
      { id: "m4", senderId: "u1", receiverId: "u3", content: "Yes! Thursday 5pm at the café. See you there!", timestamp: "2025-03-19T16:30:00Z", read: true },
    ],
  },
  {
    id: "c3", participantIds: ["u1", "u5"], lastMessageAt: "2025-03-18T11:00:00Z",
    messages: [
      { id: "m5", senderId: "u5", receiverId: "u1", content: "Can you share your notes from yesterday's lecture?", timestamp: "2025-03-18T11:00:00Z", read: false },
    ],
  },
];

// ─── Seed Locations ───────────────────────────────────────────

const SEED_LOCATIONS: Location[] = [
  { id: "l1", name: "GIMPA Library", category: "library", description: "Main campus library with quiet study rooms and research databases.", lat: 5.6502, lng: -0.1908, distance: "3 min walk" },
  { id: "l2", name: "Block C Café", category: "cafe", description: "Popular student café near the lecture blocks. Great coffee.", lat: 5.6498, lng: -0.1912, distance: "5 min walk" },
  { id: "l3", name: "Campus Gym", category: "lounge", description: "Fully equipped gym open to all students and staff.", lat: 5.6510, lng: -0.1900, distance: "8 min walk" },
  { id: "l4", name: "Main Lecture Hall", category: "lecture", description: "Large auditorium used for plenary sessions and major events.", lat: 5.6495, lng: -0.1920, distance: "2 min walk" },
  { id: "l5", name: "Admin Block", category: "admin", description: "Student services, finance office, and academic registry.", lat: 5.6488, lng: -0.1915, distance: "6 min walk" },
];

// ─── Context ──────────────────────────────────────────────────

const MockDataContext = createContext<MockDataContextType | null>(null);

export const MockDataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [users] = useState<User[]>(SEED_USERS);
  const [posts, setPosts] = useState<Post[]>(SEED_POSTS);
  const [conversations, setConversations] = useState<Conversation[]>(SEED_CONVERSATIONS);
  const [locations] = useState<Location[]>(SEED_LOCATIONS);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUserId, setCurrentUserId] = useState<string>("u1");

  const currentUser = users.find((u) => u.id === currentUserId) ?? users[0];

  const login = (userId: string) => {
    setCurrentUserId(userId);
    setIsLoggedIn(true);
  };

  const logout = () => setIsLoggedIn(false);


const toggleLike = (postId: string) => {
  setPosts((prev: Post[]) =>
    prev.map((p) => {
      if (p.id !== postId) return p;
      const liked = p.likes.includes(currentUser.id);
      return {
        ...p,
        likes: liked ? p.likes.filter((id) => id !== currentUser.id) : [...p.likes, currentUser.id],
        dislikes: p.dislikes.filter((id) => id !== currentUser.id),
      };
    })
  );
};

  const toggleDislike = (postId: string) => {
    setPosts((prev: Post[]) =>
      prev.map((p) => {
        if (p.id !== postId) return p;
        const disliked = p.dislikes.includes(currentUser.id);
        return {
          ...p,
          dislikes: disliked ? p.dislikes.filter((id) => id !== currentUser.id) : [...p.dislikes, currentUser.id],
          likes: p.likes.filter((id) => id !== currentUser.id),
        };
      })
    );
  };

  const toggleSave = (postId: string) => {
    setPosts((prev: Post[]) =>
      prev.map((p) => {
        if (p.id !== postId) return p;
        const saved = p.saves.includes(currentUser.id);
        return {
          ...p,
          saves: saved ? p.saves.filter((id) => id !== currentUser.id) : [...p.saves, currentUser.id],
        };
      })
    );
  };

  const addPost = (content: string) => {
    const newPost: Post = {
      id: `p${Date.now()}`,
      authorId: currentUser.id,
      content,
      timestamp: new Date().toISOString(),
      likes: [], dislikes: [], saves: [], replies: [],
    };
    setPosts((prev: Post[]) => [newPost, ...prev]);
  };

  const addReply = (postId: string, content: string) => {
    setPosts((prev: Post[]) =>
      prev.map((p) => {
        if (p.id !== postId) return p;
        const reply = {
          id: `r${Date.now()}`,
          authorId: currentUser.id,
          content,
          timestamp: new Date().toISOString(),
          likes: [],
        };
        return { ...p, replies: [...p.replies, reply] };
      })
    );
  };

  const sendMessage = (receiverId: string, content: string) => {
    const existingConvo = conversations.find(
      (c) => c.participantIds.includes(currentUser.id) && c.participantIds.includes(receiverId)
    );
    const newMessage = {
      id: `m${Date.now()}`,
      senderId: currentUser.id,
      receiverId,
      content,
      timestamp: new Date().toISOString(),
      read: false,
    };
    if (existingConvo) {
      setConversations((prev) =>
        prev.map((c) =>
          c.id === existingConvo.id
            ? { ...c, messages: [...c.messages, newMessage], lastMessageAt: newMessage.timestamp }
            : c
        )
      );
    } else {
      const newConvo: Conversation = {
        id: `c${Date.now()}`,
        participantIds: [currentUser.id, receiverId],
        messages: [newMessage],
        lastMessageAt: newMessage.timestamp,
      };
      setConversations((prev) => [newConvo, ...prev]);
    }
  };

  return (
    <MockDataContext.Provider value={{
      users, posts, conversations, locations,
      currentUser, isLoggedIn,
      login, logout,
      toggleLike, toggleDislike, toggleSave,
      addPost, addReply, sendMessage,
    }}>
      {children}
    </MockDataContext.Provider>
  );
};

// ─── Hook ─────────────────────────────────────────────────────

export const useMockData = (): MockDataContextType => {
  const ctx = useContext(MockDataContext);
  if (!ctx) throw new Error("useMockData must be used inside <MockDataProvider>");
  return ctx;
};