-- Add title column to appointments table
ALTER TABLE appointments ADD COLUMN IF NOT EXISTS title VARCHAR(255);
