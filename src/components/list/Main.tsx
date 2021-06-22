import { Button } from '@chakra-ui/button';
import { AddIcon } from '@chakra-ui/icons';
import { Box, Center } from '@chakra-ui/layout';
import axios from 'axios';
import { useCallback, useEffect, useState } from 'react';
import { IPost } from '../../interface/post';
import ListComponent from './List';

const MainList = () => {
  const [posts, setPosts] = useState<IPost[]>([]);
  const [page, setPage] = useState(1);
  const [isMore, setMore] = useState(true);

  const fetchPosts = useCallback(async () => {
    await axios
      .get(`${process.env.REACT_APP_API_HOST}/posts/${page}`)
      .then((resp) => resp.data)
      .then((data) => {
        const newPosts = data.posts;
        // console.log('Data Fetched');
        if (!newPosts.length) {
          setMore(true);
          return;
        }
        // console.log(newPosts.length);
        setPosts([...posts, ...newPosts]);
        setPage(page + 1);
      })
      .catch((err) => console.log(err));
  }, [page, posts]);

  useEffect(() => {
    fetchPosts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!posts) return <h1>Waiting...</h1>;
  return (
    <Box>
      <ListComponent posts={posts} />
      <Center>
        {isMore && (
          <Button
            leftIcon={<AddIcon />}
            variant="outline"
            colorScheme="red"
            marginY="20px"
            onClick={(e) => {
              e.preventDefault();
              fetchPosts();
            }}
          >
            More Posts
          </Button>
        )}
      </Center>
    </Box>
  );
};

export default MainList;
