//import { env } from '$lib/env';
import { createClient } from "@supabase/auth-helpers-sveltekit";
//import { createClient } from "@supabase/supabase-js";

export const supabaseClient = createClient(
	"https://bxwgtcwwdonwfwahukvs.supabase.co",
	"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJ4d2d0Y3d3ZG9ud2Z3YWh1a3ZzIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODMwMzczNDUsImV4cCI6MTk5ODYxMzM0NX0.rCDdsjY1F2EFm1twqE--vBA6ZY6pXNTwfvylabfsTJo",
)

/*export const supabaseClient = createClient(
	env.PUBLIC_SUPABASE_URL ?? "",
	env.PUBLIC_SUPABASE_ANON_KEY ?? "",
)*/
