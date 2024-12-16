// Import necessary libraries and components
import React from "react"; // React for building the component
import { SearchProvider, WithSearch } from "@elastic/react-search-ui"; // Elastic Search UI components
import "@elastic/react-search-ui-views/lib/styles/styles.css"; // Default styles for Elastic Search UI
import { searchConfig } from "./config/search.config"; // Configuration for the search provider
import { SearchLayout } from "./components/SearchLayout"; // Custom search layout component

// Main App Component
export default function App() {
  return (
    // SearchProvider: Provides the search configuration context to the application
    <SearchProvider config={searchConfig}>
      {/* WithSearch: HOC (Higher Order Component) to manage and provide search state and functionality */}
      <WithSearch
        // mapContextToProps: Maps the context data from WithSearch to props for child components
        mapContextToProps={({
          wasSearched, // Boolean indicating if a search was performed
          results, // Array of search results
          searchTerm, // Current search term
          setSearchTerm, // Function to update the search term
          isLoading, // Boolean indicating if the search results are loading
        }) => ({
          wasSearched,
          results,
          searchTerm,
          setSearchTerm,
          isLoading,
        })}
      >
        {/* Render props: Passes the mapped props to the child component */}
        {(props) => (
          <div className="App">
            {/* SearchLayout: Custom component that renders the UI for the search experience */}
            <SearchLayout {...props} />
          </div>
        )}
      </WithSearch>
    </SearchProvider>
  );
}
