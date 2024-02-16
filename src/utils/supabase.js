import { createServerClient } from '@supabase/ssr'

export const supabase = (cookies) => {
    const cookieStore = cookies()

    return createServerClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
        {
            cookies: {
                get(name) {
                    return cookieStore.get(name)?.value
                },
            },
        }
    )
}

// import { supabase } from "@/utils/supabase";
// import { cookies } from "next/headers";

// export default async function Page() {
//   const { data } = await supabase(cookies).from("events").select();
//   return <pre>{JSON.stringify(data, null, 2)}</pre>;
// }