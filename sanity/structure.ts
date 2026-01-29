import type {StructureResolver} from 'sanity/structure'

// https://www.sanity.io/docs/structure-builder-cheat-sheet
export const structure: StructureResolver = (S) =>
  S.list()
    .title('Content')
    .items([
      S.listItem()
        .title('Landing Page')
        .id('landingPage')
        .child(S.document().schemaType('landingPage').documentId('landingPage')),
      ...S.documentTypeListItems().filter((listItem) => listItem.getId() !== 'landingPage'),
    ])
