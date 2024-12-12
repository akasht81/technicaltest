import React from "react";
import "@elastic/eui/dist/eui_theme_light.css";

import ElasticSearchAPIConnector from "@elastic/search-ui-elasticsearch-connector";
import moment from "moment";

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
import {
  BooleanFacet,
  Layout,
  SingleLinksFacet,
  SingleSelectFacet
} from "@elastic/react-search-ui-views";
import "@elastic/react-search-ui-views/lib/styles/styles.css";

const connector = new ElasticSearchAPIConnector({
  host: process.env.REACT_ELASTICSEARCH_HOST || "http://localhost:9200", // Change to your Elasticsearch host
  index: process.env.REACT_ELASTICSEARCH_INDEX || "cv-transcriptions", // Your Elasticsearch index
  apiKey: process.env.REACT_ELASTICSEARCH_API_KEY || "" // Remove if not using authentication
});


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
      <WithSearch
        mapContextToProps={({ wasSearched }) => ({
          wasSearched
        })}
      >
        {({ wasSearched }) => {
          return (
            <div className="App">
              <ErrorBoundary>
                <Layout
                  header={
                    <SearchBox
                      autocompleteMinimumCharacters={3}
                      autocompleteResults={{
                        linkTarget: "_blank",
                        sectionTitle: "Results",
                        titleField: "title",
                        urlField: "nps_link",
                        shouldTrackClickThrough: true,
                        clickThroughTags: ["test"]
                      }}
                      autocompleteSuggestions={true}
                      debounceLength={0}
                    />
                  }
                  sideContent={
                    <div>
                      {wasSearched && (
                        <Sorting label={"Sort by"} sortOptions={SORT_OPTIONS} />
                      )}
                      <Facet
                        field="states.keyword"
                        label="States"
                        filterType="any"
                        isFilterable={true}
                      />
                      <Facet
                        field="world_heritage_site.keyword"
                        label="World Heritage Site"
                        view={BooleanFacet}
                      />
                      <Facet
                        field="visitors"
                        label="Visitors"
                        view={SingleLinksFacet}
                      />
                      <Facet
                        field="date_established"
                        label="Date Established"
                        isFilterable={true}
                        filterType="any"
                      />
                      <Facet
                        field="location"
                        label="Distance"
                        filterType="any"
                      />
                      <Facet field="visitors" label="visitors" />
                      <Facet
                        field="acres"
                        label="Acres"
                        view={SingleSelectFacet}
                      />
                    </div>
                  }
                  bodyContent={
                    <Results
                      titleField="title"
                      urlField="nps_link"
                      thumbnailField="image_url"
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
