const basePath = "";

export const ROUTES = {
  home: `${basePath}/`,
  collections: {
    index: `${basePath}/collections`,
    add: `${basePath}/collections/add`,
    edit: `${basePath}/collections/edit`,
    id: (id: string) => `${basePath}/collections/${id}`
  },
  samples: `${basePath}/samples`
};
