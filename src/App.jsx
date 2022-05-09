import { Container } from './list-container/container';
import { SearchBar } from './search/search-bar';
import { YoutubeContext, useYoutubeContext } from './store';

const App = () => {
  const [defaultValue] = useYoutubeContext();

  return (
    <YoutubeContext.Provider value={defaultValue}>
      <SearchBar />
      <Container />
    </YoutubeContext.Provider>
  );
}

export default App;
