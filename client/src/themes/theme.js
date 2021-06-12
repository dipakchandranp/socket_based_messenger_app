import { createMuiTheme } from "@material-ui/core";

const PRIMARY_COLOR = "#3A8DFF";
const SECONDARY_COLOR = "#B0B0B0";

export const theme = createMuiTheme({
  typography: {
    fontFamily: "Open Sans, sans-serif",
    fontSize: 14,
    fontSizeSmall: 12,
    button: {
      textTransform: "none",
      letterSpacing: 0,
      fontWeight: "bold"
    }
  },
  overrides: {
    MuiInput: {
      input: {
        fontWeight: "bold",
        fontSize: "14px",
        paddingLeft: "5px"
      },
      underline: {
        '&:before': {
          borderBottom: '1px solid #d5dfee'
        },
        '&:after': {
            borderBottom: `2px solid ${PRIMARY_COLOR}`
        },
        '&:hover:not($disabled):not($focused):not($error):before': {
            borderBottom: `1px solid ${PRIMARY_COLOR}`
          }
      }
    },
    MuiFormLabel: {
      root: {
        color: SECONDARY_COLOR,
        fontSize: "14px",
        paddingLeft: "5px",
        "&$focused": {
          paddingLeft: "5px",
          color: SECONDARY_COLOR,
        },
      },
      asterisk: {
        color: 'transparent'
      }
    },
    MuiTypography: {
      h5: {
        fontSize: "1.625rem",
        fontWeight: "bold"
      }
    }
  },
  palette: {
    primary: { main: PRIMARY_COLOR },
    secondary: { main: SECONDARY_COLOR },
    gradient: {
      start: opacity => `rgb(58 141 255 / ${opacity || 100}%)`, 
      end: opacity => `rgb(134 185 255 / ${opacity || 100}%)`
    }
  }
});
