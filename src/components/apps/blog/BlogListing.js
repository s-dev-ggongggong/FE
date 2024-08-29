import React, { useEffect } from 'react';
import { Button, Grid, Pagination, Stack, Typography } from '@mui/material';
import BlogCard from './BlogCard';
import { orderBy } from 'lodash';
import { useSelector, useDispatch } from 'react-redux';
import { fetchBlogPosts } from 'src/store/apps/blog/BlogSlice';
import BlogFeaturedCard from './BlogFeaturedCard';

const BlogListing = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchBlogPosts());
  }, [dispatch]);

  const filterBlogs = (posts, sortBy, cSearch) => {
    // SORT BY

    if (sortBy === 'newest') {
      posts = orderBy(posts, ['createdAt'], ['desc']);
    }
    if (sortBy === 'oldest') {
      posts = orderBy(posts, ['createdAt'], ['asc']);
    }
    if (sortBy === 'popular') {
      posts = orderBy(posts, ['view'], ['desc']);
    }
    if (posts) {
      return (posts = posts.filter((t) => t.featured === false));
    }
    return posts;
  };
  const filterFeaturedpost = (posts) => {
    return (posts = posts.filter((t) => t.featured));
  };
  const blogPosts = useSelector((state) =>
    filterBlogs(
      state.blogReducer.blogposts,
      state.blogReducer.sortBy,
      state.blogReducer.blogSearch,
    ),
  );
  const featuredPost = useSelector((state) => filterFeaturedpost(state.blogReducer.blogposts));
  console.log(featuredPost)
  console.log(blogPosts)
  return (
    <div>
      <Stack direction={'row'} justifyContent={'space-between'}>
        <Typography variant='h3'>전체 {blogPosts.length+featuredPost.length}개</Typography>
        <Button>새로 만들기</Button>
      </Stack>
      <br/>
      <Grid container spacing={3}>
        {featuredPost.map((post, index) => {
          return <BlogFeaturedCard index={index} post={post} key={post.title} />;
        })}

        {blogPosts.map((post) => {
          return <BlogCard post={post} key={post.id} />;
        })}
        <Grid item lg={12} sm={12} mt={3}>
          <Pagination count={10} color="primary" sx={{ display: 'flex', justifyContent: 'center' }} />
        </Grid>
      </Grid>
    </div>

  );
};

export default BlogListing;
