import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Post from './Post';
import { fetchPosts } from '../redux/actions/post';
import Loader from './Loader';
import { Box, Wrap, Flex, Heading, Input } from '@chakra-ui/react';
import { NavLink, useParams } from 'react-router-dom';

const PostsList = () => {
    const listPost = useSelector(state => state.posts);
    const [lists, setLists] = useState([]);
    const [search, setSearch] = useState('');

    const { posts, loading, error } = listPost;

    const params = useParams();
    const dispatch = useDispatch();

    useEffect(() => {
        if (params.category) {
            const filtered = posts?.filter(val => val?.tag?.toLowerCase() === params.category);
            return setLists(filtered);
        }

        const searchFiltered = posts?.filter(
            val =>
                val?.content?.toLowerCase().indexOf(search.toLocaleLowerCase()) > -1 ||
                val?.subtitle?.toLowerCase().indexOf(search.toLocaleLowerCase()) > -1 ||
                val?.title?.toLowerCase().indexOf(search.toLocaleLowerCase()) > -1 ||
                val?.author?.toLowerCase().indexOf(search.toLocaleLowerCase()) > -1,
        );
        return setLists(searchFiltered);
    }, [params.category, posts, search]);

    useEffect(() => {
        dispatch(fetchPosts());
    }, [dispatch]);

    return (
        <>
            {!params.category && (
                <Box px={20}>
                    <Input placeholder="Search Blogs" mt={5} onChange={e => setSearch(e.target.value)} />
                </Box>
            )}
            <Heading px={20} pt={10} as="h1" size="xl" color={('gray.800', 'gray.500')}>
                {params?.category ? (
                    <>
                        <NavLink to="/posts"> All Blogs </NavLink> / {params.category?.toUpperCase()}
                    </>
                ) : (
                    'All Blogs'
                )}
            </Heading>
            <Flex px={5} py={30} w="full" align="center" justify="center" minH="100vh">
                <Wrap spacing="30px" justify="center">
                    {error && <p>{error}</p>}
                    {loading ? (
                        <Loader />
                    ) : lists?.length > 0 ? (
                        lists?.map(post => (
                            <Box
                                mx="auto"
                                rounded="lg"
                                shadow="md"
                                bg={('gray.800', 'gray.800')}
                                maxW="md"
                                key={post?._id}
                                boxShadow="dark-lg"
                            >
                                <Post post={post} />
                            </Box>
                        ))
                    ) : (
                        'Blog not found!'
                    )}
                </Wrap>
            </Flex>
        </>
    );
};

export default PostsList;
