"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { Skeleton } from "@/components/ui/loading";

export default function ProtectedRoute({ children }) {
    const { user, loading } = useAuth();
    const router = useRouter();
    const pathname = usePathname();
    const [shouldRedirect, setShouldRedirect] = useState(false);

    useEffect(() => {
        if (!loading && !user) {
            // Tambahkan delay kecil sebelum redirect
            const timer = setTimeout(() => {
                setShouldRedirect(true);
            }, 100);

            return () => clearTimeout(timer);
        }
    }, [user, loading]);

    useEffect(() => {
        if (shouldRedirect) {
            sessionStorage.setItem("redirectAfterLogin", pathname);
            router.push("/sign-in");
        }
    }, [shouldRedirect, router, pathname]);

    if (loading) {
        return (
            <Skeleton />
        );
    }

    if (!user) {
        return null;
    }

    return <>{children}</>;
}