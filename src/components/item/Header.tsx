import { Center, Divider, Flex, Heading, Text } from '@chakra-ui/layout';
import { Link } from 'react-router-dom';
import { IPost } from '../../interface/post';

const ItemHeader = ({ post }: { post: IPost }) => {
  return (
    <>
      <Heading
        display="inline-flex"
        bgColor="blackAlpha.800"
        color="white"
        padding="5px 10px"
        borderRadius="10px"
        marginY="4px"
        fontSize="lg"
      >
        <Link to={`/source/${post.sourceId}`}>{post.Source.source}</Link>
      </Heading>
      <Heading fontSize="2xl" marginY="2">
        {post.title}
      </Heading>
      <Flex justifyContent="start" marginY="4">
        <Text fontSize="xs" whiteSpace="nowrap">
          작성 날짜 : {new Date(post.publishedAt).toLocaleString()}
        </Text>
        <Center height="20px" marginX="2">
          <Divider orientation="vertical" />
        </Center>
        <Text fontSize="xs" whiteSpace="nowrap">
          {post.Source.source}
        </Text>
      </Flex>
    </>
  );
};

export default ItemHeader;
