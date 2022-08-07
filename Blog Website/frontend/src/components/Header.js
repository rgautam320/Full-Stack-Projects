import React from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import { chakra, useColorModeValue, Flex, Button, Box } from '@chakra-ui/react';
import { useDisclosure } from '@chakra-ui/hooks';

import Logo from '../images/Logo.png';
import AddPostForm from './AddPostForm';

const Header = () => {
    const bg = useColorModeValue('white', 'gray.800');
    const { isOpen, onOpen, onClose } = useDisclosure();

    const user = JSON.parse(localStorage.getItem('USER'));

    const history = useHistory();

    const onLogout = () => {
        localStorage.clear();
        history.push('/');
        window.location.reload();
    };

    const changeTheme = () => {
        if (localStorage.getItem('theme') === 'dark') {
            localStorage.setItem('theme', 'light');
        } else {
            localStorage.setItem('theme', 'dark');
        }
        window.location.reload();
    };

    return (
        <>
            <chakra.header bg={bg} w="full" px={5} py={1} shadow="md" mx="auto">
                <Flex align="center" justify="space-between" mx="auto" maxW="1420px">
                    <Flex>
                        <Box py={3}>
                            <NavLink to="/">
                                <img src={Logo} alt="Logo" className="logo" />
                            </NavLink>
                        </Box>
                    </Flex>
                    <Flex align="center">
                        <Box
                            display="block"
                            color={useColorModeValue('gray.800', 'white')}
                            fontWeight="bold"
                            fontSize="lg"
                            px={2}
                            py={1}
                            rounded={'md'}
                            _hover={{
                                textDecoration: 'none',
                                bg: useColorModeValue('gray.200', 'gray.700'),
                            }}
                        >
                            <NavLink to="/posts">Posts</NavLink>
                        </Box>
                        <Button ml="5" colorScheme="facebook" size="sm" onClick={changeTheme}>
                            {
                                localStorage.getItem("theme") === "dark" ? "Light" : "Dark"
                            }
                        </Button>
                        {user && (
                            <>
                                <Button ml="5" colorScheme="teal" size="sm" onClick={onOpen}>
                                    New Post
                                </Button>
                                <Button ml="5" colorScheme="red" size="sm" onClick={onLogout}>
                                    Logout
                                </Button>
                            </>
                        )}
                    </Flex>
                </Flex>
            </chakra.header>

            <AddPostForm isOpen={isOpen} onClose={onClose} />
        </>
    );
};

export default Header;
