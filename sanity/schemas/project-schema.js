import stat from './stat';

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
    }
  ],
  fields: [
    // General Information Group
    {
      name: 'name',
      title: 'Project Name',
      type: 'string',
      description: 'The name of the project (used to generate the URL slug).',
      group: 'general',
      validation: Rule => Rule.required().error('Project name is required'),
    },
    {
      name: 'slug',
      title: 'Project URL Slug',
      type: 'slug',
      description: 'The unique URL-friendly identifier for this project (auto-generated from name but can be customized).',
      options: {
        source: 'name',
        maxLength: 96, // Recommended for SEO
        slugify: input => input
          .toLowerCase()
          .replace(/\s+/g, '-')    // Replace spaces with -
          .replace(/[^\w\-]+/g, '') // Remove non-word chars
          .slice(0, 96)             // Trim to 96 chars
      },
      group: 'general',
      validation: Rule => Rule.required().error('Slug is required for URLs'),
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
    {
      name: 'stats',
      title: 'Stats',
      type: 'array',
      of: [{ type: 'stat' }],
      description: 'List of stats for the project',
      group: 'stats',
    },
    {
      name: 'projectFPO',
      title: 'Project FPO',
      type: 'text',
      description: 'Description of the project located at the end of the page.',
      group: 'about',
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