const contactPage = {
    name: 'contactPage',
    title: 'Contact Page',
    type: 'document',
    fields: [
      {
        name: 'contactTitle',
        title: 'Contact Title',
        type: 'string',
        description: 'Main headline displayed on the contact page',
      },
      {
        name: 'contactDescription',
        title: 'Contact Description',
        type: 'text',
        description: 'Main description for the contact page. This field will not appear on the page if left empty.',
      },
    ],
    preview: {
      select: {
        title: 'contactTitle',
      },
      prepare(selection) {
        const { title } = selection;
        return {
          title: title || 'Untitled Contact Page',
        };
      },
    },
  };
  
  export default contactPage;

