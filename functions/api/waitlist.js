const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
  'Content-Type': 'application/json'
};

export async function onRequestOptions() {
  return new Response(null, { headers: corsHeaders });
}

export async function onRequestPost(context) {
  const { request, env } = context;

  try {
    const { email, name, role } = await request.json();

    if (!email || !email.includes('@')) {
      return new Response(JSON.stringify({ error: 'Valid email required' }), {
        status: 400,
        headers: corsHeaders
      });
    }

    const result = await env.DB.prepare(
      'INSERT INTO waitlist (email, name, role, created_at) VALUES (?, ?, ?, ?)'
    ).bind(email, name || null, role || null, new Date().toISOString()).run();

    if (!result.success) {
      throw new Error('Database insert failed');
    }

    return new Response(JSON.stringify({ success: true }), {
      status: 201,
      headers: corsHeaders
    });
  } catch (error) {
    if (error.message?.includes('UNIQUE constraint failed')) {
      return new Response(JSON.stringify({ error: 'Email already registered' }), {
        status: 409,
        headers: corsHeaders
      });
    }
    return new Response(JSON.stringify({ error: 'Failed to save' }), {
      status: 500,
      headers: corsHeaders
    });
  }
}
