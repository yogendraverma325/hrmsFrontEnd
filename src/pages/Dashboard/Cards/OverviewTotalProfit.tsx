import { Card, CardContent, Stack, SvgIcon, Typography } from '@mui/material';
import { keyframes } from '@emotion/react';

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
  svgPath1: string;
  svgPath2: string;
  color: string;
  value?: string;
}

const OverviewTotalProfit: React.FC<OverviewTotalProfitProps> = ({
  name,
  backgroundColor,
  svgPath1,
  svgPath2,
  color,
  value,
}) => {
  return (
    <Card
      sx={{
        backgroundColor: backgroundColor,
      }}
    >
      <CardContent>
        <Stack
          alignItems="flex-start"
          direction="row"
          justifyContent="space-between"
          spacing={3}
        >
          <Stack>
            <Typography paddingTop={4} variant="h7" color={'white'} fontWeight={500}>
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
            <SvgIcon
              sx={{
                height: 86,
                width: 86,
                color: { color },
              }}
            >
              <path d={svgPath1} opacity=".4" />
              <path d={svgPath2} />
            </SvgIcon>
          </Typography>
        </Stack>
      </CardContent>
    </Card>
  );
};
export default OverviewTotalProfit;
