import { IconButton } from '@chakra-ui/button';
import { ArrowBackIcon } from '@chakra-ui/icons';
import { Image } from '@chakra-ui/image';
import { Flex, Text } from '@chakra-ui/layout';
import { Link, useHistory } from 'react-router-dom';
import { IHeaderMain } from '../../interface/header';

const HeaderMain = ({ back }: IHeaderMain) => {
  const history = useHistory();
  return (
    <Flex justifyContent="space-between" alignItems="center">
      <Flex justifyContent="start" alignItems="center">
        {back && (
          <IconButton
            aria-label="go-back"
            icon={<ArrowBackIcon />}
            height="24px"
            bgColor="transparent"
            onClick={(e) => {
              e.preventDefault();
              history.goBack();
            }}
          />
        )}
        <Link to="/" style={{ display: 'flex', alignItems: 'center' }}>
          <Text
            fontSize="1xl"
            color="blackAlpha.700"
            fontWeight="semibold"
            marginRight="2"
            whiteSpace="nowrap"
          >
            과학 신문 모음
          </Text>
          <Image src="/icon.png" alt="App-Logo" boxSize="6" />
        </Link>
      </Flex>
    </Flex>
  );
};

export default HeaderMain;
