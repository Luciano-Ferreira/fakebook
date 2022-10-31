
interface Customer {
  id?: string;
  avatar?: string;
  name?: string;
  role?: string;
}


interface Author {
  id?: string;
  avatar?: string;
  name?: string;
  role?: string;
}

interface Comment {
  id?: string;
  author?: Author | null;
  createdAt?: Date;
  content?: string;
  likes?: number | null;
}

export interface IPost {
  id?: string;
  customer?: Customer | null;
  createdAt?: Date;
  content?: string;
  comments?: Comment[];
}

