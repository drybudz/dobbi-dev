const siteNavigation = {
  name: 'siteNavigation',
  title: 'Site Navigation',
  type: 'document',
  fields: [
    {
      name: 'navigationItems',
      title: 'Navigation Items',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'title',
              title: 'Title',
              type: 'string',
              description: 'Display text for the navigation link (e.g., "Home", "About", "Work").',
            },
            {
              name: 'slug',
              title: 'Slug / URL',
              type: 'string',
              description: 'URL path for internal pages (e.g., "/", "/about", "/work") or full URL for external links (e.g., "https://example.com").',
              validation: Rule => Rule.required().custom((slug) => {
                if (!slug) return 'Slug/URL is required';
                // Check if it's an internal link (starts with /)
                if (slug.startsWith('/')) {
                  return true;
                }
                // Check if it's a valid external URL
                if (slug.startsWith('http://') || slug.startsWith('https://')) {
                  try {
                    new URL(slug);
                    return true;
                  } catch {
                    return 'Invalid URL format';
                  }
                }
                return 'Must be an internal path (starting with "/") or a valid URL (starting with "http://" or "https://")';
              }),
            },
            {
              name: 'openInNewTab',
              title: 'Open in New Tab',
              type: 'boolean',
              description: 'Open link in a new tab (only shown for external links).',
              initialValue: true,
              hidden: ({ parent }) => {
                // Hide this field if the slug is an internal link (starts with "/")
                return parent?.slug?.startsWith('/');
              },
            },
            {
              name: 'description',
              title: 'Description',
              type: 'text',
              description: 'Optional description for this navigation item (used in guides).',
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
      description: 'Add and manage navigation items. These will appear in the header navigation.\n\n• The logo on the left side of the navigation takes you home.\n\n• In case you want to add "Home" to the Navigation items, just use "/" for the slug while creating a new item.',
    },
  ],
  preview: {
    select: {
      items: 'navigationItems',
    },
    prepare(selection) {
      const { items } = selection;
      const count = items?.length || 0;
      return {
        title: 'Site Navigation',
        subtitle: `${count} navigation item${count !== 1 ? 's' : ''}`,
      };
    },
  },
};

export default siteNavigation;

