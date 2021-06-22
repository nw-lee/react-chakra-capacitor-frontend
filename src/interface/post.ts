export interface ISource {
  id: number;
  source: string;
  createdAt: Date;
  updatedAt: Date | null;
  deletedAt: Date | null;
}

export interface IComment {
  id: number;
  username: string;
  content: string;
  createdAt: Date;
  deletedAt: Date | null;
  post_id: number | null;
}

export interface IPost {
  id: number;
  title: string;
  link: string;
  author: string;
  content: string | null;
  createdAt: Date;
  updatedAt: Date | null;
  deletedAt: Date | null;
  publishedAt: Date;
  desc: string | null;
  sourceId: number | null;
  Source: ISource;
  comments?: IComment[];
  _count: {
    comments: number;
  };
}
