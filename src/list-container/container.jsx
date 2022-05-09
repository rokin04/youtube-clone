import styled from 'styled-components';
import { useState } from 'react';

import { useStoreContext } from '../store';
import { Card } from './card';
import { fetchVideos } from '../api/youtube-api';
import { ErrorAlert } from '../error/error-alert';

const ContainerStyled = styled.div`
    display: flex;
    align-items: flex-start;
    padding: 5px;
    flex-wrap: wrap;
    margin: 20px;
    justify-content: center;
`;

const Loader = styled.h3`
    text-align: center;
    color: red;
`;

export const Container = () => {
    const { query, videoList, setVideoList, errorStatus, setErrorStatus } = useStoreContext();
    const [debounce, setDebounce] = useState();
    const [isLoading, setIsLoading] = useState();

    const stopSearch = videoList && videoList.pageInfo.totalResults === videoList.items.length;
    const { isError, errorMessage } = errorStatus;

    window.onscroll = () => {
        if (window.innerHeight + document.documentElement.scrollTop === document.documentElement.offsetHeight && !stopSearch) {
            const nextPageToken = videoList.nextPageToken || '';
            if (!debounce) {
                setIsLoading(true);
                setDebounce(setTimeout(() => clearTimeout(setDebounce('')), 1000));
                fetchVideos().get({ query, nextPageToken}).then(response => {
                    setVideoList({ ...videoList, nextPageToken: response.data.nextPageToken, items:[...videoList.items,...response.data.items], pageInfo: response.data.pageInfo});
                    errorStatus.isError && setErrorStatus({isError: false, errorMessage: ''});
                setIsLoading(false);
                }).catch(err => {
                    console.log(err);
                    setIsLoading(false);
                    setErrorStatus({isError: true, errorMessage: (err.response && err.response.data.error.message) || 'Error while fetching data'});
                });
            }
        }
    };

    return (
        <>
            <ContainerStyled>
                {
                    videoList && videoList.items.map((item, idx) =>  <Card key={`${item.id.videoId}${idx}`} item={item} />)
                }
            </ContainerStyled>
            {
                isLoading && <Loader>Loading...</Loader>
            }
            {
                isError && <ErrorAlert message={errorMessage} />
            }
        </>
    )
};
