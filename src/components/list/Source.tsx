import { Button } from '@chakra-ui/button';
import { AddIcon } from '@chakra-ui/icons';
import { Box, Center } from '@chakra-ui/layout';
import axios from 'axios';
import { useCallback, useEffect, useState } from 'react';
import { IPost } from '../../interface/post';
import ListComponent from './List';

const SourceList = (props: any) => {
  const [posts, setPosts] = useState<IPost[]>([]);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [sourceId, setSourceId] = useState(props.match.params.id);
  const [page, setPage] = useState(1);
  const [isMore, setMore] = useState(true);

  useEffect(() => {
    fetchPosts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchPosts = useCallback(async () => {
    if (sourceId < 0) return;
    await axios
      .get(`${process.env.REACT_APP_API_HOST}/sources/${sourceId}/${page}`)
      .then((resp) => resp.data)
      .then((data) => {
        const newPosts = data.posts;
        if (!newPosts.length) {
          setMore(false);
          return;
        }
        setPosts([...posts, ...newPosts]);
        setPage(page + 1);
      });
  }, [page, posts, sourceId]);

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

export default SourceList;
