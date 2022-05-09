import { render, screen, cleanup, fireEvent, waitFor, act, within } from '@testing-library/react';
import App from '../App';

let apiError = false;
const apiFailure = () => apiError;
// mock result for youtube api
const videoList = {
  data: {
    "kind": "youtube#searchListResponse",
    "etag": "au8j4MzvrlXz6t40kN38xZUeZ8o",
    "nextPageToken": "CBAQAA",
    "regionCode": "IN",
    "pageInfo": {
      "totalResults": 1000000,
      "resultsPerPage": 16
    },
    "items": [
      {
        "kind": "youtube#searchResult",
        "etag": "7lR15CmvDZdf2_5S-NDk2LVUtzY",
        "id": {
          "kind": "youtube#video",
          "videoId": "hRkc-OPHApY"
        },
        "snippet": {
          "publishedAt": "2020-10-29T11:30:12Z",
          "channelId": "UCUwSeY7lUdZSP0vuflq1oPA",
          "title": "ALL OK | Happy Video |  New Kannada Song",
          "description": "ನಗು ದಾನ , ಮಹಾದಾನ This song is dedicated to everyone who makes us smile in life Lets get tested positive for Happiness.",
          "thumbnails": {
            "default": {
              "url": "https://i.ytimg.com/vi/hRkc-OPHApY/default.jpg",
              "width": 120,
              "height": 90
            },
            "medium": {
              "url": "https://i.ytimg.com/vi/hRkc-OPHApY/mqdefault.jpg",
              "width": 320,
              "height": 180
            },
            "high": {
              "url": "https://i.ytimg.com/vi/hRkc-OPHApY/hqdefault.jpg",
              "width": 480,
              "height": 360
            }
          },
          "channelTitle": "ALL OK",
          "liveBroadcastContent": "none",
          "publishTime": "2020-10-29T11:30:12Z"
        }
      }
    ]
  }  
};

const errorReponse = {
  response : {
    data: {
      error: {
        message: 'api failure'
      }
    }
  }
}

// youtube api mock
jest.mock('../api/youtube-api', () => ({
  api: {
    baseURL: 'https://www.googleapis.com/youtube/v3/',
    params: {
        part: 'snippet',
        maxResults: 1,
        key: ''
    }
  },
  fetchVideos: () => ({
      get: () => {
        return apiFailure() ? Promise.reject(errorReponse) : Promise.resolve(videoList)
      }
    }
  )
}));

afterEach(cleanup);

describe('GIVEN App component', () => {
  it('SHOULD render the App component', () => {
    const { asFragment } = render(<App />);
    
    expect(asFragment).toMatchSnapshot();
  });

  it('SHOULD render the search component', () => {
    render(<App />);
    const searchBar = screen.getAllByTestId('search-bar')[0];

    expect(searchBar).toBeTruthy();
  });

  it('SHOULD make API call ON click of search and display results for the given input', async () => {
    const { container } = render(<App />);
    const searchBar = container.querySelector('input');
    const searchButton = screen.getAllByTestId('search-button')[0];
    const value = 'All ok';

      act(() => {
        fireEvent.change(searchBar, { target: { value } });
      })

      await waitFor(() => null);

      act(() => {
        fireEvent.click(searchButton);
      })

      await waitFor(() => null);

      const { getByText } = within(screen.getAllByTestId('title')[0])

      expect(getByText(/ALL OK/)).toBeInTheDocument();
  });

  it('SHOULD show error message WHEN api fails', async () => {
    const { container } = render(<App />);
    const searchBar = container.querySelector('input');
    const searchButton = screen.getAllByTestId('search-button')[0];
    const value = 'All ok';
    apiError = true;

      act(() => {
        fireEvent.change(searchBar, { target: { value } });
      })

      await waitFor(() => null);

      act(() => {
        fireEvent.click(searchButton);
      })

      await waitFor(() => null);

      expect(screen.getByText(/api failure/)).toBeInTheDocument();
  });
});

