const config = {
    projectId: process.env.SANITY_PROJECT_ID || "6agoqweu",
    dataset: process.env.SANITY_DATASET || "production",
    apiVersion: process.env.SANITY_API_VERSION || "2025-05-15", // YYYY-MM-DD
    useCdn: false, // Live API higher costs.. 
    withDraft: true
}



export default config;