export interface Post {
  _id: string;
  user_id: {
    _id: string;
    name: string;
    email: string;
    isAdmin: boolean;
  };
  description: string;
  isVisible: boolean;
  comments: Comment[];
  date: string;
}
