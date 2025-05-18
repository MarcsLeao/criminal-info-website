import InfoPageMain from "@/components/info-page/main";
import { InfoSkeleton } from "@/components/skeletons/info-skeleton";
import { Suspense } from "react";

export default async function InfoPage() {

    return (
        <Suspense fallback={<InfoSkeleton />}>
            <InfoPageMain />    
        </Suspense>
    )
}
