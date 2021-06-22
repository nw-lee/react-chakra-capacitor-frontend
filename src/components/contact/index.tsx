import { Clipboard } from '@capacitor/clipboard';
import { Toast } from '@capacitor/toast';
import { Button } from '@chakra-ui/button';
import { EmailIcon, ExternalLinkIcon } from '@chakra-ui/icons';
import { Image } from '@chakra-ui/image';
import {
  Box,
  Divider,
  Flex,
  Heading,
  ListItem,
  OrderedList,
  Text,
} from '@chakra-ui/layout';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { ISource } from '../../interface/post';

const ContactPage = () => {
  const [sources, setSources] = useState<ISource[]>([]);
  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_HOST}/sources/list`)
      .then((resp) => resp.data)
      .then((data) => {
        setSources(data.sources);
      })
      .catch((err) => console.log(err));
  }, []);
  return (
    <Box paddingBottom="4">
      <Heading fontSize="3xl" marginY="3" display="flex" alignItems="center">
        과학 뉴스 모음
        <Image src="/icon.png" alt="App-Logo" boxSize="12" marginX="2" />
      </Heading>
      <Text marginY="1">
        환경, 에너지, 기술, 연구, IT 등과 같은 과학 관련 신문 기사를 볼 수
        있습니다.
      </Text>
      <Text marginY="1">
        본 앱은 요약된 내용만 존재하며, 전체적인 기사 내용은 각 페이지의 참조
        버튼을 통해 볼 수 있습니다.
      </Text>
      <Flex alignItems="center" marginBottom="1">
        <Heading fontSize="sm" marginRight="2">
          예시
        </Heading>
        <Button
          bgColor="red"
          variant="outline"
          color="white"
          size="sm"
          rightIcon={<ExternalLinkIcon />}
          onClick={(e) => {
            e.preventDefault();
            Toast.show({
              text: '이 버튼을 누르면 외부 링크로 이동합니다.',
            });
          }}
        >
          참조
        </Button>
      </Flex>
      <Text fontSize="xs">
        이 버튼을 누르면 웹 브라우저를 통해 외부 링크로 이동됩니다.
      </Text>
      <Text marginY="2">
        앱에 대하여 문의사항이나 제안사항, 혹은 문제점이 있다면 메일로 연락
        바랍니다.
      </Text>
      <Text marginY="2" color="red" fontWeight="semibold" fontSize="sm">
        앱을 제작하는데 있어 어떠한 정치적 편향성도 지니지 않았음을 밝힙니다.
      </Text>
      <Button
        rightIcon={<EmailIcon />}
        bgColor="blue.600"
        size="md"
        color="white"
        onClick={(e) => {
          e.preventDefault();
          Clipboard.write({
            url: `${process.env.REACT_APP_EMAIL_LINK}`,
          })
            .then(() => {
              Toast.show({
                text: '이메일 주소가 복사되었습니다.',
              });
            })
            .catch(() => {
              Toast.show({
                text: '나중에 다시 시도해주세요.',
              });
            });
        }}
      >
        {process.env.REACT_APP_EMAIL_LINK}
      </Button>
      <Divider marginY="3" />
      <Heading color="blackAlpha.500" fontSize="md" marginY="1">
        신문 기사 출처
      </Heading>
      <OrderedList marginY="1">
        {sources.map((source) => (
          <ListItem
            key={source.source}
            fontSize="sm"
            color="blue.700"
            marginTop="1"
          >
            {source.source}
          </ListItem>
        ))}
      </OrderedList>
    </Box>
  );
};

export default ContactPage;
