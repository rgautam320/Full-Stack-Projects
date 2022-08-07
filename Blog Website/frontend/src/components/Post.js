import React from 'react';
import moment from 'moment';
import 'moment/locale/en-gb';
import { Image, chakra, useColorModeValue, Link, Box, Flex, Spacer } from '@chakra-ui/react';
import { NavLink } from 'react-router-dom';

const Post = ({ post }) => {
    const convertRelativeTime = date => {
        return moment(date).fromNow();
    };

    const createHTML = () => {
        return {
            __html: post?.content.substring(0, 225),
        };
    };

    return (
        <>
            <Image
                roundedTop="lg"
                w="full"
                h={64}
                fit="cover"
                src={post?.image || 'https://loremflickr.com/448/256'}
                alt={post?.tag}
            />

            <Box p={6}>
                <Box>
                    <chakra.span
                        fontSize="xs"
                        textTransform="uppercase"
                        color={useColorModeValue('brand.300', 'brand.300')}
                        cursor="pointer"
                    >
                        <NavLink to={`/posts/category/${post?.tag?.toLowerCase()}`}>
                        {post.tag}
                        </NavLink>
                        
                    </chakra.span>

                    <Box fontSize="2xl" cursor="pointer" color={'darkgreen'}>
                        <NavLink to={`posts/${post._id}`}>{post.title}</NavLink>
                    </Box>

                    <chakra.span
                        mt={2}
                        fontSize="sm"
                        fontStyle="italic"
                        color={useColorModeValue('gray.500', 'gray.500')}
                    >
                        {post.subtitle}
                    </chakra.span>
                    <chakra.p mt={4} fontSize="sm" color={useColorModeValue('gray.300', 'gray.300')}>
                        <div dangerouslySetInnerHTML={createHTML()}></div>
                    </chakra.p>
                </Box>

                <Box mt={4}>
                    <Flex alignItems="center">
                        <Flex alignItems="center" justify="between">
                            <Image
                                h={10}
                                fit="cover"
                                rounded="full"
                                src={post?.authorProfile || 'https://source.unsplash.com/random/48x48'}
                                alt="Avatar"
                            />
                            <Link mx={2} fontWeight="bold" color={useColorModeValue('gray.300', 'gray.200')}>
                                {post.author}
                            </Link>
                        </Flex>
                        <Spacer />
                        <chakra.span mx={1} fontSize="sm" color={useColorModeValue('gray.600', 'gray.300')}>
                            {convertRelativeTime(post.createdAt)}
                        </chakra.span>
                    </Flex>
                </Box>
            </Box>
        </>
    );
};

export default Post;
