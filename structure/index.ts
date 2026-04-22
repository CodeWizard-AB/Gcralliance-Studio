import {StructureResolver} from 'sanity/structure'

export const structure: StructureResolver = (S) =>
  S.list()
    .title('GCRAlliance Studio')
    .items([
      // * (Pages) Singletons
      S.listItem()
        .title('Pages')
        .icon(() => '📄')
        .child(
          S.list()
            .title('Pages')
            .items([
              S.listItem()
                .title('Home Page')
                .icon(() => '🏠')
                .child(S.document().schemaType('homePage')),
              S.listItem()
                .title('About Page')
                .icon(() => 'ℹ️')
                .child(
                  S.document().schemaType('aboutPage').documentId('aboutPage').title('About Page'),
                ),
              S.listItem()
                .title('Membership Page')
                .icon(() => '👥')
                .child(
                  S.document()
                    .schemaType('membershipPage')
                    .documentId('membershipPage')
                    .title('Membership Page'),
                ),
            ]),
        ),

      S.divider(),

      // * Content
      S.listItem()
        .title('Blog Posts')
        .icon(() => '✍️')
        .schemaType('post')
        .child(S.documentTypeList('post').title('Blog Posts')),

      S.listItem()
        .title('Events')
        .icon(() => '📅')
        .schemaType('event')
        .child(S.documentTypeList('event').title('Events')),

      S.divider(),

      // * People
      S.listItem()
        .title('Ambassadors')
        .icon(() => '🌍')
        .schemaType('ambassador')
        .child(S.documentTypeList('ambassador').title('Ambassadors')),

      S.listItem()
        .title('Team Members')
        .icon(() => '👤')
        .schemaType('teamMember')
        .child(S.documentTypeList('teamMember').title('Team Members')),

      S.listItem()
        .title('Authors')
        .icon(() => '🖊️')
        .schemaType('author')
        .child(S.documentTypeList('author').title('Authors')),

      S.divider(),

      // * Taxonomy
      S.listItem()
        .title('Categories')
        .icon(() => '🏷️')
        .schemaType('category')
        .child(S.documentTypeList('category').title('Categories')),

      S.divider(),

      // * Settings (Singletons)
      S.listItem()
        .title('Settings')
        .icon(() => '⚙️')
        .child(
          S.list()
            .title('Settings')
            .items([
              S.listItem()
                .title('Site Settings')
                .icon(() => '🌐')
                .child(
                  S.document()
                    .schemaType('siteSettings')
                    .documentId('siteSettings')
                    .title('Site Settings'),
                ),
              S.listItem()
                .title('Navigation')
                .icon(() => '🧭')
                .child(
                  S.document()
                    .schemaType('navigationSettings')
                    .documentId('navigationSettings')
                    .title('Navigation Settings'),
                ),
            ]),
        ),
    ])
