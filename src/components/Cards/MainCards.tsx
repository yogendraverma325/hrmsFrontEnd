import { Card, CardContent, CardHeader, Divider, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import PropTypes from 'prop-types';
import React, { forwardRef, ReactNode } from 'react';
// constant
const headerSX = {
  '& .MuiCardHeader-action': { mr: 0 },
};

// ==============================|| CUSTOM MAIN CARD ||============================== //
interface SubCardProps {
  children?: ReactNode;
  border?: Boolean;
  boxShadow?: boolean;
  shadow?: string;
  content?: boolean;
  contentClass?: string;
  elevation?: number;
  darkTitle?: boolean;
  secondary?: ReactNode | string | object;
  sx?: object; // Custom styles for the Card component
  contentSX?: object; // Custom styles for the CardContent component
  title?: string;
}
const MainCard = forwardRef<HTMLDivElement, SubCardProps>(
  (
    {
      border = true,
      boxShadow,
      children,
      content = true,
      contentClass = '',
      contentSX = {},
      darkTitle,
      secondary,
      shadow,
      sx = {},
      title,
      ...others
    },
    ref,
  ) => {
    const theme = useTheme();

    return (
      <Card
        ref={ref}
        {...others}
        sx={{
          border: border ? '0.5px solid' : 'none',
          borderColor: '##104155',
          ':hover': {
            boxShadow: boxShadow
              ? shadow || '0 2px 14px 0 rgb(32 40 45 / 8%)'
              : 'inherit',
          },
          ...sx,
        }}
      >
        {/* card header and action */}
        {!darkTitle && title && (
          <CardHeader sx={headerSX} title={title} action={secondary} />
        )}
        {darkTitle && title && (
          <CardHeader
            sx={headerSX}
            title={<Typography variant="h3">{title}</Typography>}
            action={secondary}
          />
        )}

        {/* content & header divider */}
        {title && <Divider />}

        {/* card content */}
        {content && (
          <CardContent sx={contentSX} className={contentClass}>
            {children}
          </CardContent>
        )}
        {!content && children}
      </Card>
    );
  },
);

MainCard.propTypes = {
  border: PropTypes.bool,
  boxShadow: PropTypes.bool,
  children: PropTypes.node,
  content: PropTypes.bool,
  contentClass: PropTypes.string,
  contentSX: PropTypes.object,
  darkTitle: PropTypes.bool,
  secondary: PropTypes.oneOfType([PropTypes.node, PropTypes.string, PropTypes.object]),
  shadow: PropTypes.string,
  sx: PropTypes.object,
  title: PropTypes.oneOfType([PropTypes.string]),
};

export default MainCard;
