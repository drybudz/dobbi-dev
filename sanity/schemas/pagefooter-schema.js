const pageFooter = {
    name: 'pageFooter',
    title: 'Page Footer',
    type: 'document',
    fields: [
      {
        name: 'copyrightBrandName',
        title: 'Copyright Brand Name',
        type: 'string',
        description: 'Brand name for copyright (e.g., your company name).',
      },
      {
        name: 'copyrightText',
        title: 'Copyright Text',
        type: 'text',
        description: 'Copyright information text.',
      },
      {
        name: 'copyrightYear',
        title: 'Copyright Year',
        type: 'string',
        description: 'Year for copyright (e.g., "2023" or "2020-2023").',
      },
      {
        name: 'connectLinks',
        title: 'Connect Links',
        type: 'array',
        of: [
          {
            type: 'object',
            fields: [
              {
                name: 'linkTitle',
                title: 'Link Title',
                type: 'string',
                description: 'Title of the link (e.g., Instagram, Email).',
              },
              {
                name: 'linkUrl',
                title: 'Link URL',
                type: 'url',
                description: 'The URL for the link.',
              },
              {
                name: 'openNewTab',
                title: 'Open in New Tab',
                type: 'boolean',
                description: 'Check to open link in new tab.',
                initialValue: true,
              },
            ],
            preview: {
              select: {
                title: 'linkTitle',
                subtitle: 'linkUrl',
              },
            },
          },
        ],
        description: 'Links for social media or contact (appears in footer).',
      },
    ],
    preview: {
      select: {
        title: 'copyrightBrandName',
        subtitle: 'copyrightYear',
      },
    },
  };
  
  export default pageFooter;