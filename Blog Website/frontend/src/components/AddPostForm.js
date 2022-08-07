import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { useForm, Controller } from 'react-hook-form';
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Select,
} from '@chakra-ui/react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { Button } from '@chakra-ui/button';
import { Input } from '@chakra-ui/input';
import { FormControl, FormLabel } from '@chakra-ui/form-control';

import { createPost, uploadImage } from '../redux/actions/post';
import { CATEGORIES } from '../constants';
import Loader from './Loader';

const AddPostForm = ({ isOpen, onClose }) => {
    const [file, setFile] = useState();
    const [value, setValue] = useState('');
    const user = JSON.parse(localStorage.getItem('USER'));

    const [loading, setLoading] = useState(false);

    const { register, errors, control, handleSubmit } = useForm();

    const dispatch = useDispatch();

    const handleBody = e => {
        setValue(e);
    };

    const onSubmit = async data => {
        try {
            setLoading(true);
            const res = await dispatch(uploadImage(file));
            await dispatch(
                createPost({
                    ...data,
                    image: res,
                    author: user?.name,
                    authorEmail: user?.email,
                    content: value,
                    authorProfile: user?.picture,
                }),
            );
            toast.success('Blog successfully added!');
            setLoading(false);
            clearForm();
        } catch (error) {
            toast.error(error);
            setLoading(false);
        }
    };

    const clearForm = () => {
        onClose();
        setFile(null);
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose} size="4xl">
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Add New Post</ModalHeader>
                <ModalCloseButton />
                {loading ? (
                    <Loader />
                ) : (
                    <ModalBody pb={6}>
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
                                    defaultValue={CATEGORIES[0]}
                                />
                            </FormControl>
                            <FormControl isInvalid={errors.content} minH={'200px'}>
                                <FormLabel>Content</FormLabel>
                                <ReactQuill value={value} onChange={handleBody} placeholder="Enter Your Content" />
                            </FormControl>

                            <FormControl mt={'9'}>
                                <Input type="file" onChange={e => setFile(e.target.files[0])} multiple={false} />
                            </FormControl>

                            <ModalFooter pr={0}>
                                <Button colorScheme="blue" mr={3} onClick={() => handleSubmit(onSubmit)()}>
                                    Save
                                </Button>
                                <Button onClick={onClose}>Cancel</Button>
                            </ModalFooter>
                        </form>
                    </ModalBody>
                )}
            </ModalContent>
        </Modal>
    );
};

export default AddPostForm;
