import { createClient } from "@supabase/supabase-js";
const supabase = createClient(
  process.env.SUPABASE_URL as string,
  process.env.SUPABASE_KEY as string
);

const supabaseAdmin = createClient(
  process.env.SUPABASE_URL as string,
  process.env.SUPABASE_SERVICE_ROLE_KEY as string
);

function getSupabaseWithToken(token:string) {
  const supabase = createClient(
    process.env.SUPABASE_URL as string,
    process.env.SUPABASE_KEY as string,
    {
      global: {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    }
  );
  return supabase;
}

async function getSupabaseWithActiveSessionRefresh(token:string, refresh_token:string) {
  const supabase = createClient(
    process.env.SUPABASE_URL as string,
    process.env.SUPABASE_KEY as string
  );

  await supabase.auth.setSession({
    access_token: token,
    refresh_token: refresh_token,
  });

  return supabase;
}

export {
  supabase,
  supabaseAdmin,
  getSupabaseWithToken,
  getSupabaseWithActiveSessionRefresh
};
