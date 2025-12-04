const workPage = {
    name: 'workPage',
    title: 'Work Page',
    type: 'document',
    fields: [
      {
        name: 'pageTitle',
        title: 'Page Title',
        type: 'string',
        description: 'The main title (for navigation use).',
      },
      {
        name: 'workPageTitle',
        title: 'Work Page Title',
        type: 'string',
        description: 'Main headline displayed on the page',
      },
      {
        name: 'workDescription',
        title: 'Work Description',
        type: 'text',
        description: 'Main description for the work page',
      },
      {
        name: 'workPageSubtitle',
        title: 'Work Page Subtitle',
        type: 'string',
        description: 'Subtitle displayed on the work page',
      },
      {
        name: 'workPageCTATitle',
        title: 'Work Page CTA Title',
        type: 'string',
        description: 'Title displayed above the CTA buttons',
      },
      {
        name: 'workPageCTAButtons',
        title: 'Work Page CTA Buttons',
        type: 'array',
        of: [
          {
            type: 'object',
            fields: [
              {
                name: 'ctaText',
                title: 'CTA Text',
                type: 'string',
                description: 'Text displayed on the button',
              },
              {
                name: 'ctaUrl',
                title: 'CTA URL',
                type: 'string',
                description: 'URL for the button. Use "/page" for internal pages or full URL for external links.',
              },
              {
                name: 'openInNewTab',
                title: 'Open in New Tab',
                type: 'boolean',
                description: 'Check to open link in new tab.',
                initialValue: false,
              },
            ],
            preview: {
              select: {
                title: 'ctaText',
                subtitle: 'ctaUrl',
              },
            },
          },
        ],
        description: 'CTA buttons displayed on the work page',
      },
      {
        name: 'featuredProjects',
        title: 'Featured Projects',
        type: 'array',
        of: [
            { 
            type: 'reference', 
            to: { type: 'project' } 
        }],
        description: 'Select projects to display (will show their name, client, year, and images). Do not repeat projects.',
      },
    ],
    preview: {
      select: {
        title: 'pageTitle',
        subtitle: 'workPageTitle',
        media: 'featuredProjects.0.largeProjectImages.0.asset',
      },
      prepare(selection) {
        const { title, subtitle, media } = selection;
        return {
          title: title || 'Untitled Work Page',
          subtitle: subtitle || 'No work page title set',
          media,
        };
      },
    },
  };
  
  export default workPage;