import Head from 'next/head'
import Typography from '@mui/material/Typography'
import Container from '@mui/material/Container'
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import Fab from '@mui/material/Fab'
import AddIcon from '@mui/icons-material/Add'
import Link from 'next/link'
import { ThemeProvider, createTheme } from '@mui/material/styles'

const theme = createTheme({
  palette: {
    primary: {
      main: '#9ccc65'
    },
    secondary: {
      main: '#827717'
    }
  },
})

export default function Layout({children}) {
  return (
    <ThemeProvider theme={theme}>
      <Head>
        <title>Josh's Vegan Gold Mine</title>
      </Head>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Josh's Vegan Gold Mine
          </Typography>
        </Toolbar>
      </AppBar>
      {children}
    </ThemeProvider>
  );
}
