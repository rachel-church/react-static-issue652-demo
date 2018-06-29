import axios from 'axios'

export default {
  getSiteData: () => ({
    title: 'React Static',
  }),
  getRoutes: async () => {
    const { data: posts } = await axios.get('https://jsonplaceholder.typicode.com/posts')
    return [
      {
        path: '/',
        component: 'src/pages/index',
      },
      {
        path: '/404',
        component: 'src/pages/404',
        is404: true,
      },
      {
        path: '/about',
        component: 'src/pages/about',
      },
      {
        path: '/blóg',
        component: 'src/pages/blog',
        getData: () => ({
          posts,
        }),
        children: posts.map(post => ({
          path: `/post/${post.id}`,
          component: 'src/containers/Post',
          getData: () => ({
            post,
          }),
        })),
      },
    ]
  },
}
