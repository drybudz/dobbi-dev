import "./../globals.css";
import { AppProvider } from "../components/AppContext";
import { getPages } from "../../../sanity/schemas/sanity-utils";
import HeaderNavigation from "../components/HeaderNavigation";
import Footer from "../components/Footer";
import HomeChecker from "../components/HomeChecker";
import { getAllPagesData } from "../../../sanity/schemas/sanity-utils";
import { getAllDobbiData } from "../../../sanity/schemas/sanity-utils";
import styles from "./layout.module.css"


export const metadata = {
  title: "Dobbi Website 2025",
  description: "Generated with Next + Sanity",
};

export const revalidate = 300; // Revalidate every 5 minutes

export default async function RootLayout({ children }) {
  //get all Pages Changes except About
  // const data = await getPages(); // The getPages function now returns an object
  // const pages = data?.pages || []; // Access the 'pages' array

  const allData = await getAllDobbiData();
  console.log("All Data:", allData); //  line to check the data structure
  const pages = allData?.pages || [];
  const footer = allData?.pageFooter || [];
  // console.log("Footer @ Layout------:", footer); // Is working
  
  const homePageData = allData?.homepage || null;
  const aboutPageData = allData?.aboutPage || null;
  // console.log("ABT @ Layout------:", aboutPageData); // Is working
  const pagesData = allData?.pages || []; // Or adjust as needed for TALENT/WORK
  // console.log("PGs @ Layout------:", pagesData); // Check if there are 2 pages, yes, 0 Talent, 1 Work
  
  // Layout of the Pages //Except Studio - - - - - PAGES
  return (
    <html lang="en">
      <head>
      </head>
      <body className={styles.body}>
        <AppProvider initialData={allData}>
          <div className={styles.siteContainer}>
            <HomeChecker />
            <HeaderNavigation pages={pages} />
            <main className={styles.mainContent}>{children}</main>
            <Footer />
          </div>
        </AppProvider>
      </body>
    </html>
  );
}
