const project = {
  name: 'project',
  title: 'Projects',
  type: 'document',
  groups: [
    {
      name: 'general',
      title: 'General Information',
      default: true,
    },
    {
      name: 'images',
      title: 'Project Images',
    },
    {
      name: 'about',
      title: 'About Project',
    },
    {
      name: 'stats',
      title: 'Project Statistics',
    },
    {
      name: 'footer',
      title: 'Footer',
    },
  ],
  fields: [
    // General Information Group
    {
      name: 'name',
      title: 'Name',
      type: 'string',
      description: 'The name of the project.',
      group: 'general',
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'name' },
      group: 'general',
    },
    {
      name: 'clientName',
      title: 'Client Name',
      type: 'string',
      description: 'The name of the client for this project.',
      group: 'general',
    },
    {
      name: 'projectYear',
      title: 'Project Year',
      type: 'string',
      description: 'The year the project was completed or launched.',
      group: 'general',
    },

    // Images Group
    {
      name: 'largeProjectImages',
      title: 'Large Project Images',
      type: 'array',
      of: [
        {
          type: 'image',
          options: {
            hotspot: true,
          },
          fields: [
            {
              name: 'alt',
              title: 'Alt Text',
              type: 'string',
            },
          ],
        },
      ],
      description: 'Large images for the project (first image used as Feature Image).',
      group: 'images',
    },
    {
      name: 'mediumProjectImages',
      title: 'Medium Project Images',
      type: 'array',
      of: [
        {
          type: 'image',
          options: {
            hotspot: true,
          },
          fields: [
            {
              name: 'alt',
              title: 'Alt Text',
              type: 'string',
            },
          ],
        },
      ],
      description: 'Medium images for the project.',
      group: 'images',
    },
    {
      name: 'smallProjectImages',
      title: 'Small Project Images',
      type: 'array',
      of: [
        {
          type: 'image',
          options: {
            hotspot: true,
          },
          fields: [
            {
              name: 'alt',
              title: 'Alt Text',
              type: 'string',
            },
          ],
        },
      ],
      description: 'Small images for the project.',
      group: 'images',
    },

    // About Project Group
    {
      name: 'aboutProject1',
      title: 'Title About Project 1',
      type: 'string',
      description: 'Title for 1st block About Project Info',
      group: 'about',
    },
    {
      name: 'aboutProjectText1',
      title: 'Description About Project 1',
      type: 'text',
      description: 'Description for 1st block About Project Info',
      group: 'about',
    },
    {
      name: 'aboutProject2',
      title: 'Title About Project 2',
      type: 'string',
      description: 'Title for 2nd block About Project Info',
      group: 'about',
    },
    {
      name: 'aboutProjectText2',
      title: 'Description About Project 2',
      type: 'text',
      description: 'Description for 2nd block About Project Info',
      group: 'about',
    },

    // Stats Group
    {
      name: 'statsTitle1',
      title: 'Stats Title 1',
      type: 'string',
      description: 'Text for Stats 1',
      group: 'stats',
    },
    {
      name: 'statsString1',
      title: 'Stats String 1',
      type: 'string',
      description: 'Value for Stats 1',
      group: 'stats',
    },
    {
      name: 'statsTitle2',
      title: 'Stats Title 2',
      type: 'string',
      description: 'Text for Stats 2',
      group: 'stats',
    },
    {
      name: 'statsString2',
      title: 'Stats String 2',
      type: 'string',
      description: 'Value for Stats 2',
      group: 'stats',
    },
    {
      name: 'statsTitle3',
      title: 'Stats Title 3',
      type: 'string',
      description: 'Text for Stats 3',
      group: 'stats',
    },
    {
      name: 'statsString3',
      title: 'Stats String 3',
      type: 'string',
      description: 'Value for Stats 3',
      group: 'stats',
    },
    {
      name: 'projectFPO',
      title: 'Project FPO',
      type: 'text',
      description: 'Description of the project located at the end of the page.',
      group: 'about',
    },

    // Footer Group
    {
      name: 'footer',
      title: 'Footer Reference',
      type: 'reference',
      to: { type: 'pageFooter' },
      description: 'Footer to associate with this project.',
      group: 'footer',
    }
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'clientName',
      media: 'largeProjectImages.0.asset',
    },
  },
};

export default project;