const contactSubmission = {
    name: 'contactSubmission',
    title: 'Contact Submissions',
    type: 'document',
    fields: [
      {
        name: 'name',
        title: 'Name',
        type: 'string',
        readOnly: true,
      },
      {
        name: 'email',
        title: 'Email',
        type: 'string',
        readOnly: true,
      },
      {
        name: 'company',
        title: 'Company',
        type: 'string',
        readOnly: true,
      },
      {
        name: 'interestedIn',
        title: 'Interested In',
        type: 'text',
        readOnly: true,
      },
      {
        name: 'submittedAt',
        title: 'Submitted At',
        type: 'datetime',
        readOnly: true,
        initialValue: () => new Date().toISOString(),
      },
      {
        name: 'ipAddress',
        title: 'IP Address',
        type: 'string',
        readOnly: true,
        description: 'IP address of the submitter (for rate limiting)',
      },
      {
        name: 'botDetected',
        title: 'Bot Detected',
        type: 'boolean',
        readOnly: true,
        initialValue: false,
        description: 'Whether this submission was flagged as a bot',
      },
    ],
    preview: {
      select: {
        name: 'name',
        email: 'email',
        submittedAt: 'submittedAt',
        botDetected: 'botDetected',
      },
      prepare(selection) {
        const { name, email, submittedAt, botDetected } = selection;
        const date = submittedAt ? new Date(submittedAt).toLocaleDateString() : 'No date';
        const botFlag = botDetected ? ' [BOT]' : '';
        return {
          title: `${name || 'Anonymous'}${botFlag}`,
          subtitle: `${email || 'No email'} - ${date}`,
        };
      },
    },
    orderings: [
      {
        title: 'Submitted At (Newest)',
        name: 'submittedAtDesc',
        by: [{ field: 'submittedAt', direction: 'desc' }],
      },
    ],
  };
  
  export default contactSubmission;

