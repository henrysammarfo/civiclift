import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  // Validate shared secret
  const authHeader = req.headers.get("x-bot-secret");
  const botSecret = Deno.env.get("BOT_STATS_SECRET");

  if (!botSecret || authHeader !== botSecret) {
    return new Response(JSON.stringify({ error: "Unauthorized" }), {
      status: 401,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  try {
    const body = await req.json();
    // Accepts: { "sessions": "increment" | number, "plans_generated": "increment" | number, ... }
    // "increment" adds 1 to the current value; a number sets it directly

    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
    );

    const allowedKeys = ["sessions", "plans_generated", "steps_completed", "avg_time_to_plan"];
    const results: Record<string, string> = {};

    for (const [key, value] of Object.entries(body)) {
      if (!allowedKeys.includes(key)) continue;

      if (value === "increment") {
        // Fetch current value, parse as number, add 1
        const { data: existing } = await supabase
          .from("bot_stats")
          .select("metric_value")
          .eq("metric_key", key)
          .single();

        const current = parseInt(existing?.metric_value ?? "0", 10) || 0;
        const newVal = String(current + 1);

        await supabase
          .from("bot_stats")
          .update({ metric_value: newVal, updated_at: new Date().toISOString() })
          .eq("metric_key", key);

        results[key] = newVal;
      } else {
        // Set directly
        const newVal = String(value);
        await supabase
          .from("bot_stats")
          .update({ metric_value: newVal, updated_at: new Date().toISOString() })
          .eq("metric_key", key);

        results[key] = newVal;
      }
    }

    return new Response(JSON.stringify({ ok: true, updated: results }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (e) {
    return new Response(JSON.stringify({ error: e.message }), {
      status: 400,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
