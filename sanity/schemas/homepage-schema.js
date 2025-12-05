const homePage = {
  name: 'homePage',
  title: 'Home Page',
  type: 'document',
  groups: [
    {
      name: 'general',
      title: 'General Information',
      default: true,
    },
    {
      name: 'banner',
      title: 'Banner Section',
    },
    {
      name: 'homeServices',
      title: 'Home Services Section',
    },
    {
      name: 'connect',
      title: 'Connect Section',
    },
    {
      name: 'seo',
      title: 'SEO',
    },
  ],
  fields: [
    // General Information Group
    {
      name: 'slug',
      title: 'Page Slug',
      type: 'string',
      description: 'URL path for this page (e.g., "/" or "/home"). Defaults to "/" for home page.',
      group: 'general',
      initialValue: '/',
      validation: Rule => Rule.custom((slug) => {
        if (!slug) return 'Slug is required';
        if (!slug.startsWith('/')) {
          return 'Slug must start with "/"';
        }
        return true;
      }),
    },
    {
      name: 'companyName',
      title: 'Company Name',
      type: 'string',
      description: 'The name of the company.',
      group: 'general',
    },
    {
      name: 'companyLogoBlack',
      title: 'Company Logo (Black)',
      type: 'image',
      options: {
        hotspot: true,
      },
      fields: [
        {
          name: 'alt',
          title: 'Alt Text',
          type: 'string',
          description: 'Alternative text for the black logo.',
        },
      ],
      description: 'Black version of the company logo.',
      group: 'general',
    },
    {
      name: 'companyLogoWhite',
      title: 'Company Logo (White)',
      type: 'image',
      options: {
        hotspot: true,
      },
      fields: [
        {
          name: 'alt',
          title: 'Alt Text',
          type: 'string',
          description: 'Alternative text for the white logo.',
        },
      ],
      description: 'White version of the company logo.',
      group: 'general',
    },
    {
      name: 'slogan',
      title: 'Slogan',
      type: 'string',
      description: 'The main slogan for the home page.',
      group: 'general',
    },
    // Banner Section Group
{
  name: 'imageDisplayOption',
  title: 'Image Display Option',
  type: 'string',
  options: {
    list: [
      { title: 'Use all images', value: 'useAll' },
      { title: 'Repeat 1st Image', value: 'repeatFirst' },
      { title: 'Display no images', value: 'noImages' },
    ],
    layout: 'radio', // Optional: Use 'radio' for buttons instead of a dropdown
  },
  initialValue: 'useAll',
  description: 'Controls how images are displayed in the hero banner. Repeat is based on the first medium image of the first project.',
  group: 'banner',
},


    // Banner Section Group
    {
      name: 'bannerProjects',
      title: 'Banner Project Images',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: { type: 'project' }
        }
      ],
      description: 'Projects to display in the home banner.',
      group: 'banner',
    },

    // Home Services Section Group
    {
      name: 'homeServicesTitle',
      title: 'Home Services Title',
      type: 'text',
      description: 'Main title for the services section',
      group: 'homeServices',
    },
    {
      name: 'homeServicesDescription',
      title: 'Home Services Description',
      type: 'text',
      description: 'Main description for the services section',
      group: 'homeServices',
    },
    {
      name: 'homeServicesList',
      title: 'Home Services List',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'homeServiceItem',
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
                  type: 'string',
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
      group: 'homeServices',
    },

    // Connect Section Group
    {
      name: 'connectTitle',
      title: 'Connect Title',
      type: 'string',
      description: 'Title for the connect section.',
      group: 'connect',
    },
    {
      name: 'connectCTALinks',
      title: 'Connect CTA Links',
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
      description: 'CTA buttons displayed in the connect section.',
      group: 'connect',
    },

    // SEO Group
    {
      name: 'seoTitle',
      title: 'SEO Title',
      type: 'string',
      group: 'seo',
      description: 'Title for search engine results.',
    },
    {
      name: 'seoDescription',
      title: 'SEO Description',
      type: 'text',
      group: 'seo',
      description: 'Description for search engine results.',
    },
    {
      name: 'keywords',
      title: 'Keywords',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'Relevant keywords for search engines.',
      group: 'seo',
    },
  ],
  preview: {
    select: {
      title: 'companyName',
      media: 'companyLogoBlack',
    },
  },
};

export default homePage;