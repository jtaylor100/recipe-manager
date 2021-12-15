import Head from 'next/head'
import styles from '../styles/Home.module.css'
import Typography from '@mui/material/Typography'
import Container from '@mui/material/Container'
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'

export default function Home() {
  return (
    <>
      <Head>
        <title>Recipe Manager</title>
      </Head>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Josh's Vegan Gold Mine
          </Typography>
        </Toolbar>
      </AppBar>
    </>
  )
}
