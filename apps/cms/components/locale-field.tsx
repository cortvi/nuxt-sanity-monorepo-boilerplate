import { Badge, Box } from '@sanity/ui';
import type { FieldProps } from 'sanity';


/** Renders a locale subfield with its code floating above the input instead of the default header */
export const LocaleField = (props: FieldProps) =>
  props.renderDefault({
    ...props,
    title: undefined,
    children: (
      <Box className='locale-field' style={{ position: 'relative' }}>
        <Badge
          fontSize={0}
          style={{
            position: 'absolute',
            top: '0',
            left: 'calc(100% + 8px)',
          }}
        >
          {props.title?.toUpperCase()}
        </Badge>
        {props.children}
      </Box>
    ),
  });
