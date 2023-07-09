"use client";

import { getCookie } from "cookies-next";
import { useRouter } from "next/navigation";
import Loading from "./loading";
import { api } from "@/services/api";
import useSWR from "swr";
import { useAuth } from "@/contexts/AuthContext";

import ProjectsList from "@/components/ProjectsList/ProjectsList";
import AddProject from "@/components/AddProject/AddProject";
import Navbar from "@/components/Navbar/Navbar";
import Search from "@/components/Search/Search";


export default async function Dashboard() {

    const { user, logout, loading } = useAuth();

    const router = useRouter();

    const token = getCookie("nextauth.token");


    const fetcher = (url: string) => api.get(url, {
        headers: {
          'Authorization': `Bearer ${token}` 
        }
    }).then(res => res.data.user);

    const { data: userData, mutate, error, isLoading } = useSWR(
        `/user/${user?.id}`,
        fetcher,
        {
            revalidateIfStale: false,
            revalidateOnFocus: false,
            revalidateOnReconnect: false
        }
    );


    if(loading || isLoading) {
        return <Loading />;
    }

    if(!token || !user){
        return router?.push("/");
    }


    const handleLogout = async () => {
        logout();
    }

    if(token && !loading){
        return (
            <div className="overflow-hidden bg-white min-h-screen">
                <Navbar email={userData?.email} onLogout={handleLogout} />

                <section className="flex flex-wrap isolate px-6 py-2">
                    <Search/>
                </section>
                
                
                <section className="flex flex-wrap isolate px-6 py-10 sm:py-10 lg:px-8">

                        <ProjectsList userId={userData.id} token={token as string} />
                        
                        <AddProject userId={userData.id} token={token as string} />
                </section>
            </div>
            
        )
    }
}
