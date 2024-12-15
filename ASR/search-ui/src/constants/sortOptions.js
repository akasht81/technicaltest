export const SORT_OPTIONS = [
  {
    name: "Relevance",
    value: ""
  },
  {
    name: "Duration (Low to High)",
    value: [
      {
        field: "duration",
        direction: "asc"
      }
    ]
  },
  {
    name: "Duration (High to Low)",
    value: [
      {
        field: "duration",
        direction: "desc"
      }
    ]
  },
  {
    name: "Age (Low to High)",
    value: [
      {
        field: "age",
        direction: "asc"
      }
    ]
  },
  {
    name: "Age (High to Low)",
    value: [
      {
        field: "age",
        direction: "desc"
      }
    ]
  }
];