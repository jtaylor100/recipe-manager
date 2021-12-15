import Typography from '@mui/material/Typography'
import Fab from '@mui/material/Fab'
import AddIcon from '@mui/icons-material/Add'
import Link from 'next/link'
import Layout from '../components/Layout'
import styles from '../styles/Home.module.css'

export default function Home() {
  return (
    <Layout>
      <Link href="/add" prefetch>
        <Fab color="primary" aria-label="add" className={styles.bottomRightAnchor}>
          <AddIcon />
        </Fab>
      </Link>
    </Layout>
  )
}
