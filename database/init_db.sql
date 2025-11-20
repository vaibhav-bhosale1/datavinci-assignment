-- database/init_db.sql

-- 1. Drop the table if it exists to ensure a clean slate
DROP TABLE IF EXISTS campaigns;

-- 2. Create the campaigns table
-- Columns based on requirements: Name, Status, Clicks, Cost, Impressions [cite: 7-11]
CREATE TABLE campaigns (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    status VARCHAR(50) NOT NULL, -- Will store 'Active' or 'Paused'
    clicks INTEGER DEFAULT 0,
    cost DECIMAL(10, 2) DEFAULT 0.00,
    impressions INTEGER DEFAULT 0
);

-- 3. Insert 10 sample rows
-- First 2 rows are from the assignment example [cite: 26-27]
INSERT INTO campaigns (name, status, clicks, cost, impressions) VALUES
('Summer Sale', 'Active', 150, 45.99, 1000),
('Black Friday', 'Paused', 320, 89.50, 2500),
('Winter Clearance', 'Active', 500, 120.00, 5000),
('Spring Launch', 'Active', 200, 60.50, 1500),
('Holiday Special', 'Paused', 100, 30.00, 800),
('Flash Deal', 'Active', 800, 210.75, 9000),
('New Year Promo', 'Paused', 50, 15.00, 400),
('Cyber Monday', 'Paused', 450, 110.20, 3200),
('Back to School', 'Active', 300, 75.00, 2800),
('Valentine Gift', 'Active', 180, 55.40, 1200);