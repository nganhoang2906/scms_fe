export default function Theme(colors) {
  const { blue, red, gold, cyan, green, grey } = colors;
  const greyColors = {
    0: grey[0],
    50: grey[1],
    100: grey[2],
    200: grey[3],
    300: grey[4],
    400: grey[5],
    500: grey[6],
    600: grey[7],
    700: grey[8],
    800: grey[9],
    900: grey[10],
    A50: grey[15],
    A100: grey[11],
    A200: grey[12],
    A400: grey[13],
    A700: grey[14],
    A800: grey[16]
  };
  const contrastText = '#fff';

  return {
    default: {
      lighter: "#D0E6F5",
      light:   "#77B7DF",
      main:    "#05518B",
      dark:    "#033B64",
      darker:  "#022840",
      contrastText
    },
    
    primary: {
      lighter: blue[2],
      light: blue[4],
      main: blue[6],
      dark: blue[8],
      darker: blue[10],
      contrastText
    },
    secondary: {
      lighter: greyColors[100],
      light: greyColors[300],
      main: greyColors[500],
      dark: greyColors[700],
      darker: greyColors[900],
      contrastText
    },
    error: {
      lighter: red[2],
      light: red[4],
      main: red[6],
      dark: red[8],
      darker: red[10],
      contrastText
    },
    warning: {
      lighter: gold[2],
      light: gold[4],
      main: gold[6],
      dark: gold[8],
      darker: gold[10],
      contrastText
    },
    info: {
      lighter: cyan[2],
      light: cyan[4],
      main: cyan[6],
      dark: cyan[8],
      darker: cyan[10],
      contrastText
    },
    success: {
      lighter: green[2],
      light: green[4],
      main: green[6],
      dark: green[8],
      darker: green[10],
      contrastText
    },
    grey: greyColors
  };
}
