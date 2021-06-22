import { Box, Flex } from '@chakra-ui/layout';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router';
import HeaderMain from './Header';
import SearchInput from './Search';
import HeaderSide from './Side';

const Header = () => {
  const location = useLocation();
  const [path, setPath] = useState(false);
  const [search, setSearch] = useState(false);
  const [back, setBack] = useState(false);

  useEffect(() => {
    if (location.pathname === '/') {
      setPath(true);
      setBack(false);
    } else if (!location.pathname.includes('search')) {
      setPath(true);
      setBack(true);
    } else {
      setPath(false);
      setBack(true);
    }
  }, [location]);

  return (
    <Box
      bg="#F0FFF0"
      paddingX="6"
      paddingY="3"
      position="fixed"
      zIndex="10"
      top={0}
      left={0}
      right={0}
    >
      <Flex justifyContent="space-between" alignItems="center">
        <HeaderMain back={back} />
        <HeaderSide search={search} path={path} setSearch={setSearch} />
      </Flex>
      {search && (
        <SearchInput
          search={search}
          path={path}
          setPath={setPath}
          setSearch={setSearch}
        />
      )}
    </Box>
  );
};

export default Header;
