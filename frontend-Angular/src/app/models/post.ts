import { Comment } from './comment';
export interface Post {
  _id: string;
  user_id: {
    _id: string;
    name: string;
    email: string;
    isAdmin: boolean;
  };
  image: string;
  description: string;
  isVisible: boolean;
  comments: Comment[];
  date: string;
}
