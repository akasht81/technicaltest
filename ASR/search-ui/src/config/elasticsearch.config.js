import ElasticsearchAPIConnector from "@elastic/search-ui-elasticsearch-connector"; 
// Import the Elasticsearch API connector from Elastic Search UI library

// Define constants for Elasticsearch configuration
const ELASTICSEARCH_HOST = "http://localhost:9200"; // URL of the Elasticsearch server
const INDEX_NAME = "cv-transcriptions"; // Name of the index to be queried

// Create and export an Elasticsearch connector instance
export const connector = new ElasticsearchAPIConnector({
  host: ELASTICSEARCH_HOST, // The Elasticsearch server address
  index: INDEX_NAME, // The index name to connect to

  // Debugging: Handle and log the search request before sending it to Elasticsearch
  onSearchRequest: (body) => {
    console.log("Elasticsearch request:", body); // Log the request body for debugging
    return body; // Return the request body unchanged
  },

  // Debugging: Handle and log the search response received from Elasticsearch
  onSearchResponse: (response) => {
    console.log("Elasticsearch response:", response); // Log the response for debugging
    return response; // Return the response unchanged
  }
});
