'use client';

import TitleDisplay from '@/app/components/sections/TitleDisplay';

export default function NotFound() {
  return (
    <div className="notFoundPage">
      <TitleDisplay
        title="Page Not Found"
        description="The page you're looking for doesn't exist or has been moved."
      />
    </div>
  );
}



