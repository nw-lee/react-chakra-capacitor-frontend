import { Browser } from '@capacitor/browser';
import { Button } from '@chakra-ui/button';
import { ExternalLinkIcon } from '@chakra-ui/icons';
import { Box, Divider, Flex, Heading, Text } from '@chakra-ui/layout';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { IPost } from '../../interface/post';
import CommentCreate from '../comment/Create';
import CommentList from '../comment/List';
import ItemHeader from './Header';

const PostItem = (props: any) => {
  const [post, setPost] = useState<IPost | null>(null);
  const [id, setId] = useState('');

  useEffect(() => {
    setId(props.match.params.id);
  }, [props]);

  useEffect(() => {
    if (!id) return;
    axios
      .get(`${process.env.REACT_APP_API_HOST}/posts/id/${id}`)
      .then((resp) => resp.data)
      .then((data) => setPost(data.post));
  }, [id]);

  if (!post) return <h1>Waiting...</h1>;
  return (
    <Box margin="5px 0" padding="10px 0">
      <ItemHeader post={post} />
      <Text margin="10px 0 20px 0" lineHeight="160%">
        {post.desc}...
      </Text>
      {post.content && (
        <Text marginY="20px" lineHeight="160%">
          {post.content}...
        </Text>
      )}
      <Flex>
        <Button
          bgColor="red"
          variant="outline"
          color="white"
          size="sm"
          rightIcon={<ExternalLinkIcon />}
          onClick={(e) => {
            e.preventDefault();
            const useHttps = !post.link.includes('https')
              ? post.link.replace('http', 'https')
              : post.link;
            Browser.open({
              url: useHttps,
            });
          }}
        >
          참조
        </Button>
      </Flex>
      <Heading fontSize="xs" marginY="2" fontWeight="thin">
        {post.author}
      </Heading>
      <Divider marginY="3" />
      <CommentCreate setPost={setPost} postId={id} />
      <CommentList comments={post.comments} postId={id} />
    </Box>
  );
};

export default PostItem;
