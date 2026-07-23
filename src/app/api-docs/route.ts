import { ApiReference } from '@scalar/nextjs-api-reference';

const config = {
  spec: { url: "/openapi.json" },
  defaultOpenAllTags: false,
};


export const GET = ApiReference(config);
