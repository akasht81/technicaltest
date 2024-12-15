import React from 'react'; // Importing React library
import { Results } from "@elastic/react-search-ui"; // Importing the Results component from Elastic Search UI

// Define the SearchResults component
export const SearchResults = ({ wasSearched, results }) => {
  // Custom component to render each search result
  const ResultView = ({ result }) => (
    <div className="sui-result"> {/* Container for an individual result */}
      <div className="sui-result__header">
        <h3>{result.generated_text.raw}</h3> {/* Render the generated text as the title */}
      </div>
      <div className="sui-result__body">
        {/* Render other details about the result */}
        <div>Duration: {result.duration.raw}s</div> {/* Display duration in seconds */}
        <div>Age: {result.age.raw}</div> {/* Display age */}
        <div>Gender: {result.gender.raw}</div> {/* Display gender */}
        <div>Accent: {result.accent.raw}</div> {/* Display accent */}
      </div>
    </div>
  );

  // Display a prompt if no search has been initiated
  if (!wasSearched) {
    return <p>Start a search to see results.</p>; {/* Message for initial state */}
  }

  // Display a message if no results were found
  if (results.length === 0) {
    return <p>No results found.</p>; {/* Message for empty results */}
  }

  // Render the Results component if results are available
  return (
    <Results
      resultView={ResultView} // Custom view for rendering each result
      titleField="generated_text" // Field used as the title for search results
      shouldTrackClickThrough={true} // Enables click tracking for analytics
    />
  );
};
