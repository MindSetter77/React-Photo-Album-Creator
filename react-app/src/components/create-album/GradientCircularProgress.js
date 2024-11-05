import React from "react";
import CircularProgress from '@mui/material/CircularProgress';
import { styled } from '@mui/system';

// Styled component, które będzie używać gradientu jako tła obramowania koła
const StyledCircularProgress = styled(CircularProgress)(({ theme, colorStart, colorEnd }) => ({
  '& .MuiCircularProgress-circle': {
    stroke: `url(#my_gradient_${colorStart}_${colorEnd})`, // Używanie gradientu jako tła obramowania
  },
}));

function GradientCircularProgress({ colorStart = "#ff3333", colorEnd = "#cc00cc" }) {
  return (
    <React.Fragment>
      {/* Definicja gradientu */}
      <svg width={0} height={0}>
        <defs>
          <linearGradient id={`my_gradient_${colorStart}_${colorEnd}`} x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor={colorStart} />
            <stop offset="100%" stopColor={colorEnd} />
          </linearGradient>
        </defs>
      </svg>
      
      {/* Użycie StyledCircularProgress z gradientem */}
      <StyledCircularProgress size={20} colorStart={colorStart} colorEnd={colorEnd} />
    </React.Fragment>
  );
}

export default GradientCircularProgress;
