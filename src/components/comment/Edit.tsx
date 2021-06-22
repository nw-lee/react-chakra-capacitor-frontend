import { Toast } from '@capacitor/toast';
import { Button } from '@chakra-ui/button';
import { EditIcon } from '@chakra-ui/icons';
import { Input } from '@chakra-ui/input';
import { Box, Flex, Heading, Text } from '@chakra-ui/layout';
import { Textarea } from '@chakra-ui/textarea';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import useInput from '../../hooks/use.input';
import { IComment } from '../../interface/post';

const CommentEdit = (props: any) => {
  const [commentId, setCommentId] = useState('');
  const [_comment, setComment] = useState<IComment | null>(null);
  const [postId, setPostId] = useState('');
  const history = useHistory();
  const { clearValue: clearComment, state: comment } = useInput();
  const { clearValue: clearPassword, state: password } = useInput();
  useEffect(() => {
    setCommentId(props.match.params.id);
    setPostId(props.location.state.postId);
  }, [props]);
  useEffect(() => {
    if (!commentId) return;
    axios
      .get(`${process.env.REACT_APP_API_HOST}/comments/id/${commentId}`)
      .then((resp) => resp.data)
      .then((data) => setComment(data.comment));
  }, [commentId]);

  useEffect(() => {
    if (!_comment) return;
    if (_comment.deletedAt) {
      Toast.show({
        text: '잘못된 접근입니다.',
      });
      history.push('/');
    }
  }, [_comment, history]);

  const handleSubmit = (e: any) => {
    e.preventDefault();
    if (!postId || !commentId) return;
    if (comment.value.length < 10 || password.value.length < 8) {
      return;
    }
    axios
      .put(`${process.env.REACT_APP_API_HOST}/comments/id/${commentId}`, {
        content: comment.value,
        password: password.value,
      })
      .then((resp) => resp.data)
      .then((data) => {
        // console.log(data.comment);
        history.push(`/id/${postId}`);
      })
      .catch((err) => {
        // console.log(err);
        history.replace(`/id/${postId}`);
      })
      .finally(() => {
        clearComment();
        clearPassword();
      });
  };

  if (!_comment) return <Text fontSize="lg">Waiting...</Text>;
  return (
    <Box marginY="10px" boxShadow="2xl" padding="4" borderRadius="10px">
      <Heading fontSize="2xl" fontWeight="bold">
        댓글 수정
      </Heading>
      <form onSubmit={handleSubmit}>
        <Textarea
          marginY="4"
          rows={4}
          placeholder={_comment?.content}
          {...comment}
          minLength={10}
        />
        <Flex marginTop="10px">
          <Input type="password" {...password} minLength={8} />
          <Button
            whiteSpace="nowrap"
            colorScheme="red"
            type="submit"
            marginLeft="4"
            rightIcon={<EditIcon />}
          >
            수정
          </Button>
        </Flex>
      </form>
    </Box>
  );
};

export default CommentEdit;
