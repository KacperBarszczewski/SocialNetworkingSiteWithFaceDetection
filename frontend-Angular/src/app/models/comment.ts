export interface Comment {
  _id: string;
  user_id: {
    _id: string;
    name: string;
    email: string;
    isAdmin: boolean;
  };
  text: string;
  post_id: string;
  isVisible: boolean;
}
