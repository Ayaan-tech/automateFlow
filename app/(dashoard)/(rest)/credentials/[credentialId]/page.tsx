import { requireAuth } from "@/lib/auth-utils";
interface iAppProps{
    params: Promise<{
        credentialId: string;
    }>
}

export default async function CredentialPage({params}:iAppProps){
    await requireAuth();
    const {credentialId} = await params;
    return <div>Credential Page for ID: {credentialId}</div>
}