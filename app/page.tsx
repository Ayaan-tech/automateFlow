import { requireAuth } from "@/lib/auth-utils";
import { HomepageClient } from "./_components/HomepageClient";

export default async function Homepage() {
  await requireAuth();
  
  return <HomepageClient />;
}