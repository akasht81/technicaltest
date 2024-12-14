// import React from "react";
// import ElasticsearchAPIConnector from "@elastic/search-ui-elasticsearch-connector";
// import {
//   ErrorBoundary,
//   Facet,
//   SearchProvider,
//   SearchBox,
//   Results,
//   PagingInfo,
//   ResultsPerPage,
//   Paging,
//   Sorting,
//   WithSearch,
// } from "@elastic/react-search-ui";
// import { Layout } from "@elastic/react-search-ui-views";
// import "@elastic/react-search-ui-views/lib/styles/styles.css";

// const connector = new ElasticsearchAPIConnector({
//   host: "http://localhost:9200",
//   index: "cv-transcriptions",
//   fields: ["generated_text", "duration", "age", "gender", "accent"],
//   onSearchRequest: (query) => {
//     console.log("Query Sent to Elasticsearch:", JSON.stringify(query, null, 2));
//     return query;
//   },
//   onSearchResponse: (response) => {
//     console.log("Response from Elasticsearch:", JSON.stringify(response, null, 2));
//     return response;
//   },
// });


// // const config = {
// //   debug: true,
// //   alwaysSearchOnInitialLoad: true,
// //   apiConnector: connector,
// //   searchQuery: {
// //     search_fields: {
// //       generated_text: { weight: 3 },
// //     },
// //     result_fields: {
// //       generated_text: { raw: {} },
// //       duration: { raw: {} },
// //       age: { raw: {} },
// //       gender: { raw: {} },
// //       accent: { raw: {} },
// //     },
// //     facets: {
// //       "gender.keyword": { type: "value" },
// //       "accent.keyword": { type: "value" },
// //       age: {
// //         type: "range",
// //         ranges: [
// //           { from: 0, to: 20, name: "Under 20" },
// //           { from: 21, to: 40, name: "21-40" },
// //           { from: 41, name: "Over 40" },
// //         ],
// //       },
// //       duration: {
// //         type: "range",
// //         ranges: [
// //           { from: 0, to: 10, name: "Short (0-10s)" },
// //           { from: 11, to: 30, name: "Medium (11-30s)" },
// //           { from: 31, name: "Long (31+s)" },
// //         ],
// //       },
// //     },
// //   },
// // };

// const config = {
//   debug: true,
//   alwaysSearchOnInitialLoad: true,
//   apiConnector: connector,
//   searchQuery: {
//     search_fields: {
//       generated_text: { weight: 3 }, // Focus only on text search for simplicity
//     },
//     result_fields: {
//       generated_text: { raw: {} },
//     },
//     facets: {
//       "gender.keyword": { type: "value" },
//       "accent.keyword": { type: "value" },
//     },
//   },
// };

// const SORT_OPTIONS = [
//   { name: "Relevance", value: [] },
//   { name: "Generated Text", value: [{ field: "generated_text.keyword", direction: "asc" }] },
//   { name: "Gender", value: [{ field: "gender.keyword", direction: "asc" }] },
//   { name: "Accent", value: [{ field: "accent.keyword", direction: "asc" }] },
// ];

// // const SORT_OPTIONS = [
// //   { name: "Relevance", value: [] },
// //   { name: "Generated Text", value: [{ field: "generated_text.keyword", direction: "asc" }] },
// //   { name: "Duration", value: [{ field: "duration", direction: "asc" }] },
// //   { name: "Age", value: [{ field: "age", direction: "asc" }] },
// //   { name: "Gender", value: [{ field: "gender.keyword", direction: "asc" }] },
// //   { name: "Accent", value: [{ field: "accent.keyword", direction: "asc" }] },
// // ];

// export default function App() {
//   return (
//     <SearchProvider config={config}>
//       <WithSearch mapContextToProps={({ wasSearched, results }) => ({ wasSearched, results })}>
//         {({ wasSearched, results }) => (
//           <div className="App">
//             <ErrorBoundary>
//               <Layout
//                 header={<SearchBox autocompleteSuggestions={true} />}
//                 sideContent={
//                   <div>
//                     {wasSearched && <Sorting label="Sort by" sortOptions={SORT_OPTIONS} />}
//                     <Facet field="gender.keyword" label="Gender" aria-label="Filter by gender" />
//                     <Facet field="accent.keyword" label="Accent" aria-label="Filter by accent" />
//                     <Facet field="age" label="Age" />
//                     <Facet field="duration" label="Duration" />
//                   </div>
//                 }
//                 bodyContent={
//                   results.length > 0 ? (
//                     <Results
//                       titleField="generated_text"
//                       resultFields={{
//                         generated_text: { raw: {} },
//                         duration: { raw: {} },
//                         age: { raw: {} },
//                         gender: { raw: {} },
//                         accent: { raw: {} },
//                       }}
//                     />
//                   ) : (
//                     <p>{wasSearched ? "No results found." : "Enter a search term to begin."}</p>
//                   )
//                 }
//                 bodyHeader={
//                   wasSearched && (
//                     <>
//                       <PagingInfo />
//                       <ResultsPerPage />
//                     </>
//                   )
//                 }
//                 bodyFooter={<Paging />}
//               />
//             </ErrorBoundary>
//           </div>
//         )}
//       </WithSearch>
//     </SearchProvider>
//   );
// }


import React from "react";
import ElasticsearchAPIConnector from "@elastic/search-ui-elasticsearch-connector";
import {
  ErrorBoundary,
  SearchProvider,
  SearchBox,
  Results,
  WithSearch,
} from "@elastic/react-search-ui";
import { Layout } from "@elastic/react-search-ui-views";
import "@elastic/react-search-ui-views/lib/styles/styles.css";

const connector = new ElasticsearchAPIConnector({
  host: "http://localhost:9200",
  index: "cv-transcriptions",
  onSearchRequest: (query) => {
    console.log("Query Sent to Elasticsearch:", JSON.stringify(query, null, 2));
    return query;
  },
  onSearchResponse: (response) => {
    console.log("Response from Elasticsearch:", JSON.stringify(response, null, 2));
    return response;
  },
});

const config = {
  debug: true,
  alwaysSearchOnInitialLoad: true,
  apiConnector: connector,
  searchQuery: {
    search_fields: {
      generated_text: { weight: 3 }, // Focus on generated_text for search
    },
    result_fields: {
      generated_text: { raw: {} },
      duration: { raw: {} },
      age: { raw: {} },
      gender: { raw: {} },
      accent: { raw: {} },
    },
    facets: {
      "gender.keyword": { type: "value" }, // Use the .keyword subfield
      "accent.keyword": { type: "value" }, // Use the .keyword subfield
      age: {
        type: "range",
        ranges: [
          { from: 0, to: 20, name: "Under 20" },
          { from: 21, to: 40, name: "21-40" },
          { from: 41, name: "Over 40" },
        ],
      },
      duration: {
        type: "range",
        ranges: [
          { from: 0, to: 10, name: "Short (0-10s)" },
          { from: 11, to: 30, name: "Medium (11-30s)" },
          { from: 31, name: "Long (31+s)" },
        ],
      },
    },
  },
};

const SORT_OPTIONS = [
  { name: "Relevance", value: [] },
  { name: "Generated Text", value: [{ field: "generated_text.keyword", direction: "asc" }] },
  { name: "Gender", value: [{ field: "gender.keyword", direction: "asc" }] }, // Use .keyword
  { name: "Accent", value: [{ field: "accent.keyword", direction: "asc" }] }, // Use .keyword
];

export default function App() {
  return (
    <SearchProvider config={config}>
      <WithSearch mapContextToProps={({ wasSearched, results }) => ({ wasSearched, results })}>
        {({ wasSearched, results }) => (
          <div className="App">
            <ErrorBoundary>
              <Layout
                header={<SearchBox />}
                bodyContent={
                  results.length > 0 ? (
                    <Results
                      titleField="generated_text"
                      resultFields={{
                        generated_text: { raw: {} },
                      }}
                    />
                  ) : (
                    <p>{wasSearched ? "No results found." : "Start a search to see results."}</p>
                  )
                }
              />
            </ErrorBoundary>
          </div>
        )}
      </WithSearch>
    </SearchProvider>
  );
}
