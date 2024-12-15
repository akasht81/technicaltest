import { connector } from './elasticsearch.config';
import { facetsConfig } from './facets.config';
import { SORT_OPTIONS } from '../constants/sortOptions';

export const searchConfig = {
  debug: true,
  alwaysSearchOnInitialLoad: true,
  apiConnector: connector,
  hasA11yNotifications: true,
  searchQuery: {
    search_fields: {
      generated_text: { 
        weight: 3,
        snippet: {
          size: 100,
          fallback: true
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
    },
    ...facetsConfig,
    disjunctiveFacets: ["gender", "accent"]
  },
  sortOptions: SORT_OPTIONS // Move sortOptions here
};