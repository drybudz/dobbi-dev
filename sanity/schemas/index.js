import homePage from "./homepage-schema";
import aboutPage from "./aboutpage-schema";
// import servicesPage from "./servicespage-schema"; // Removed - fields moved to homePage
import workPage from "./workpage-schema";
import contactPage from "./contactpage-schema";
import contactSubmission from "./contactsubmission-schema";
import project from "./project-schema";
import pageFooter from "./pagefooter-schema";

const schemas = [
  homePage,
  aboutPage,
  // servicesPage, // Removed - fields moved to homePage
  workPage,
  contactPage,
  contactSubmission,
  project,
  pageFooter,
];

export default schemas;
