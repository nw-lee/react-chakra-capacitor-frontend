import { IComment, IPost } from './post';

export interface ICommentProps {
  comments?: IComment[];
  postId: string;
}

export interface ICommentCreateProps {
  postId: string;
  setPost: React.Dispatch<React.SetStateAction<IPost | null>>;
}
