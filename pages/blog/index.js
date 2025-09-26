import Blog from '../../components/Blog'
import { getData } from '../../lib/data'

export default function BlogPage({ blogData }) {
  return (
    <>
      <Blog data={blogData} />
    </>
  )
}

export async function getStaticProps() {
  const data = await getData()
  return {
    props: {
      blogData: data.blogPosts,
    },
    revalidate: 60,
  }
}