import { createTheme } from '@mui/material/styles'

const lightTheme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#5122C0',
    },
    secondary: {
      main: '#2F2D5C',
    },
    headingColor: {
      main: '#2F2D5C',
    },
    subHeadingColor: {
      main: '#000000',
    },
    lightColor: {
      main: 'white',
    },
    darkColor: {
      main: 'black',
    },
  },
  shape: {
    borderRadius: 11,
  },
  typography: {
    fontFamily: ['Inter', 'sans-serif'].join(','),
  },
  mixins: {
    drawer: {
      minWidth: 200,
      width: 200,
    },
    toolbar: {
      minHeight: 72,
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          '&&': {
            textTransform: 'capitalize',
            '.MuiButton-label': {
              textTransform: 'capitalize',
            },
          },
        },
      },
    },
    MuiTooltip: {
      styleOverrides: {
        root: {},
        tooltip: {
          // backgroundImage:
          //   "linear-gradient(rgb(34 84 82 / 12%), rgb(26 38 46 / 18%))",
          backdropFilter: 'blur(5px)',
          backgroundColor: '#ffffff55',
          color: '#000000',
          borderRadius: 5,
          paddingBottom: 3,
          // boxShadow:
          //   "3px 3px 1.25rem 3px rgb(100 241 255 / 3%), 8px 8px 3rem 10px rgb(13 38 40 / 31%)",
          boxShadow: `0 6.2px 10px rgba(0, 0, 0, 0.07),
          0 11.9px 14.6px rgba(0, 0, 0, 0.049), 0 17.8px 17.1px rgba(0, 0, 0, 0.036),
          0 24.6px 18.8px rgba(0, 0, 0, 0.028), 0 33.1px 20.2px rgba(0, 0, 0, 0.023),
          0 43.5px 22.1px rgba(0, 0, 0, 0.019), 0 56px 26px rgba(0, 0, 0, 0.012),
          0 -24.6px 18.8px rgba(0, 0, 0, 0.028), 0 -33.1px 20.2px rgba(0, 0, 0, 0.023),
          0 -43.5px 22.1px rgba(0, 0, 0, 0.019), 0 -56px 26px rgba(0, 0, 0, 0.012)`,
        },
      },
    },
  },
})

export default lightTheme
