import axios from 'axios';

const KEY = '';

const api = axios.create({
    baseURL: 'https://www.googleapis.com/youtube/v3/',
    params: {
        part: 'snippet',
        maxResults: 16,
        key: KEY
    }
})

export const fetchVideos = () => {
    return {
        get: ({ query, nextPageToken = '' }) => api.get('/search', {
            params: {
                q: query,
                pageToken: nextPageToken
            }
        })
    }
};
