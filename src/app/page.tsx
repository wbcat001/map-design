'use client';
import dynamic from 'next/dynamic';
import { useMemo } from 'react';
import { MapDemo } from '@/components/map/Map';
export default function Home() {
    const GeneralMap = useMemo(
        () =>
            dynamic(() => import('@/components/map/GeneralMap'), {
                loading: () => <p>map loading...</p>,
                ssr: false,
            }),
        [],
    );
    return (
        <>
            <div>
                <GeneralMap></GeneralMap>
                {/* <MapDemo></MapDemo> */}
            </div>
        </>
    );
}

