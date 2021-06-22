import { Button } from '@chakra-ui/button';
import { CheckIcon } from '@chakra-ui/icons';
import { Input } from '@chakra-ui/input';
import { Divider, Flex, Heading } from '@chakra-ui/layout';
import { Textarea } from '@chakra-ui/textarea';
import axios from 'axios';
import useInput from '../../hooks/use.input';
import { ICommentCreateProps } from '../../interface/comment';

const CommentCreate = ({ setPost, postId }: ICommentCreateProps) => {
  const { clearValue: clearComment, state: comment } = useInput();
  const { clearValue: clearPassword, state: password } = useInput();
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (comment.value.length < 10 || password.value.length < 8) {
      return;
    }
    axios
      .post(`${process.env.REACT_APP_API_HOST}/comments`, {
        content: comment.value,
        password: password.value,
        postId,
      })
      .then((resp) => resp.data)
      .then((data) => {
        // console.log(data);
        clearComment();
        clearPassword();
      })
      .then(() => {
        axios
          .get(`${process.env.REACT_APP_API_HOST}/posts/id/${postId}`)
          .then((resp) => resp.data)
          .then((data) => setPost(data.post));
      });
  };
  return (
    <>
      <Heading color="red" margin="4px 0 6px 0" fontSize="sm">
        댓글은 10자 이상, 비밀번호는 8자 이상 작성해주세요.
      </Heading>
      <form onSubmit={handleSubmit}>
        <Textarea {...comment} rows={4} minLength={10} />
        <Flex marginTop="1" width="100%">
          <Input type="password" {...password} minLength={8} />
          <Button
            bgColor="blue.400"
            color="white"
            rightIcon={<CheckIcon />}
            type="submit"
            marginLeft="8px"
            whiteSpace="nowrap"
          >
            작성
          </Button>
        </Flex>
      </form>
      <Divider marginY="3" />
    </>
  );
};

export default CommentCreate;
