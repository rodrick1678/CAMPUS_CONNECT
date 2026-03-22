export interface User {
  id: string;
  name: string;
  handle: string;
  avatarUrl: string;
  bio?: string;
}

export interface Post {
  id: string;
  authorId: string;
  content: string;
  createdAt: string;
  likes: number;
  comments: number;
}

export interface Message {
  id: string;
  senderId: string;
  receiverId: string;
  text: string;
  timestamp: string;
}
