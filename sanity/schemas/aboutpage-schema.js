const aboutPage = {
  name: 'aboutPage',
  title: 'About Page',
  type: 'document',
  groups: [
    {
      name: 'general',
      title: 'General Information',
      default: true,
    },
    {
      name: 'horizontalImages',
      title: 'Horizontal Images Section',
    },
    {
      name: 'aboutBand',
      title: 'About Band Section',
    },
    {
      name: 'workKeys',
      title: 'Work Keys Section',
    },
    {
      name: 'miniGallery',
      title: 'Mini Gallery',
    },
    {
      name: 'chatLink',
      title: 'Chat Link',
    },
  ],
  fields: [
    // General Information Group
    {
      name: 'title',
      title: 'Page Title',
      type: 'string',
      description: 'The main title (for navigation use).',
      group: 'general',
    },
    {
      name: 'aboutTitle',
      title: 'About Title',
      type: 'text',
      group: 'general',
    },
    {
      name: 'aboutDescription',
      title: 'About Description',
      type: 'text',
      group: 'general',
    },

    // Horizontal Images Group
    {
      name: 'horizontalImageTopImage',
      title: 'Top Horizontal Image',
      type: 'image',
      options: { hotspot: true },
      fields: [
        {
          name: 'alt',
          title: 'Alt Text',
          type: 'string',
        },
      ],
      group: 'horizontalImages',
    },
    {
      name: 'horizontalImageTopText',
      title: 'Top Horizontal Image Text',
      type: 'text',
      group: 'horizontalImages',
    },
    {
      name: 'horizontalImageBottomImage',
      title: 'Bottom Horizontal Image',
      type: 'image',
      options: { hotspot: true },
      fields: [
        {
          name: 'alt',
          title: 'Alt Text',
          type: 'string',
        },
      ],
      group: 'horizontalImages',
    },
    {
      name: 'horizontalImageBottomText',
      title: 'Bottom Horizontal Image Text',
      type: 'text',
      group: 'horizontalImages',
    },
    {
      name: 'aboutCTALinks',
      title: 'About CTA Links',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'title',
              title: 'Title',
              type: 'string',
              description: 'Text displayed on the button',
            },
            {
              name: 'slug',
              title: 'Slug',
              type: 'string',
              description: 'URL for the button. Use "/page" for internal pages or full URL for external links.',
            },
          ],
          preview: {
            select: {
              title: 'title',
              subtitle: 'slug',
            },
          },
        },
      ],
      validation: Rule => Rule.max(2),
      description: 'CTA links displayed below the bottom horizontal image text (max 2).',
      group: 'horizontalImages',
    },

    // About Band Group
    {
      name: 'aboutBandTitle',
      title: 'About Band Title',
      type: 'text',
      group: 'aboutBand',
    },
    {
      name: 'aboutBandText',
      title: 'About Band Text',
      type: 'text',
      group: 'aboutBand',
    },
    {
      name: 'aboutLargeImage',
      title: 'Large About Image',
      type: 'image',
      options: { hotspot: true },
      fields: [
        {
          name: 'alt',
          title: 'Alt Text',
          type: 'string',
        },
      ],
      group: 'aboutBand',
    },
    {
      name: 'aboutMediumImage',
      title: 'Medium About Image',
      type: 'image',
      options: { hotspot: true },
      fields: [
        {
          name: 'alt',
          title: 'Alt Text',
          type: 'string',
        },
      ],
      group: 'aboutBand',
    },
    {
      name: 'aboutSmallImages',
      title: 'Small About Images (Max 4)',
      type: 'array',
      of: [
        {
          type: 'image',
          options: { hotspot: true },
          fields: [
            {
              name: 'alt',
              title: 'Alt Text',
              type: 'string',
            },
          ],
        },
      ],
      validation: Rule => Rule.max(4),
      group: 'aboutBand',
    },

    // Work Keys Group
    {
      name: 'workKeysTitle',
      title: 'Work Keys Title',
      type: 'string',
      group: 'workKeys',
    },
    {
      name: 'workKeysSubtitle',
      title: 'Work Keys Subtitle',
      type: 'text',
      group: 'workKeys',
    },
    {
      name: 'workKeysList',
      title: 'Work Keys (Max 5)',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'keyTitle',
              title: 'Key Title',
              type: 'string',
            },
            {
              name: 'keyDescription',
              title: 'Key Description',
              type: 'text',
            },
          ],
          preview: {
            select: {
              title: 'keyTitle',
              subtitle: 'keyDescription',
            },
          },
        },
      ],
      validation: Rule => Rule.max(5),
      group: 'workKeys',
    },

    // Chat Link Group
    {
      name: 'chatLinkTitle',
      title: 'Chat Link Title',
      description: 'Any break of line will only display in mobile under 757px',
      type: 'text',
      group: 'chatLink',
    },
    {
      name: 'chatLinkAction',
      title: 'Chat Link Action',
      type: 'string',
      description: 'The action/URL for the chat link',
      group: 'chatLink',
    },

    // Mini Gallery Group
    {
      name: 'miniGallery',
      title: 'Mini Gallery Images (Max 12)',
      type: 'array',
      of: [
        {
          type: 'image',
          options: { hotspot: true },
          fields: [
            {
              name: 'alt',
              title: 'Alt Text',
              type: 'string',
            },
          ],
        },
      ],
      validation: Rule => Rule.max(12),
      group: 'miniGallery',
    },
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'aboutTitle',
    },
  },
};

export default aboutPage;