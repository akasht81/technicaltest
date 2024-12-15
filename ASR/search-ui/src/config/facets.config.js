export const facetsConfig = {
  facets: {
    gender: { 
      type: "value",
      field: "gender.keyword"
    },
    accent: { 
      type: "value",
      field: "accent.keyword"
    },
    age: {
      type: "range",
      field: "age",
      ranges: [
        { from: 0, to: 20, name: "Under 20" },
        { from: 21, to: 40, name: "21-40" },
        { from: 41, name: "Over 40" }
      ]
    },
    duration: {
      type: "range",
      field: "duration",
      ranges: [
        { from: 0, to: 10, name: "Short (0-10s)" },
        { from: 11, to: 30, name: "Medium (11-30s)" },
        { from: 31, name: "Long (31+s)" }
      ]
    }
  }
};