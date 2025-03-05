export interface UserProfile {
  id: string;
  name: string;
  profileImage: string;
}

export interface Idea {
  id: string;
  title: string;
  description: string;
  upvotes: number;
  downvotes: number;
  priority: "High" | "Medium" | "Low";
  author: UserProfile;
  createdAt: string;
  updatedAt: string;
}

export interface VoteCollection {
  [postId: string]: {
    upvoted: boolean;
    downvoted: boolean;
  };
}
