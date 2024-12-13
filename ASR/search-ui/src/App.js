import React from "react";

// import AppSearchAPIConnector from "@elastic/search-ui-app-search-connector";
import ElasticsearchAPIConnector from "@elastic/search-ui-elasticsearch-connector";

import {
  ErrorBoundary,
  Facet,
  SearchProvider,
  SearchBox,
  Results,
  PagingInfo,
  ResultsPerPage,
  Paging,
  Sorting,
  WithSearch
} from "@elastic/react-search-ui";
import { Layout } from "@elastic/react-search-ui-views";
import "@elastic/react-search-ui-views/lib/styles/styles.css";

import {
  buildAutocompleteQueryConfig,
  buildFacetConfigFromConfig,
  buildSearchOptionsFromConfig,
  buildSortOptionsFromConfig,
  getConfig,
  getFacetFields
} from "./config/config-helper";

// const { hostIdentifier, searchKey, endpointBase, engineName } = getConfig();

// const connector = new ElasticSearchAPIConnector({
//   host: process.env.REACT_ELASTICSEARCH_HOST || "http://localhost:9200", // Change to your Elasticsearch host
//   index: process.env.REACT_ELASTICSEARCH_INDEX || "cv-transcriptions", // Your Elasticsearch index
//   apiKey: process.env.REACT_ELASTICSEARCH_API_KEY || "" // Remove if not using authentication
// });


const connector = new ElasticsearchAPIConnector({
  "host": "http://localhost:9200",
  "index": "cv-transcriptions",
  "fields": ["generated_text", "duration", "age", "gender", "accent"]
}
);


const config = {
  debug: true,
  alwaysSearchOnInitialLoad: true,
  apiConnector: connector,
  hasA11yNotifications: true,
  searchQuery: {
    filters: [],
    search_fields: {
      generated_text: {
        weight: 3
      },
      duration: {},
      age: {},
      gender: {},
      accent: {}
    },
    result_fields: {
      generated_text: { raw: {} },
      duration: { raw: {} },
      age: { raw: {} },
      gender: { raw: {} },
      accent: { raw: {} }
    },
    facets: {
      gender: { type: "value" },
      accent: { type: "value" },
      age: {
        type: "range",
        ranges: [
          { from: 0, to: 20, name: "Under 20" },
          { from: 21, to: 40, name: "21-40" },
          { from: 41, name: "Over 40" }
        ]
      },
      duration: {
        type: "range",
        ranges: [
          { from: 0, to: 10, name: "Short (0-10s)" },
          { from: 11, to: 30, name: "Medium (11-30s)" },
          { from: 31, name: "Long (31+s)" }
        ]
      }
    }
  }
};


const SORT_OPTIONS = [
  {
    name: "Relevance",
    value: []
  },
  {
    name: "Generated Text",
    value: [
      {
        field: "generated_text.keyword",
        direction: "asc"
      }
    ]
  },
  {
    name: "Duration",
    value: [
      {
        field: "duration",
        direction: "asc"
      }
    ]
  },
  {
    name: "Age",
    value: [
      {
        field: "age",
        direction: "asc"
      }
    ]
  }
];


export default function App() {
  return (
    <SearchProvider config={config}>
      <WithSearch mapContextToProps={({ wasSearched }) => ({ wasSearched })}>
        {({ wasSearched }) => {
          return (
            <div className="App">
              <ErrorBoundary>
                <Layout
                  header={<SearchBox autocompleteSuggestions={true} />}
                  sideContent={
                    <div>
                      {wasSearched && (
                        <Sorting
                          label={"Sort by"}
                          sortOptions={buildSortOptionsFromConfig()}
                        />
                      )}
                      {getFacetFields().map(field => (
                        <Facet key={field} field={field} label={field} />
                      ))}
                    </div>
                  }
                  bodyContent={
                    <Results
                      titleField={getConfig().titleField}
                      urlField={getConfig().urlField}
                      thumbnailField={getConfig().thumbnailField}
                      shouldTrackClickThrough={true}
                    />
                  }
                  bodyHeader={
                    <React.Fragment>
                      {wasSearched && <PagingInfo />}
                      {wasSearched && <ResultsPerPage />}
                    </React.Fragment>
                  }
                  bodyFooter={<Paging />}
                />
              </ErrorBoundary>
            </div>
          );
        }}
      </WithSearch>
    </SearchProvider>
  );
}
