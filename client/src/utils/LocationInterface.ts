export interface ILocation {
  _id: string;
  location: string;
  image: string;
  description: string;
  createdAt: string;
  updatedAt: string;
  author: {
    id: string;
    username: string;
  };
  comment: [IComment];
}

export interface IComment {
  author: {
    id: string;
    username: String;
    avatar: String;
  };
  text: string;
  avatar: string;
  _id: string;
}
