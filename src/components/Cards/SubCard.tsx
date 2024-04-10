import { Card, CardContent, CardHeader, Divider, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import PropTypes from 'prop-types';
import React, { forwardRef, ReactNode } from 'react';

interface SubCardProps {
  children?: ReactNode;
  content?: boolean;
  contentClass?: string;
  darkTitle?: boolean;
  secondary?: ReactNode | string | object;
  sx?: object; // Custom styles for the Card component
  contentSX?: object; // Custom styles for the CardContent component
  title?: string;
}

const SubCard = forwardRef<HTMLDivElement, SubCardProps>(
  (
    {
      children,
      content = true,
      contentClass,
      darkTitle,
      secondary,
      sx = {}, // Custom styles for the Card component
      contentSX = {}, // Custom styles for the CardContent component
      title,
      ...others
    },
    ref,
  ) => {
    const theme = useTheme();

    return (
      <Card
        ref={ref}
        sx={{
          border: '0px solid',
          borderColor: theme.palette.primary.dark,
          ':hover': {
            boxShadow: '0 2px 14px 0 rgb(32 40 45 / 8%)',
          },
          ...sx, // Apply custom styles for the Card component
        }}
        {...others}
      >
        {/* card header and action */}
        {!darkTitle && title && (
          <CardHeader
            sx={{ p: 2.5 }}
            title={<Typography variant="h5">{title}</Typography>}
            action={secondary}
          />
        )}
        {darkTitle && title && (
          <CardHeader
            sx={{ p: 2.5 }}
            title={<Typography variant="h4">{title}</Typography>}
            action={secondary}
          />
        )}

        {/* content & header divider */}
        {title && (
          <Divider
            sx={{
              opacity: 0,
              borderColor: theme.palette.primary.light,
            }}
          />
        )}

        {/* card content */}
        {content && (
          <CardContent sx={{ p: 2.5, ...contentSX }} className={contentClass || ''}>
            {children}
          </CardContent>
        )}
        {!content && children}
      </Card>
    );
  },
);

SubCard.propTypes = {
  children: PropTypes.node,
  content: PropTypes.bool,
  contentClass: PropTypes.string,
  darkTitle: PropTypes.bool,
  secondary: PropTypes.oneOfType([PropTypes.node, PropTypes.string, PropTypes.object]),
  sx: PropTypes.object, // Prop for custom styles for the Card component
  contentSX: PropTypes.object, // Prop for custom styles for the CardContent component
  title: PropTypes.string,
};

// Default props
SubCard.defaultProps = {
  content: true,
};

export default SubCard;
