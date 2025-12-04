import { createClient, groq } from "next-sanity"
import clientConfig from "./../config/client-config"

export async function getAllDobbiData() {
    return createClient(clientConfig).fetch(
      groq`{
        "homePage": *[_type == "homePage"][0]{
          // General Information
          companyName,
          companyLogoBlack{
            asset->{
              url,
              metadata {
                dimensions,
                lqip
              }
            },
            alt
          },
          companyLogoWhite{
            asset->{
              url,
              metadata {
                dimensions,
                lqip
              }
            },
            alt
          },
          slogan,

          // Banner Section
          imageDisplayOption,
          bannerProjects[]->{
          _id,
          name,
          slug,
          clientName,
          projectYear,
          mediumProjectImages[]{
            asset->{
              url
            },
            alt
          },
          smallProjectImages[]{
            asset->{
              url
            },
            alt
          }
        },

          // What We Do Section
          whatTitle,
          whatDescription,

          // Projects Section, uses the L image
          homeBeforeProjectDescription,
          featuredProjects[]->{
            _id,
            name,
            slug,
            clientName,
            projectYear,
            largeProjectImages[]{
              asset->{url},
              alt
            }
          },
          homeAfterProjectDescription,
          
          // Solutions Section
          homeGroupTitle,
          solutions[]{
            solutionTitle,
            solutionTextA,
            solutionTextB
          },

          // Connect Section
          connectTitle,
          connectName,
          connectEmail,

          // SEO
          seoTitle,
          seoDescription,
          keywords
        },
        "aboutPage": *[_type == "aboutPage"][0]{
          // General Information
          title,
          aboutTitle,
          aboutDescription,
          
          // Horizontal Images Section
          horizontalImageTopImage{
            asset->{
              url
            },
            alt
          },
          horizontalImageTopText,
          horizontalImageBottomImage{
            asset->{
              url
            },
            alt
          },
          horizontalImageBottomText,
          aboutCTALinks[]{
            title,
            slug
          },
          
          // About Band Section
          aboutBandTitle,
          aboutBandText,
          aboutLargeImage{
            asset->{
              url
            },
            alt
          },
          aboutMediumImage{
            asset->{
              url
            },
            alt
          },
          aboutSmallImages[]{
            asset->{
              url
            },
            alt
          },
          
          // Work Keys Section
          workKeysTitle,
          workKeysSubtitle,
          workKeysList[]{
            keyTitle,
            keyDescription
          },
          
          // Mini Gallery
          miniGallery[]{
            asset->{
              url
            },
            alt
          },
          
          // Chat Link
          chatLinkTitle,
          chatLinkAction
        },
        "servicesPage": *[_type == "servicesPage"][0]{
          title,
          // Main Content
          servicesTitle,
          servicesDescription,

          // New Services List
          servicesList[]{
            serviceTitle,
            serviceDescription,
            serviceOptions[] // This will bring in all options (strings) for each service
          },
          
          // Side Content
          servicesSideListTop,
          servicesSideTitle,
          servicesSideDescription,
          servicesSideList[]{
            item
          },
          servicesSideListBottom
        },
        "workPage": *[_type == "workPage"][0]{
          pageTitle,
          workPageTitle,
          workDescription,
          workPageSubtitle,
          workPageCTATitle,
          workPageCTAButtons[]{
            ctaText,
            ctaUrl,
            openInNewTab
          },
          featuredProjects[]->{
            _id,
            name,
            slug,
            clientName,
            projectYear,
            // All image sets
            largeProjectImages[]{
              asset->{
                url,
                metadata {
                  dimensions,
                  lqip // Low-quality image placeholder
                }
              },
              alt
            },
            mediumProjectImages[]{
              asset->{
                url,
                metadata {
                  dimensions
                }
              },
              alt
            },
            smallProjectImages[]{
              asset->{
                url,
                metadata {
                  dimensions
                }
              },
              alt
            },
            // About project fields
            aboutProject1,
            aboutProjectText1,
            aboutProject2,
            aboutProjectText2,
            stats[]{
              statTitle,
              statDescription
            },
            // Final project note
            projectFPO
          }
        },
        "contactPage": *[_type == "contactPage"][0]{
          contactTitle,
          contactDescription,
          formNamePlaceholder,
          formEmailPlaceholder,
          formCompanyPlaceholder,
          formInterestedInPlaceholder,
          formSuccessMessage
        },
        "pageFooter": *[_type == "pageFooter"][0]{
          copyrightBrandName,
          copyrightText,
          copyrightYear,
          connectLinks[] {
            linkTitle,
            linkUrl,
            openNewTab
          }
        }
      }`
    );
  }

  // REVIEW if applies for Dobbi.:

export async function getHomePage() {
  return createClient(clientConfig).fetch(
    groq`*[_type == "homepage"][0]{
      companyLogo{
        asset->{
          _id,
          url
        },
        alt
      },
      companyName,
      companyIcon{
        asset->{
          _id,
          url
        }
      },
      locations,
      email,
      pageNote->{
        ...
      },
      homeFrame{
        asset->{
          _id,
          url
        },
        alt
      },
      slogan,
      backgroundColor,
      homeVideo1{
        asset->{
          _id,
          url
        }
      },
      videoAlt1,
      videoDescription1,
      servicesTitle,
      osDescription,
      servicesList[]{
        osTitle,
        osItems
      },
      processTitle,
      opTitle1,
      opText1,
      opTitle2,
      opText2,
      opTitle3,
      opText3,
      opTitle4,
      opText4,
      approachTitle,
      aDescription,
      seoTitle,
      seoDescription,
      keywords
    }`
  );
}

export async function getWorkPage() {
  return createClient(clientConfig).fetch(
    groq`*[_type == "workPage"][0]{
      workPageTitle,
      workDescription,
      featuredProjects[]->{
        name,
        "slug": slug.current,
        clientName,
        projectYear,
        "firstLargeImage": largeProjectImages[0].asset->url,
        "firstLargeImageAlt": largeProjectImages[0].alt
      }
    }`
  )
}

export async function getProjects() {

    return createClient(clientConfig).fetch(
        groq`*[_type == "project"]{
            _id,
            _createdAt,
            name,
            clientName,
            projectYear,
            "slug": slug.current,
            "image": largeProjectImages.asset->url,
          }`
    )
}

export async function getProject(slug) {
  return createClient(clientConfig).fetch(
    groq`*[_type == "project" && slug.current == $slug][0]{
      _id,
      _createdAt,
      name,
      clientName,
      projectYear,
      "slug": slug.current,
      
      // All image arrays with URLs and alt text
      largeProjectImages[]{
        "url": asset->url,
        alt
      },
      mediumProjectImages[]{
        "url": asset->url,
        alt
      },
      smallProjectImages[]{
        "url": asset->url,
        alt
      },

      // About project fields
      aboutProject1,
      aboutProjectText1,
      aboutProject2,
      aboutProjectText2,
      projectFPO,

      // Stats with dereferenced fields
      stats[]{
        _id,
        title,
        value,
      }
    }`,
    { slug }
  );
}

  export async function getPages() {
    return createClient(clientConfig).fetch(
      groq`{
        "pages": *[_type == "page"]{
          _id,
          _createdAt,
          navTitle,
          "slug": slug.current,
          pageCompanyLogo{
            alt,
            "url": asset->url
          },
          pageCompanyLogoWhite{
            alt,
            "url": asset->url
          },
        },
        "pageNote": *[_type == "pageNote"][0] { 
          _id,
          title,
          description
        }
      }`
    );
  }
  
  export async function getPage(slug){

    return createClient(clientConfig).fetch(
      groq`*[_type == "page" && slug.current == $slug][0]{
            _id,
            _createdAt,
            pageTitle,
            "slug": slug.current,
            pageDescription
          }`, 
          {slug}
    )
  }

  export async function getAboutPage() {
    return createClient(clientConfig).fetch(
      groq`*[_type == "aboutPage" && status == true][0]{
        title,
        pageNote->{...},
        philosophyTitle,
        philosophyDescription1,
        philosophyImageCount,
        "philosophyProjectData": philosophyProject->{
          name,
          clientName,
          projectYear,
          projectImages[]{ // Fetch all images
            asset->{
              _id,
              url
            },
            alt
          },
          _id
        },
        philosophyDescription2,
        philosophyFeaturedImage{
          asset->{
            _id,
            url
          },
          alt
        },
        philosophyFeaturedImageSize,
        storyTitle,
        storyDescription1,
        storyImageCount,
        "storyProjectData": storyProject->{
          name,
          clientName,
          projectYear,
          projectImages[]{ // Fetch all images
            asset->{
              _id,
              url
            },
            alt
          },
          _id
        },
        storyDescription2,
        storyFeaturedImage{
          asset->{
            _id,
            url
          },
          alt
        },
        storyFeaturedImageSize,
        whoTitle,
        whoDescription1,
        whoImageCount,
        "whoProjectData": whoProject->{
          name,
          clientName,
          projectYear,
          projectImages[]{ // Fetch all images
            asset->{
              _id,
              url
            },
            alt
          },
          _id
        },
        whoDescription2,
        whoFeaturedImage{
          asset->{
            _id,
            url
          },
          alt
        },
        whoFeaturedImageSize
      }`
    );
  }

  