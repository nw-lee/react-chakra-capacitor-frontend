import { Button } from '@chakra-ui/button';
import { FormControl } from '@chakra-ui/form-control';
import { Search2Icon } from '@chakra-ui/icons';
import { Input } from '@chakra-ui/input';
import { Box } from '@chakra-ui/layout';
import { useHistory } from 'react-router';
import useInput from '../../hooks/use.input';
import { ISearchInput } from '../../interface/header';

const SearchInput = ({ search, path, setSearch, setPath }: ISearchInput) => {
  const history = useHistory();
  const { clearValue, state } = useInput();
  return (
    <Box marginTop="2">
      <form
        style={{ width: '100%' }}
        onSubmit={(e) => {
          e.preventDefault();
          if (!search) return;
          history.push(`/search/${state.value}`);
          clearValue();
          setSearch(false);
          setPath!(false);
          return;
        }}
      >
        <FormControl id="search" display="flex" alignItems="center">
          <Input
            type="text"
            minLength={2}
            {...state}
            width="100%"
            bgColor="whiteAlpha.600"
            size="sm"
            marginRight="2"
            borderRadius="lg"
          />
          <Button
            rightIcon={<Search2Icon />}
            colorScheme="messenger"
            size="sm"
            type="submit"
          >
            검색
          </Button>
        </FormControl>
      </form>
    </Box>
  );
};

export default SearchInput;
