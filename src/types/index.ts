

export interface User {
  id: string;
  name: string;
  username: string;
  avatar: string;
  faculty: string;
  programme: string;
  workField: string;
  bio: string;
  followersCount: number;
  followingCount: number;
  postsCount: number;
  isOnline: boolean;
  joinedAt: string;
}

export interface Reply {
  id: string;
  authorId: string;
  content: string;
  timestamp: string;
  likes: string[];
}

export interface Post {
  id: string;
  authorId: string;
  content: string;
  timestamp: string;
  likes: string[];
  dislikes: string[];
  saves: string[];
  replies: Reply[];
  tags?: string[];
  imageUrl?: string;
}

export interface Message {
  id: string;
  senderId: string;
  receiverId: string;
  content: string;
  timestamp: string;
  read: boolean;
}

export interface Conversation {
  id: string;
  participantIds: string[];
  messages: Message[];
  lastMessageAt: string;
}

export interface Location {
  id: string;
  name: string;
  category: "library" | "cafe" | "lounge" | "lecture" | "admin" | "other";
  description: string;
  lat: number;
  lng: number;
  imageUrl?: string;
  distance?: string;
}

export interface MockDataContextType {
  users: User[];
  posts: Post[];
  conversations: Conversation[];
  locations: Location[];
  currentUser: User;
  isLoggedIn: boolean;
  login: (userId: string) => void;
  logout: () => void;
  toggleLike: (postId: string) => void;
  toggleDislike: (postId: string) => void;
  toggleSave: (postId: string) => void;
  addPost: (content: string) => void;
  addReply: (postId: string, content: string) => void;
  sendMessage: (receiverId: string, content: string) => void;
}