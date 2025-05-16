const workPage = {
    name: 'workPage',
    title: 'Work Page',
    type: 'document',
    fields: [
      {
        name: 'pageTitle',
        title: 'Page Title (Internal)',
        type: 'string',
        description: 'Administrative title for CMS organization',
      },
      {
        name: 'workPageTitle',
        title: 'Work Page Title',
        type: 'string',
        description: 'Main headline displayed on the page',
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
        description: 'Select projects to display (will show their name, client, year, and images)',
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