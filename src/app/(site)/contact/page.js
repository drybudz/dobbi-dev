'use client';

import TitleInfoArrow from '@/app/components/sections/TitleInfoArrow';
import ContactForm from '@/app/components/sections/ContactForm';
import { useAppContext } from '@/app/components/AppContext';

export default function Contact() {
    const { allData } = useAppContext();
    const contactPageData = allData?.contactPage || null;

    if (!contactPageData) {
        return <div>Contact Page Not Found</div>
    }

    return (
        <div className="contactPage">
            <TitleInfoArrow
                title={contactPageData.contactTitle}
                description={contactPageData.contactDescription}
            />
            <ContactForm />
        </div>
    );
}

