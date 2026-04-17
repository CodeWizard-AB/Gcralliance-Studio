import {StructureResolver} from 'sanity/structure'

export const structure: StructureResolver = (S) => {
  S.list()
    .title('Gcalliance Content')
    .items([
      // Pages
      S.listItem()
        .title('Pages')
        .icon('document')
        .child(
          S.list()
            .title('Pages')
            .items([
              S.listItem()
                .title('Home')
                .icon('home')
                .child(S.document().schemaType('home').documentId('home')),
              S.listItem()
                .title('About Us')
                .icon('info')
                .child(S.document().schemaType('aboutUs').documentId('aboutUs')),
              S.listItem()
                .title('Contact Us')
                .icon('phone')
                .child(S.document().schemaType('contactUs').documentId('contactUs')),
            ]),
        ),
      // Content
      // People
      // Taxonomy
      // Settings
    ])
}
