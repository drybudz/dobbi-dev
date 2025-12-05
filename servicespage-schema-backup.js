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
      {
        name: 'servicesSection',
        title: 'Services Section',
      },
    ],
    fields: [
      // Main Content Group
      {
        name: 'title',
        title: 'Page Title',
        type: 'string',
        description: 'The main title (for navigation use).',
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
      // --- Services Field ---
      {
        name: 'servicesList',
        title: 'List of Services',
        type: 'array',
        of: [
          {
            type: 'object',
            name: 'serviceItem', // Unique name for the object type
            title: 'Service',
            fields: [
              {
                name: 'serviceTitle',
                title: 'Service Title',
                type: 'string',
                description: 'The title of this service.',
              },
              {
                name: 'serviceDescription',
                title: 'Service Description',
                type: 'text',
                description: 'A brief description of this service.',
              },
              {
                name: 'serviceOptions',
                title: 'Service Options (Max 3)',
                type: 'array',
                of: [
                  {
                    type: 'string', // Each option is a simple string
                    title: 'Option',
                  },
                ],
                validation: Rule => Rule.max(3).error('You can add a maximum of 3 options per service.'),
                description: 'List up to 3 options for this service.',
              },
            ],
            preview: {
              select: {
                title: 'serviceTitle',
                subtitle: 'serviceDescription',
              },
            },
          },
        ],
        description: 'Add and manage individual services with their descriptions and options.',
        group: 'servicesSection', // Assign to the new services group
      },
      // --- End New Services Field ---

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
        title: 'Side Middle Title',
        type: 'string',
        description: 'Title for the side content middle section',
        group: 'sideContent',
      },
      {
        name: 'servicesSideDescription',
        title: 'Side Middle Description',
        type: 'text',
        description: 'Description for the side content middle section',
        group: 'sideContent',
      },
      {
        name: 'servicesSideList',
        title: 'Side Middle Horizontal List',
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