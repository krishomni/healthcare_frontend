import Gallery from '../components/admin/GalleryEditor'
import { getData } from '../lib/data'

export default function GalleryPage({ galleryData }) {
  return (
    <>
      <Gallery data={galleryData} />
    </>
  )
}

export async function getStaticProps() {
  const data = await getData()
  return {
    props: {
      galleryData: data.gallery,
    },
    revalidate: 60,
  }
}