import { Button } from '@chakra-ui/button';
import { DeleteIcon } from '@chakra-ui/icons';
import { Input } from '@chakra-ui/input';
import { Box, Flex, Heading } from '@chakra-ui/layout';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import useInput from '../../hooks/use.input';

const CommentDelete = (props: any) => {
  const [commentId, setCommentId] = useState('');
  const [postId, setPostId] = useState('');
  const history = useHistory();
  const { clearValue: clearPassword, state: password } = useInput();
  useEffect(() => {
    setCommentId(props.match.params.id);
    setPostId(props.location.state.postId);
  }, [props]);
  const handleSubmit = (e: any) => {
    e.preventDefault();
    if (!commentId || !postId) return;
    if (password.value.length < 8) {
      return;
    }
    axios
      .delete(`${process.env.REACT_APP_API_HOST}/comments/id/${commentId}`, {
        data: {
          password: password.value,
        },
      })
      .then((resp) => resp.data)
      .then((data) => {
        // console.log(data.comment);
        history.push(`/id/${postId}`);
      })
      .catch((err) => {
        // console.error(err);
        history.replace(`/id/${postId}`);
      })
      .finally(() => clearPassword());
  };
  return (
    <Box marginY="10px" boxShadow="2xl" padding="4" borderRadius="10px">
      <Heading fontSize="2xl">댓글 삭제</Heading>
      <form onSubmit={handleSubmit}>
        <Flex marginY="4">
          <Input type="password" {...password} minLength={8} />
          <Button
            whiteSpace="nowrap"
            colorScheme="red"
            type="submit"
            marginLeft="4"
            rightIcon={<DeleteIcon />}
          >
            수정
          </Button>
        </Flex>
      </form>
    </Box>
  );
};

export default CommentDelete;
