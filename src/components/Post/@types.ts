
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
  content?: any;
  likes?: number | null;
}

export interface IPost {
  customer?: Customer | null;
  createdAt?: Date;
  content?: string;
  comments?: Comment[];
}

