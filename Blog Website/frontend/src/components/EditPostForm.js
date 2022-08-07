import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { useForm, Controller } from 'react-hook-form';
import { updatePost, uploadImage } from '../redux/actions/post';
import { Box, Flex, Heading, Select } from '@chakra-ui/react';
import { FormControl, FormLabel } from '@chakra-ui/form-control';
import { Button } from '@chakra-ui/button';
import { Input } from '@chakra-ui/input';

import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { CATEGORIES } from '../constants';

const EditPostForm = ({ post, closeEditMode }) => {
    const [file, setFile] = useState(post?.image);
    const [value, setValue] = useState();

    const { register, errors, control, handleSubmit } = useForm();

    const dispatch = useDispatch();

    const user = JSON.parse(localStorage.getItem('USER'));

    const handleBody = e => {
        setValue(e);
    };

    const onSubmit = async data => {
        let res;
        if (file) {
            res = await dispatch(uploadImage(file));
        }
        try {
            const updatedPost = {
                _id: post._id,
                ...data,
                image: res || post?.image,
                content: value,
                authorEmail: user?.email,
                authorProfile: user?.picture,
            };
            await dispatch(updatePost(post._id, updatedPost));
            toast.success('Blog successfully updated!');
            setFile(null);
            closeEditMode();
        } catch (error) {
            toast.error(error);
        }
    };

    useEffect(() => {
        setValue(post?.content);
    }, [post?.content]);

    return (
        <>
            <Flex maxW="900px" px={5} mx="auto" align="center" justify="center" minH={'90vh'}>
                <Box w="100%" px={10} py={5} my={5} borderRadius="lg" boxShadow="dark-lg">
                    <Box textAlign="center">
                        <Heading as="h2">Edit Post </Heading>
                    </Box>
                    <Box my={4} textAlign="left">
                        <form noValidate autoComplete="off" onSubmit={handleSubmit(onSubmit)}>
                            <FormControl isInvalid={errors.title} minH={'90px'}>
                                <FormLabel>Title</FormLabel>
                                <Input
                                    id="title"
                                    label="Başlık"
                                    name="title"
                                    ref={register({
                                        required: {
                                            value: true,
                                            message: 'This field is required.',
                                        },
                                    })}
                                    defaultValue={post?.title}
                                />
                                {errors.title && <p className="validation__error">{errors.title.message}</p>}
                            </FormControl>

                            <FormControl isInvalid={errors.subtitle} minH={'90px'}>
                                <FormLabel>Subtitle</FormLabel>
                                <Input
                                    id="subtitle"
                                    label="Alt Başlık"
                                    name="subtitle"
                                    ref={register({
                                        required: {
                                            value: true,
                                            message: 'This field is required.',
                                        },
                                    })}
                                    defaultValue={post?.subtitle}
                                />
                                {errors.subtitle && <p className="validation__error">{errors.subtitle.message}</p>}
                            </FormControl>

                            <FormControl isInvalid={errors.author} minH={'90px'}>
                                <FormLabel>Author</FormLabel>
                                <Input
                                    id="author"
                                    label="Author"
                                    name="author"
                                    disabled={true}
                                    value={user?.name}
                                    ref={register({
                                        required: {
                                            value: true,
                                            message: 'This field is required.',
                                        },
                                    })}
                                />
                                {errors.author && <p className="validation__error">{errors.author.message}</p>}
                            </FormControl>

                            <FormControl minH={'90px'}>
                                <FormLabel>Category</FormLabel>
                                <Controller
                                    as={
                                        <Select placeholder="Choose Category">
                                            {CATEGORIES.map((category, i) => (
                                                <option key={i} value={category}>
                                                    {category}
                                                </option>
                                            ))}
                                        </Select>
                                    }
                                    name="tag"
                                    control={control}
                                    defaultValue={post?.tag}
                                />
                            </FormControl>

                            <FormControl isInvalid={errors.content} minH={'90px'}>
                                <FormLabel>Content</FormLabel>
                                <ReactQuill value={value} defaultValue={post?.content} onChange={handleBody} />
                                {errors.content && <p className="validation__error">{errors.content.message}</p>}
                            </FormControl>

                            <FormControl mt={16}>
                                <Input type="file" onChange={e => setFile(e.target.files[0])} multiple={false} />
                            </FormControl>

                            <Box mt={9} display="flex" alignItems="center" justifyContent="flex-end">
                                <Button colorScheme="blue" mr={3} type="submit">
                                    Update
                                </Button>
                                <Button onClick={closeEditMode}>Cancel</Button>
                            </Box>
                        </form>
                    </Box>
                </Box>
            </Flex>
        </>
    );
};

export default EditPostForm;
