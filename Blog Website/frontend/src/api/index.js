import axios from 'axios';

const API_ENDPOINT = 'https://awt-lab-blog-website-api.herokuapp.com/posts';

export const fetchPosts = async () => {
    return await axios.get(API_ENDPOINT);
};

export const fetchSinglePost = async id => {
    return await axios.get(`${API_ENDPOINT}/${id}`);
};

export const createPost = async post => {
    return await axios.post(API_ENDPOINT, post);
};

export const updatePost = async (id, updatedPost) => {
    return await axios.put(`${API_ENDPOINT}/${id}`, updatedPost);
};

export const deletePost = async id => {
    return await axios.delete(`${API_ENDPOINT}/${id}`);
};
