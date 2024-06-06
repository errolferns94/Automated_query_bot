import express from 'express';
import bodyParser from 'body-parser';
import { createClient } from '@supabase/supabase-js';
import cors from 'cors';

const app = express();
const port = 3001;

// Middleware
app.use(bodyParser.json());
app.use(cors()); // Add this line

// Initialize Supabase client
const supabaseUrl = 'https://edaifaahzoreqvtzyrhg.supabase.co'
const supabaseKey ='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVkYWlmYWFoem9yZXF2dHp5cmhnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTc1NjQ1NjcsImV4cCI6MjAzMzE0MDU2N30.XcLpGcacdQPv2JEkwAtlMT4ypdOpW0hjcH8gNozfXnY'
const supabase = createClient(supabaseUrl, supabaseKey)

// Endpoint to handle form submissions
app.post('/submit', async (req, res) => {
  const { firstName, email, message } = req.body;

  // Insert data into Supabase
  const { data, error } = await supabase
    .from('contacts')
    .insert([{ first_name: firstName, email, message }]);

  if (error) {
    return res.status(500).json({ error: error.message });
  }

  res.status(200).json({ data });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});


// const supabaseUrl = 'https://edaifaahzoreqvtzyrhg.supabase.co'
// const supabaseKey ='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVkYWlmYWFoem9yZXF2dHp5cmhnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTc1NjQ1NjcsImV4cCI6MjAzMzE0MDU2N30.XcLpGcacdQPv2JEkwAtlMT4ypdOpW0hjcH8gNozfXnY'
// const supabase = createClient(supabaseUrl, supabaseKey)
