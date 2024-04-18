import { keyframes } from '@emotion/react';
import { Card, CardContent, Stack, SvgIcon, Typography } from '@mui/material';
const blinkAnimation = keyframes`
  0% {
    opacity: 1;
  }
  50% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
`;

// Define the styles for the blinking text
const styles: { [key: string]: React.CSSProperties } = {
  blink: {
    animation: `${blinkAnimation} 1s infinite`,
  },
};

interface OverviewTotalProfitProps {
  name: string;
  backgroundColor: string;
  svgPath: any;
  color?: string;
  value?: any;
}

const OverviewTotalProfit: React.FC<OverviewTotalProfitProps> = ({
  name,
  backgroundColor,
  svgPath,
  value,
}) => {
  const IconComponent = svgPath;
  return (
    <Card
      sx={{
        backgroundColor: backgroundColor,
        marginTop: '30px',
        marginLeft: '10px',
        marginRight: '10px',
      }}
    >
      <CardContent>
        <Stack
          alignItems="flex-start"
          direction="row"
          justifyContent="space-between"
          spacing={2}
        >
          <Stack>
            <Typography padding={2} variant="h6" color={'white'} fontWeight={500}>
              {name}
            </Typography>
            <Typography
              sx={value ? styles.blink : {}}
              style={{ color: 'white' }}
              variant="h5"
              fontWeight={500}
            >
              {value}
            </Typography>
          </Stack>

          <Typography>
            {IconComponent && (
              <IconComponent
                sx={{
                  height: 30,
                  width: 30,
                  color: 'white',
                }}
              />
            )}
          </Typography>
        </Stack>
      </CardContent>
    </Card>
  );
};
export default OverviewTotalProfit;
