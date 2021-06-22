import { Button } from '@chakra-ui/button';
import { AddIcon } from '@chakra-ui/icons';
import { Box, Center } from '@chakra-ui/layout';
import axios from 'axios';
import { useCallback, useEffect, useState } from 'react';
import { IPost } from '../../interface/post';
import ListComponent from './List';

const SearchList = (props: any) => {
  const [posts, setPosts] = useState<IPost[]>([]);
  const [page, setPage] = useState(1);
  const [keyword, setKeyword] = useState('');
  const [isMore, setMore] = useState(true);

  useEffect(() => {
    setKeyword(props.match.params.keyword);
  }, [props]);

  const fetchPosts = useCallback(
    async (keyword: string) => {
      if (!keyword) return;
      // console.log(page);
      await axios
        .get(
          `${process.env.REACT_APP_API_HOST}/posts/search/${keyword}/${page}`,
        )
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
    },
    [page, posts],
  );

  useEffect(() => {
    fetchPosts(keyword);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [keyword]);
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
              fetchPosts(keyword);
            }}
          >
            More Posts
          </Button>
        )}
      </Center>
    </Box>
  );
};

export default SearchList;
