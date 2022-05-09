import { useCallback } from 'react';
import styled from 'styled-components';

import { fetchVideos } from '../api/youtube-api';
import { useStoreContext } from '../store';

const SearchWrapper = styled.div`
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    height: 6vh;
    justify-content: center;
    align-items: center;
    margin-top: 10px;
    border: none;
    outline: none;
    
`;

const SearchInputStyled = styled.input`
    flex-basis: 30%;
    min-height: 4vh;
    border-radius: 10px;
    outline: none;
    border: 1px solid #b1b1b1;
    padding-left: 8px;
    &: hover {
        border: none;
        box-shadow: 0px 0px 2px 1px #d91f1f73;
    }
`;

const SearchButtonStyled = styled.button`
    flex-basis: 10%;
    @media (max-width: 480px) {
        flex-basis: 20%;
    }
    min-height: 4vh;
    color: black;
    background-color: white;
    border-radius: 6px;
    margin-left: 1vw;
    border: 1px solid #b1b1b1;
    outline: none;
    cursor: pointer;
    overflow: hidden;
    &: hover {
        background-color: red;
        border: none;
    }
`;

export const SearchBar = () => {
    const { setVideoList, query, setQuery, setErrorStatus, errorStatus } = useStoreContext();

    const handleOnQueryChange = (e) => {
        setQuery(e.target.value);
    };

    const handleOnSearch = useCallback(async () => {
            setVideoList('');
            try {
                if(query) {
                    const response = await fetchVideos().get({ query });
                    setVideoList({ nextPageToken: response.data.nextPageToken, items:response.data.items, pageInfo: response.data.pageInfo});
                    errorStatus.isError && setErrorStatus({isError: false, errorMessage: ''});
                }
            } catch(err) {
                setErrorStatus({isError: true, errorMessage: (err && err.response.data.error.message) || 'Error while fetching data'});
                console.log(err);
            }
    }, [errorStatus.isError, query, setErrorStatus, setVideoList]);

    return (
        <SearchWrapper>
            <SearchInputStyled data-testid="search-bar" onChange={handleOnQueryChange} placeholder="Enter your search" />
            <SearchButtonStyled data-testid="search-button" onClick={handleOnSearch}>search</SearchButtonStyled>
        </SearchWrapper>
    )
};