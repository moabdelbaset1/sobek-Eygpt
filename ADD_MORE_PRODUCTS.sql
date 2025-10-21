-- Add more Human Products to different categories

-- Anti-Infectives
INSERT INTO human_products (
  name, 
  generic_name, 
  strength, 
  dosage_form, 
  indication, 
  pack_size, 
  registration_number, 
  category, 
  price, 
  is_active
) VALUES 
(
  'Amoxiclav',
  'Amoxicillin + Clavulanic Acid',
  '1g',
  'Tablets',
  'Treatment of bacterial infections including respiratory tract, urinary tract, and skin infections',
  '14 Tablets',
  'AMX-2024-001',
  'anti-infectives',
  150.00,
  true
),
(
  'Azitek',
  'Azithromycin',
  '500mg',
  'Tablets',
  'Treatment of respiratory tract infections, skin infections, and sexually transmitted diseases',
  '3 Tablets',
  'AZI-2024-002',
  'anti-infectives',
  85.00,
  true
),
(
  'Ciproflox',
  'Ciprofloxacin',
  '500mg',
  'Tablets',
  'Treatment of urinary tract infections, respiratory infections, and gastrointestinal infections',
  '10 Tablets',
  'CIP-2024-003',
  'anti-infectives',
  95.00,
  true
);

-- Endocrinology & Diabetes
INSERT INTO human_products (
  name, 
  generic_name, 
  strength, 
  dosage_form, 
  indication, 
  pack_size, 
  registration_number, 
  category, 
  price, 
  is_active
) VALUES 
(
  'Metformin SR',
  'Metformin Hydrochloride',
  '500mg',
  'Extended Release Tablets',
  'Management of type 2 diabetes mellitus',
  '60 Tablets',
  'MET-2024-001',
  'endocrinology-diabetes',
  120.00,
  true
),
(
  'Glimepride Plus',
  'Glimepiride + Metformin',
  '2mg/500mg',
  'Tablets',
  'Treatment of type 2 diabetes when diet, exercise, and single therapy do not achieve adequate glycemic control',
  '30 Tablets',
  'GLM-2024-002',
  'endocrinology-diabetes',
  180.00,
  true
),
(
  'Thyronorm',
  'Levothyroxine Sodium',
  '100mcg',
  'Tablets',
  'Treatment of hypothyroidism and thyroid hormone replacement',
  '100 Tablets',
  'THY-2024-003',
  'endocrinology-diabetes',
  90.00,
  true
);

-- Gastroenterology
INSERT INTO human_products (
  name, 
  generic_name, 
  strength, 
  dosage_form, 
  indication, 
  pack_size, 
  registration_number, 
  category, 
  price, 
  is_active
) VALUES 
(
  'Omeprazole',
  'Omeprazole',
  '20mg',
  'Capsules',
  'Treatment of gastric and duodenal ulcers, GERD, and acid-related disorders',
  '30 Capsules',
  'OME-2024-001',
  'gastroenterology',
  75.00,
  true
),
(
  'Motilium',
  'Domperidone',
  '10mg',
  'Tablets',
  'Relief of nausea, vomiting, and symptoms of gastroparesis',
  '30 Tablets',
  'MOT-2024-002',
  'gastroenterology',
  55.00,
  true
),
(
  'Lactulose',
  'Lactulose',
  '10g/15ml',
  'Syrup',
  'Treatment of constipation and hepatic encephalopathy',
  '300ml Bottle',
  'LAC-2024-003',
  'gastroenterology',
  65.00,
  true
);

-- Add more Cardiovascular products
INSERT INTO human_products (
  name, 
  generic_name, 
  strength, 
  dosage_form, 
  indication, 
  pack_size, 
  registration_number, 
  category, 
  price, 
  is_active
) VALUES 
(
  'Atenolol',
  'Atenolol',
  '50mg',
  'Tablets',
  'Treatment of hypertension, angina pectoris, and cardiac arrhythmias',
  '30 Tablets',
  'ATE-2024-004',
  'cardiovascular',
  45.00,
  true
),
(
  'Clopidogrel',
  'Clopidogrel',
  '75mg',
  'Tablets',
  'Prevention of atherothrombotic events in patients with acute coronary syndrome',
  '30 Tablets',
  'CLO-2024-005',
  'cardiovascular',
  220.00,
  true
);

-- Verify the data
SELECT category, COUNT(*) as product_count 
FROM human_products 
WHERE is_active = true 
GROUP BY category 
ORDER BY category;
