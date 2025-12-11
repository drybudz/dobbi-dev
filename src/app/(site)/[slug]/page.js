'use client';

// import { PortableText } from "next-sanity"; //test with the next-sanity
import { PortableText } from "@portabletext/react";
import Image from 'next/image';
import { useAppContext } from "@/app/components/AppContext";
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import ImagesAnimation from "@/app/components/ImagesAnimation";
import TitleDisplay from '@/app/components/sections/TitleDisplay';

// export const revalidate = 300; // Revalidate every 5 minutes

export default function Page() {
    // const { slug } = await params;
    // const pageData = await getPageData(slug);

    const pathname = usePathname();

    const { allData } = useAppContext();
    const pagesData = allData?.pages || [];  

    const pageTalent = pagesData.find(page => page.slug === 'talent');
    const pageWork = pagesData.find(page => page.slug === 'work');

    // State for shuffled images to ensure consistency between server and client
    const [shuffledImages, setShuffledImages] = useState([]);

    useEffect(() => {
        if (pageWork?.projects) {
          const allProjectImages = [];
          pageWork.projects.forEach((project) => {
            const images = [project.mainImage, ...(project.projectImages || [])].filter(Boolean);
            allProjectImages.push(...images);
          });
          
          // Don't slice here - pass full array to animation component
          const shuffled = [...allProjectImages].sort(() => Math.random() - 0.5);
          setShuffledImages(shuffled); // Remove .slice(0, 16)
        }
      }, [pageWork]);

    // Determine current page type based on pathname
    const isTalentPage = pathname === '/talent';
    const isWorkPage = pathname === '/work';

    // First check: Is this a valid route for this component? (only /talent or /work)
    if (!isTalentPage && !isWorkPage) {
        // This is a 404 - route doesn't exist
        return (
            <div className="notFoundPage">
                <TitleDisplay
                    title="Page Not Found"
                    description="The page you're looking for doesn't exist or has been moved."
                />
            </div>
        );
    }

    // Second check: If we're on /talent or /work, do we have the data?
    if (isTalentPage && !pageTalent) {
        return (
            <div className="errorPage">
                <TitleDisplay
                    title="Error loading content"
                    description="Could not find the 'Talent' page."
                />
            </div>
        );
    }

    if (isWorkPage && !pageWork) {
        return (
            <div className="errorPage">
                <TitleDisplay
                    title="Error loading content"
                    description="Could not find the 'Work' page."
                />
            </div>
        );
    }

    // console.log("Full Page Data:", pageData);
    // console.log("Contact Info Data:", pageData.contactInfo);

    const currentPage = isTalentPage ? pageTalent : pageWork;

    return(
        <div className="pageContainer">
            {/* Dynamic Header based on current page */}
            <header>
                <h1 className="pageTitle">{currentPage.pageTitle}</h1>
                <div className="pageDescription">
                    <PortableText value={currentPage.pageDescription}/>
                </div>
                <div className="contactInfo">
                    <PortableText value={currentPage.contactInfo}/>
                </div>
            </header>
            
            <div className="pageContent">
                {/* Talent Page Content */}
                {isTalentPage && pageTalent.teamMembers && pageTalent.teamMembers.length > 0 && (
                    <div className="gallery">
                        {pageTalent.teamMembers.map((member) => (
                            <div className="gallery-panel" key={member._id}>
                                <div className="panel-content">
                                    <div className="member-title">
                                        <span>
                                            {member.talentPosition} <i>{member.city}</i>
                                        </span>
                                    </div>
                                    {member.image?.asset?.url && (
                                        <img
                                            src={member.image.asset.url}
                                            alt={member.image.alt || member.fullName}
                                        />
                                    )}
                                    <div className="text-info">
                                        <div className="fullname">{member.fullName}</div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {/* Work Page */}
                {/* IF CURRENT PATH == /work do this */}
                {isWorkPage && pageWork.projects && pageWork.projects.length > 0 && (
                <ImagesAnimation 
                    allImages={shuffledImages} // Pass FULL array here
                    visibleCount={16}
                    intervalTime={4000}
                    fadeDuration={1000}
                >
                    {(visibleImages, fadingOut) => (
                    <div className="workImages">
                        {visibleImages.map((image, index) => (
                        <div 
                            key={`${image?.asset?.url}-${index}`}
                            className={`image-container ${fadingOut.includes(index) ? 'fade-out' : 'fade-in'}`}
                        >
                            <Image
                            src={image?.asset?.url || ''}
                            alt={image?.alt || 'Dobbi Work Content'}
                            width={500}
                            height={500}
                            className="workProductImage"
                            style={{
                                width: '100%',
                                height: '100%',
                                objectFit: 'cover',
                                position: 'relative'
                            }}
                            quality={80}
                            loading="lazy"
                            unoptimized={image?.asset?.url?.endsWith('.gif')}
                            placeholder={image?.asset?.metadata?.lqip ? 'blur' : 'empty'}
                            blurDataURL={image?.asset?.metadata?.lqip || ''}
                            />
                        </div>
                        ))}
                    </div>
                    )}
                </ImagesAnimation>
                )}

                {/* Footer / Page Note */}

                <footer>
                    {allData?.pageNote && (
                        <div className="pageNote">
                            <div className="leftSide">
                            {allData.pageNote.workTitle && (
                                <div className="workSection">
                                <h2 className="pageNoteTitle">{allData.pageNote.workTitle}</h2>
                                {allData.pageNote.workDescription && (
                                    <p className="pageNoteText">{allData.pageNote.workDescription}</p>
                                )}
                                </div>
                            )}
                            {allData.pageNote.connectTitle && (
                                <div className="connectSection">
                                <h2 className="pageNoteTitle">{allData.pageNote.connectTitle}</h2>
                                {allData.pageNote.connectLinks &&
                                    allData.pageNote.connectLinks.map((link, index) => (
                                    <a
                                        key={index}
                                        href={link.linkUrl}
                                        className="contactLink"
                                        target={link.openNewTab ? "_blank" : undefined}
                                        rel={link.openNewTab ? "noopener noreferrer" : undefined}
                                    >
                                        {link.linkTitle}
                                    </a>
                                    ))}
                                </div>
                            )}
                            </div>
                            {allData.pageNote.copyrightText && (
                            <div className="copyRight"><p className="copyRightText"> <b>{allData.pageNote.copyrightBrandName}</b> {allData.pageNote.copyrightText} {allData.pageNote.copyrightYear} {allData.pageNote.copyrightBrandName}</p>
                            </div>
                            )}
                        </div>
                    )}
                </footer>
            </div>

        </div>
    )
}