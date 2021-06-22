import { Box, Center, Divider, Flex, Heading, Text } from '@chakra-ui/layout';
import { Link } from 'react-router-dom';
import { IPost } from '../../interface/post';

const ListComponent = ({ posts }: { posts: IPost[] }) => {
  return (
    <>
      {posts.map((post) => (
        <Box
          key={post.link}
          margin="4px 0 8px"
          padding="4px 2px 8px"
          borderBottom="1px solid lightgray"
        >
          <Heading fontSize="md" marginY="1" color="blue.700">
            <Link to={`/id/${post.id}`}>{post.title}</Link>
          </Heading>
          <Flex justifyContent="flex-start" marginY="0">
            <Text fontSize="xs" whiteSpace="nowrap">
              {new Date(post.publishedAt).toLocaleString()}
            </Text>
            <Center height="20px">
              <Divider
                orientation="vertical"
                colorScheme="blackAlpha"
                margin="0 4px"
              />
            </Center>
            <Text fontSize="xs" whiteSpace="nowrap">
              <Link to={`/source/${post.sourceId}`}>{post.Source.source}</Link>
            </Text>
            <Center height="20px">
              <Divider
                orientation="vertical"
                colorScheme="blackAlpha"
                margin="0 4px"
              />
            </Center>
            <Text fontSize="xs" whiteSpace="nowrap">
              댓글 {post._count.comments}개
            </Text>
          </Flex>
        </Box>
      ))}
    </>
  );
};

export default ListComponent;
