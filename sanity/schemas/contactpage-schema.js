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
      {
        name: 'formNamePlaceholder',
        title: 'Name Field Placeholder',
        type: 'string',
        description: 'Placeholder text for the Name input field',
        initialValue: 'here',
      },
      {
        name: 'formEmailPlaceholder',
        title: 'Email Field Placeholder',
        type: 'string',
        description: 'Placeholder text for the Email input field',
        initialValue: 'here',
      },
      {
        name: 'formCompanyPlaceholder',
        title: 'Company Field Placeholder',
        type: 'string',
        description: 'Placeholder text for the Company input field',
        initialValue: 'here',
      },
      {
        name: 'formInterestedInPlaceholder',
        title: 'Interested In Field Placeholder',
        type: 'string',
        description: 'Placeholder text for the Interested In input field',
        initialValue: 'here',
      },
      {
        name: 'formSuccessMessage',
        title: 'Success Message',
        type: 'text',
        description: 'Message displayed after successful form submission. Supports line breaks.',
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

