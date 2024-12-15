import React from "react";
import { SearchProvider, WithSearch } from "@elastic/react-search-ui";
import "@elastic/react-search-ui-views/lib/styles/styles.css";
import { searchConfig } from './config/search.config';
import { SearchLayout } from './components/SearchLayout';

export default function App() {
  return (
    <SearchProvider config={searchConfig}>
      <WithSearch
        mapContextToProps={({
          wasSearched,
          results,
          searchTerm,
          setSearchTerm,
          isLoading
        }) => ({
          wasSearched,
          results,
          searchTerm,
          setSearchTerm,
          isLoading
        })}
      >
        {(props) => (
          <div className="App">
            <SearchLayout {...props} />
          </div>
        )}
      </WithSearch>
    </SearchProvider>
  );
}