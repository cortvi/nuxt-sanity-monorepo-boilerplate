import { Box, Card, Checkbox, Flex, Switch, Text } from '@sanity/ui';
import { Tooltip } from '@sanity/ui/tooltip';
import { InfoOutlineIcon } from '@sanity/icons/InfoOutline';
import type { BooleanInputProps } from 'sanity';


/** Compact take on the default boolean input: tighter padding and the description in a tooltip */
export const BooleanInput = (props: BooleanInputProps) =>
{
  const { id, value, schemaType, readOnly, elementProps, validation } = props;
  const Input = schemaType.options?.layout === 'checkbox' ? Checkbox : Switch;
  const hasError = validation.some(({ level }) => level === 'error');

  return (
    <Card
      border
      radius={2}
      padding={2}
      tone={readOnly ? 'transparent' : hasError ? 'critical' : undefined}
    >
      <Flex align='center' gap={3}>
        {schemaType.description && (
          <Tooltip
            portal
            placement='top'
            content={
              <Box padding={2}>
                <Text size={1}>
                  {schemaType.description}
                </Text>
              </Box>
            }
          >
            <Text size={1} muted>
              <InfoOutlineIcon />
            </Text>
          </Tooltip>
        )}
        <Input
          {...elementProps}
          checked={value === true}
          indeterminate={typeof value !== 'boolean'}
          readOnly={readOnly}
        />
        <Text as='label' htmlFor={id} size={1} weight='medium'>
          {schemaType.title}
        </Text>
      </Flex>
    </Card>
  );
};
