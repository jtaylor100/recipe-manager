import Typography from '@mui/material/Typography'
import Fab from '@mui/material/Fab'
import AddIcon from '@mui/icons-material/Add'
import Link from 'next/link'
import Layout from '../components/Layout'

export default function Home() {
  return (
    <Layout>
      <Link href="/add" prefetch>
        <Fab color="secondary" aria-label="add" className="bottomRightAnchor">
          <AddIcon />
        </Fab>
      </Link>
    </Layout>
  )
}
