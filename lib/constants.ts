export const PROTOCOL_REGEX = "^((https?:\\/\\/)?";
export const DOMAIN_REGEX = "(([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|";
export const IP_REGEX = "((\\d{1,3}\\.){3}\\d{1,3})|";
export const PORT_AND_PATH_REGEX = "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*";
export const QUERY_STRING_REGEX = "(\\?[;&a-z\\d%_.~+=-]*)?";
export const FRAGMENT_LOCATOR_REGEX = "(\\#[-a-z\\d_]*)?$";

export const Models = {
  GPT3: "gpt-3.5-turbo-1106",
  GPT4: "gpt-4-turbo-preview",
};

export const DEFAULT_PRINT_STYLE = `
  body: {
    padding: 3rem !important;
    margin: 0rem;
  }
  ul, ol {
    list-style-type: disc !important; /* or 'circle', 'square', 'decimal', etc. for ordered lists */
    margin-left: 20px !important; /* Adjust as necessary */
  }
  li {
    display: list-item !important;
  }
  img {
    display: none !important;
  }
`;

export const TIME_OFFSET = 86_400_000;

export const GENERATION_COUNT_LIMIT = 10;

export const RoutePaths = {
  HOME: "/",
  LOGIN: "/login",
  OVERVIEW: "/dashboard/overview",
  BILLING: "/dashboard/billing",
  SAVED: "/dashboard/saved",
  SEARCH: "/dashboard/search",
  RECIPE: "/dashboard/recipe",
};
