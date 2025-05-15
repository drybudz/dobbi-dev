import {defineConfig} from 'sanity'
// import {deskTool} from "sanity/desk"
import {structureTool} from 'sanity/structure'
// import project from './sanity/schemas/project-schema'; //old version before refactor
import schemas from './sanity/schemas'; //Barrel file
// import {visionTool} from '@sanity/vision'

const config = defineConfig({
    title: 'Dobbi Studio Dev',
    // projectId :2j7eol5d
    //apiVersion YYYY-MM-DD

    projectId: '6agoqweu',
    dataset: 'production',
    apiVersion: "2025-05-15",
    basePath: "/admin", //Access to Sanity Studio
  
    plugins: [structureTool()],
    schema: {
        types: schemas
    },
})
export default config;
