import React from 'react';
import { initialProfile } from '@/lib/InitialProfile';
import { db } from '@/lib/database/dbConnection';
import {redirect} from 'next/navigation'
import InitialModel from '../../components/Models/InitialModel';
type pageProps = {
    
};

const SetUpPage:React.FC<pageProps> = async () => {
    const profile = await initialProfile();
    const server = await db.server.findFirst({
        where:{
            members:{
                some:{
                    profileId:profile.id
                }
            }
        }
    })
    if(server){
        return redirect(`/servers/${server.id}/`)
    }
    return (
        <div>
            <InitialModel/>
        </div>
    );
}
export default SetUpPage;