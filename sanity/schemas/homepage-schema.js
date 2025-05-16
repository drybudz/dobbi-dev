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
      name: 'whatWeDo',
      title: 'What We Do Section',
    },
    {
      name: 'projects',
      title: 'Projects Section',
    },
    {
      name: 'solutions',
      title: 'Solutions Section',
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

    // What We Do Section Group
    {
      name: 'whatTitle',
      title: 'What Title',
      type: 'string',
      description: 'Title for the section under the home banner.',
      group: 'whatWeDo',
    },
    {
      name: 'whatDescription',
      title: 'What Description',
      type: 'text',
      description: 'Description for the section under the home banner.',
      group: 'whatWeDo',
    },

    // Projects Section Group
    {
      name: 'homeBeforeProjectDescription',
      title: 'Before Projects Description',
      type: 'text',
      description: 'Text to display before featured projects.',
      group: 'projects',
    },
    {
      name: 'featuredProjects',
      title: 'Featured Projects',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: { type: 'project' }
        }
      ],
      description: 'Projects to feature on the home page (will use first large image).',
      group: 'projects',
    },
    {
      name: 'homeAfterProjectDescription',
      title: 'After Projects Description',
      type: 'text',
      description: 'Text to display after featured projects.',
      group: 'projects',
    },
    {
      name: 'homeGroupTitle',
      title: 'Group Title',
      type: 'string',
      description: 'Title for the group section under featured project.',
      group: 'projects',
    },

    // Solutions Section Group
    {
      name: 'solutions',
      title: 'Solutions',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'solutionTitle',
              title: 'Solution Title',
              type: 'string',
              description: 'Title for this solution.',
            },
            {
              name: 'solutionTextA',
              title: 'Solution Text (Part A)',
              type: 'text',
              description: 'First part of solution description.',
            },
            {
              name: 'solutionTextB',
              title: 'Solution Text (Part B)',
              type: 'text',
              description: 'Second part of solution description.',
            },
          ],
          preview: {
            select: {
              title: 'solutionTitle',
              subtitle: 'solutionTextA',
            },
          },
        },
      ],
      validation: Rule => Rule.max(5),
      description: 'List of solutions (max 5).',
      group: 'solutions',
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
      name: 'connectName',
      title: 'Connect Name',
      type: 'string',
      description: 'Name for the connect section.',
      group: 'connect',
    },
    {
      name: 'connectEmail',
      title: 'Connect Email',
      type: 'string',
      description: 'Email for the connect section.',
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