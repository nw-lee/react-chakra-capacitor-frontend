import { IconButton } from '@chakra-ui/button';
import { CloseIcon, InfoIcon, RepeatIcon, SearchIcon } from '@chakra-ui/icons';
import { Box, Heading, HStack } from '@chakra-ui/layout';
import { Link, useHistory } from 'react-router-dom';
import { ISearchInput } from '../../interface/header';

const HeaderSide = ({ search, path, setSearch }: ISearchInput) => {
  const history = useHistory();

  return (
    <Box height="full">
      <HStack spacing="1" color="blue.900">
        <Heading fontSize="sm">
          <Link to="/">메인</Link>
        </Heading>
        <IconButton
          aria-label="info-icon"
          icon={<InfoIcon />}
          variant="ghost"
          size="sm"
          onClick={(e) => {
            e.preventDefault();
            history.push('/contact');
          }}
        />
        <IconButton
          aria-label="refresh-icon"
          icon={<RepeatIcon />}
          onClick={(e) => {
            e.preventDefault();
            history.go(0);
          }}
          variant="ghost"
          size="sm"
        />
        {path && (
          <IconButton
            aria-label="search-icon"
            icon={!search ? <SearchIcon /> : <CloseIcon />}
            variant="ghost"
            size="sm"
            onClick={(e) => {
              e.preventDefault();
              setSearch(!search ? true : false);
            }}
          />
        )}
      </HStack>
    </Box>
  );
};

export default HeaderSide;
