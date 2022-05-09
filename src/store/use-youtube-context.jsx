import { useState } from "react"

export const useYoutubeContext = () => {
    const [videoList, setVideoList] = useState();
    const [query, setQuery] = useState();
    const [errorStatus, setErrorStatus] = useState({isError: false, errorMessage: ''})


    const defaultValue = {
        videoList,
        setVideoList,
        query,
        setQuery,
        errorStatus,
        setErrorStatus
    }

    return [defaultValue]
}