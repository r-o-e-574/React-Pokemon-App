import React from 'react';

type PageProps = { children: React.ReactNode };

function Page({ children }: PageProps) {
    return (
        <>
            { children}
        </>
    );
};

export default Page;
