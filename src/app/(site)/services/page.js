'use client';

import { useAppContext } from '@/app/components/AppContext';
import styles from "./services.module.css"


export default function Services() {

    const { allData } = useAppContext();
    const servicesPageData = allData?.servicesPage || null;
    // console.log("@Ss------Services Page Data:", servicesPageData);

    if (!servicesPageData) {
        return <div>Services Page Not Found</div>
    }
    return (
        
        <div className="aboutPage">
            <h2 className="aboutTitle">{servicesPageData.servicesTitle}</h2>
            <p className="aboutText">{servicesPageData.servicesDescription}</p>
        </div>
        
    );
}