CREATE TABLE IF NOT EXISTS daily_metrics (
  id BIGINT AUTO_INCREMENT PRIMARY KEY,
  business_date DATE NOT NULL UNIQUE,
  sales_total DECIMAL(14,2) NOT NULL DEFAULT 0,
  android_downloads INT NOT NULL DEFAULT 0,
  ios_downloads INT NOT NULL DEFAULT 0
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS sales (
  seq BIGINT AUTO_INCREMENT PRIMARY KEY,
  sale_id VARCHAR(64) NOT NULL UNIQUE,
  transaction_ref VARCHAR(64) NOT NULL,
  sold_at VARCHAR(40) NOT NULL,
  source VARCHAR(120) NOT NULL,
  person VARCHAR(160) NOT NULL,
  city VARCHAR(80) NOT NULL,
  amount DECIMAL(14,2) NOT NULL DEFAULT 0,
  status VARCHAR(20) NOT NULL DEFAULT 'Paid',
  app_source VARCHAR(20) NOT NULL DEFAULT 'Android',
  is_demo TINYINT(1) NOT NULL DEFAULT 0,
  INDEX idx_sales_sold_at (sold_at)
) ENGINE=InnoDB;

-- Reports & Analytics Command Center
CREATE TABLE IF NOT EXISTS reports (
  id BIGINT AUTO_INCREMENT PRIMARY KEY,
  report_code VARCHAR(64) NOT NULL UNIQUE,
  title VARCHAR(255) NOT NULL,
  category VARCHAR(80) NOT NULL,
  format VARCHAR(20) NOT NULL DEFAULT 'CSV',
  generated_by VARCHAR(120) NOT NULL DEFAULT 'Executive Automated Cron',
  file_size VARCHAR(32) NOT NULL DEFAULT '1.4 MB',
  download_url VARCHAR(255) NOT NULL DEFAULT '#',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 10 Mock Reports across Reports & Analytics subcategories
INSERT INTO reports (report_code, title, category, format, generated_by, file_size, download_url) VALUES
('RPT-2026-001', 'Executive Sales Performance & Channel Gross GMV', 'Sales Reports', 'CSV', 'Daily Financial Audit Cron', '2.4 MB', '/exports/sales_mtd_oct2026.csv'),
('RPT-2026-002', 'Business Unit Margins & Recurring Subscription ARR', 'Revenue Reports', 'XLSX', 'Chief Financial Officer', '1.8 MB', '/exports/revenue_bu_q3.xlsx'),
('RPT-2026-003', 'Customer Demographics, LTV & Cohort Retention', 'Customer Reports', 'CSV', 'CRM Data Pipeline', '4.1 MB', '/exports/customer_cohorts_2026.csv'),
('RPT-2026-004', 'Pet Breed Demographics & Vaccination Registry', 'Pet Reports', 'CSV', 'Clinical Informatics System', '3.2 MB', '/exports/pet_demographics_census.csv'),
('RPT-2026-005', 'Veterinary Doctor Caseload & Incentive Ledger', 'Doctor Reports', 'PDF', 'Medical Operations Audit', '1.5 MB', '/exports/doctor_caseload_payouts.pdf'),
('RPT-2026-006', 'Clinic Network ICU Utilization & OPD Throughput', 'Clinic Reports', 'CSV', 'Hospital Director Console', '2.1 MB', '/exports/clinic_network_occupancy.csv'),
('RPT-2026-007', 'Product Catalog Velocity & Pareto ABC Matrix', 'Product Reports', 'CSV', 'Merchandising Analytics', '5.6 MB', '/exports/product_abc_matrix.csv'),
('RPT-2026-008', 'Cold-Chain Depot Stock Valuation & Batch Expiry', 'Inventory Reports', 'XLSX', 'Supply Chain Automated Cron', '3.8 MB', '/exports/depot_inventory_valuation.xlsx'),
('RPT-2026-009', 'Audited Corporate GAAP Profit & Loss Statement', 'Finance Reports', 'PDF', 'Ernst & Young Audit Sync', '1.9 MB', '/exports/gaap_pl_audited_statement.pdf'),
('RPT-2026-010', '60-Min Express Fulfillment & Dark Store SLAs', 'Operations Reports', 'CSV', 'Logistics Telemetry Hub', '4.7 MB', '/exports/express_logistics_sla.csv')
ON DUPLICATE KEY UPDATE title=VALUES(title);

