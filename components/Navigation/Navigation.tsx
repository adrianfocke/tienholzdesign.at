import {
  Flex,
  Container,
  Box,
} from '@radix-ui/themes';
import type { NavigationQuery } from '../../tina/__generated__/types';
import Text from '../Text/Text';
import NextImage from 'next/image';
import Link from 'next/link';
import config from '../../utils/config';
import { tinaField } from 'tinacms/dist/react';

export default function Navigation(props: NavigationQuery['navigation']) {
  return (
    <Container
      py={config.layout.padding}
      px={{
        initial: config.layout.padding,
        md: '0',
      }}
      mb={config.layout.padding
      }
      style={{
        borderBottom: '1px solid var(--gray-12)',
      }}
    >
      <Flex
        justify={"between"}
        gap={{ initial: '0', md: config.layout.padding }}
      >
        <Box
          width={{
            initial: "auto",
            md: "calc(32% + 7px)",
          }}
        >
          <Link
            href={'/'}
            className='no-line-height'
            data-tina-field={tinaField(props, 'logo')}
          >
            {props.logo?.logoImage ? (
              <NextImage
                src={props.logo.logoImage}
                alt='Logo'
                width={props.logo.width ?? 40}
                height={props.logo.height ?? 40}
                style={{ margin: 0 }}
                loading='eager'
              />
            ) : (
              <Text {...(props.logo as any)} link='' />
            )}
          </Link>
        </Box>

        <Flex
          direction={{
            initial: 'column',
            md: 'row',
          }}
          justify={'between'}
          align={'center'}
          gap={config.layout.padding}
          flexGrow={{
            initial: "0",
            md: "1",
          }}
        >
          {props.links?.map((link, index) => {
            return <Text key={index} {...(link as any)} />;
          })}
        </Flex>
      </Flex>
    </Container>
  );
}
