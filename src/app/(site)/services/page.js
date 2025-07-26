'use client';

import { useAppContext } from '@/app/components/AppContext';
import styles from "./services.module.css"
import Services8020Grid from '@/app/components/sections/Services8020Grid';


export default function Services() {

    const { allData } = useAppContext();
    const servicesPageData = allData?.servicesPage || null;
    console.log("@Ss------Services Page Data:", servicesPageData);

    if (!servicesPageData) {
        return <div>Services Page Not Found</div>
    }
    return (
        
        <div className="servicesPage">
            {/* <h2 className="aboutTitle">{servicesPageData.servicesTitle}</h2>
            <p className="aboutText">{servicesPageData.servicesDescription}</p> */}

            <Services8020Grid 
            servicesTitle={servicesPageData.servicesTitle}
            servicesDescription={servicesPageData.servicesDescription}
            servicesSideListTop={servicesPageData.servicesSideListTop}
            servicesSideTitle={servicesPageData.servicesSideTitle}
            servicesSideDescription={servicesPageData.servicesSideDescription}
            servicesSideList={servicesPageData.servicesSideList}
            servicesSideListBottom={servicesPageData.servicesSideListBottom}
            servicesList={servicesPageData.servicesList}
            />
        </div>
        
    );
}