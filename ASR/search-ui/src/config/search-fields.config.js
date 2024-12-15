export const searchFields = {
  search_fields: {
    generated_text: { 
      weight: 3,
      snippet: {
        size: 100,
        number_of_fragments: 1
      }
    }
  },
  result_fields: {
    generated_text: { 
      raw: {},
      snippet: {
        size: 100,
        fallback: true
      }
    },
    duration: { raw: {} },
    age: { raw: {} },
    gender: { raw: {} },
    accent: { raw: {} }
  }
};