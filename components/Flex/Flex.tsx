import { Box, Container, Flex } from '@radix-ui/themes';
import { tinaField, useEditState } from 'tinacms/dist/react';
import type { PageBlocksGrid } from '../../tina/__generated__/types';
import EditHelper from '../../tina/templating/EditHelper';
import { renderBlocks } from '../../tina/templating/utils';
import config from '../../utils/config';

// Uses the same data shape as Grid until Tina generated types include PageBlocksFlex.
type PageBlocksFlex = PageBlocksGrid;

export default function Component(props: PageBlocksFlex) {
    const { edit } = useEditState();

    return (
        <Box style={{ backgroundColor: !!props.settings?.hasBackground ? 'var(--gray-2)' : 'transparent' }}>
            <Container
                mt={props.settings?.mt ?? '0'}
                mb={props.settings?.mb ?? '0'}
            >
                {edit && <EditHelper {...props} />}
                <Flex
                    wrap="wrap"
                    gap={{ initial: "2", md: config.layout.gap }}
                    justify={(props.settings as any)?.justify ?? 'start'}
                    align={(props.settings as any)?.align}
                    direction={(props.settings as any)?.direction ?? 'row'}
                >
                    {props.items?.map((item, index) => {
                        return (
                            <Box
                                key={index}
                                data-tina-field={tinaField(item)}
                            >
                                {item?.blocks?.map((block, blockIndex) => {
                                    return renderBlocks(block, blockIndex);
                                })}
                            </Box>
                        );
                    })}
                </Flex>
            </Container>
        </Box>
    );
}
