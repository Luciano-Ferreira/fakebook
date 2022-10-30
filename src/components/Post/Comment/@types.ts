interface Author {
  name?: string;
  role?: string;
  avatar?: string;
}

export interface IComment {
  id?: string;
  author?: Author | null;
  createdAt?: Date;
  content?: string;
  likes?: number | null;
  onDelete: (id: string) => void;
}
