import React from 'react'; // Importing React library
import {
  ErrorBoundary, // A component to handle errors in the search UI
  SearchBox, // The search input box for querying
  Sorting, // Component for sorting search results
  Facet, // Component for filtering results based on specific fields
  PagingInfo, // Displays information about the current page (e.g., total results)
  ResultsPerPage, // Allows users to choose how many results are shown per page
  Paging // Pagination controls for navigating between pages
} from "@elastic/react-search-ui"; // Importing components from the Elastic Search UI library
import { Layout } from "@elastic/react-search-ui-views"; // Layout component for structuring the search UI
import { SearchResults } from './SearchResults'; // Custom component for rendering search results
import { SORT_OPTIONS } from '../constants/sortOptions'; // Importing predefined sort options

// Functional component to define the search layout
export const SearchLayout = ({ wasSearched, results }) => {
  // Define the side content with sorting and facets for filtering
  const sideContent = (
    <div>
      <Sorting label="Sort by" sortOptions={SORT_OPTIONS} /> {/* Sorting dropdown */}
      <Facet field="gender" label="Gender" filterType="any" /> {/* Facet for filtering by gender */}
      <Facet field="accent" label="Accent" filterType="any" /> {/* Facet for filtering by accent */}
      <Facet field="age" label="Age Range" filterType="any" /> {/* Facet for filtering by age */}
      <Facet field="duration" label="Duration" filterType="any" /> {/* Facet for filtering by duration */}
    </div>
  );

  // Return the layout of the search UI
  return (
    <ErrorBoundary>
      <Layout
        // The header contains the search box
        header={<SearchBox />}
        
        // Side content contains sorting options and facets for filtering
        sideContent={sideContent}
        
        // Body content renders the search results
        bodyContent={<SearchResults wasSearched={wasSearched} results={results} />}
        
        // Body header includes paging info and results-per-page selector
        bodyHeader={
          <React.Fragment>
            <PagingInfo /> {/* Displays information like "1-10 of 100 results" */}
            <ResultsPerPage options={[10, 20, 50]} /> {/* Dropdown to select results per page */}
          </React.Fragment>
        }
        
        // Body footer includes pagination controls
        bodyFooter={<Paging />}
      />
    </ErrorBoundary>
  );
};
