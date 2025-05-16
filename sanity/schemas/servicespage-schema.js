const servicesPage = {
    name: 'servicesPage',
    title: 'Services Page',
    type: 'document',
    groups: [
      {
        name: 'main',
        title: 'Main Content',
        default: true,
      },
      {
        name: 'sideContent',
        title: 'Side Content',
      },
    ],
    fields: [
      // Main Content Group
      {
        name: 'title',
        title: 'Page Title',
        type: 'string',
        description: 'The main title of the Services Page (for internal use).',
        group: 'main',
      },
      {
        name: 'servicesTitle',
        title: 'Services Title',
        type: 'text',
        description: 'Main title for the services page',
        group: 'main',
      },
      {
        name: 'servicesDescription',
        title: 'Services Description',
        type: 'text',
        description: 'Main description for the services page',
        group: 'main',
      },
  
      // Side Content Group
      {
        name: 'servicesSideListTop',
        title: 'Side List (Top)',
        type: 'array',
        of: [{ type: 'string' }],
        description: 'List items that will appear at the top of the side content',
        group: 'sideContent',
      },
      {
        name: 'servicesSideTitle',
        title: 'Side Title',
        type: 'string',
        description: 'Title for the side content middle section',
        group: 'sideContent',
      },
      {
        name: 'servicesSideDescription',
        title: 'Side Description',
        type: 'text',
        description: 'Description for the side content middle section',
        group: 'sideContent',
      },
      {
        name: 'servicesSideList',
        title: 'Side List (Middle)',
        type: 'array',
        of: [
          {
            type: 'object',
            fields: [
              {
                name: 'item',
                title: 'List Item',
                type: 'string',
              },
            ],
            preview: {
              select: {
                title: 'item',
              },
            },
          },
        ],
        validation: Rule => Rule.max(3),
        description: 'Main list items for the side middle content (max 3)',
        group: 'sideContent',
      },
      {
        name: 'servicesSideListBottom',
        title: 'Side List (Bottom)',
        type: 'array',
        of: [{ type: 'string' }],
        description: 'List items that will appear at the bottom of the side content',
        group: 'sideContent',
      },
    ],
    preview: {
      select: {
        title: 'title'
      },
    },
  };
  
  export default servicesPage;