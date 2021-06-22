import { IconButton } from '@chakra-ui/button';
import { DeleteIcon, EditIcon } from '@chakra-ui/icons';
import { Box, Flex, Heading, Text } from '@chakra-ui/layout';
import { useHistory } from 'react-router';
import { ICommentProps } from '../../interface/comment';

const CommentList = ({ comments, postId }: ICommentProps) => {
  const history = useHistory();
  if (!comments || !postId) return <></>;
  return (
    <Box>
      {comments.map((comment) => (
        <Box
          key={comment.id}
          padding="5px 15px"
          marginTop="2"
          borderRadius="10px"
          boxShadow="base"
          bgColor="whiteAlpha.300"
        >
          <Heading
            fontSize="md"
            bgColor={'#' + comment.username}
            marginY="1"
            color="white"
            padding="5px 10px"
            borderRadius="10px"
            display="inline-flex"
          >
            {comment.username}
          </Heading>
          <Text marginY="1">{comment.content}</Text>
          <Flex alignItems="center">
            <Heading fontSize="xs" marginY="1">
              {new Date(comment.createdAt).toLocaleString()}
            </Heading>
            {!comment.deletedAt && (
              <>
                <IconButton
                  aria-label="Edit Comment"
                  icon={<EditIcon />}
                  variant="outline"
                  size="xs"
                  marginLeft="8px"
                  bgColor="orange.400"
                  color="white"
                  onClick={(e: any) => {
                    e.preventDefault();
                    history.push(`/comments/edit/${comment.id}`, {
                      postId,
                    });
                  }}
                />
                <IconButton
                  aria-label="Delete Comment"
                  icon={<DeleteIcon />}
                  variant="outline"
                  size="xs"
                  marginLeft="8px"
                  bgColor="red.400"
                  color="white"
                  onClick={(e) => {
                    e.preventDefault();
                    history.push(`/comments/delete/${comment.id}`, {
                      postId,
                    });
                  }}
                />
              </>
            )}
          </Flex>
        </Box>
      ))}
    </Box>
  );
};

export default CommentList;
