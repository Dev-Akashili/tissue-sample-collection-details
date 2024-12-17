const basePath = "";

export const ROUTES = {
  home: `${basePath}/`,
  collections: {
    index: `${basePath}/collections`,
    add: `${basePath}/collections/add`,
    edit: (id: number) => `${basePath}/collections/edit/${id}`,
    samples: (id: string | number) => `${basePath}/collections/${id}`
  },
  samples: {
    index: `${basePath}/samples`,
    add: (collectionId: number) => `${basePath}/samples/${collectionId}/add`,
    edit: (id: number, collectionId: number) => `${basePath}/samples/${collectionId}/edit/${id}`
  }
};
