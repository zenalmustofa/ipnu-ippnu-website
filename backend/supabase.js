/**
 * ============================================================
 * SUPABASE CLIENT CONFIGURATION
 * File  : backend/supabase.js
 *
 * Handles all REST API calls to Supabase database.
 * ============================================================
 */

// Supabase Credentials (from environment or config)
const SUPABASE_URL = 'https://rjmsijtzuntqdrfxxvqc.supabase.co/rest/v1';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJqbXNpanR6dW50cWRyZnh4dnFjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzY5Njk0OTMsImV4cCI6MjA5MjU0NTQ5M30.kF-OknlfXkoEZVDTqMVI0E53eVZDtBu9kO1qjgpqq9w';

/* ── HELPER: REST API CALLS ────────────────────────────────── */

/**
 * Generic REST API call helper
 */
async function supabaseCall(table, method = 'GET', data = null, filter = null) {
  let url = `${SUPABASE_URL}/${table}`;
  
  if (filter) {
    url += `?${filter}`;
  }

  const options = {
    method,
    headers: {
      'Authorization': `Bearer ${SUPABASE_KEY}`,
      'Content-Type': 'application/json',
      'Prefer': 'return=representation'
    }
  };

  if (data) {
    options.body = JSON.stringify(data);
  }

  try {
    const response = await fetch(url, options);
    
    if (!response.ok) {
      console.error(`Supabase error: ${response.status}`, await response.text());
      throw new Error(`HTTP ${response.status}`);
    }

    return await response.json();
  } catch (err) {
    console.error('Supabase call error:', err);
    throw err;
  }
}

/* ── ARTIKEL FUNCTIONS ──────────────────────────────────────── */

/**
 * Get all articles from Supabase
 */
async function supabaseGetArtikel() {
  try {
    const data = await supabaseCall('artikel', 'GET', null, 'order=id.desc');
    return data || [];
  } catch (err) {
    console.error('Failed to fetch artikel:', err);
    return [];
  }
}

/**
 * Insert new article
 */
async function supabaseTambahArtikel(artikel) {
  try {
    const result = await supabaseCall('artikel', 'POST', artikel);
    return result[0] || artikel;
  } catch (err) {
    console.error('Failed to add artikel:', err);
    throw err;
  }
}

/**
 * Delete article by id
 */
async function supabaseHapusArtikel(id) {
  try {
    await supabaseCall('artikel', 'DELETE', null, `id=eq.${id}`);
    return true;
  } catch (err) {
    console.error('Failed to delete artikel:', err);
    throw err;
  }
}

/* ── FOTO FUNCTIONS ────────────────────────────────────────── */

/**
 * Get all photos from Supabase
 */
async function supabaseGetFoto() {
  try {
    const data = await supabaseCall('foto', 'GET', null, 'order=id.desc');
    return data || [];
  } catch (err) {
    console.error('Failed to fetch foto:', err);
    return [];
  }
}

/**
 * Insert new photo
 */
async function supabaseTambahFoto(foto) {
  try {
    const result = await supabaseCall('foto', 'POST', foto);
    return result[0] || foto;
  } catch (err) {
    console.error('Failed to add foto:', err);
    throw err;
  }
}

/**
 * Delete photo by id
 */
async function supabaseHapusFoto(id) {
  try {
    await supabaseCall('foto', 'DELETE', null, `id=eq.${id}`);
    return true;
  } catch (err) {
    console.error('Failed to delete foto:', err);
    throw err;
  }
}
