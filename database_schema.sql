-- Sobek Pharma Database Schema
-- Execute this SQL in your Supabase SQL Editor

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Categories Table
CREATE TABLE categories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(255) NOT NULL,
  name_ar VARCHAR(255),
  slug VARCHAR(255) NOT NULL UNIQUE,
  type VARCHAR(50) NOT NULL CHECK (type IN ('human', 'veterinary')),
  icon VARCHAR(50),
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Human Products Table
CREATE TABLE human_products (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(255) NOT NULL,
  generic_name VARCHAR(255) NOT NULL,
  strength VARCHAR(100) NOT NULL,
  dosage_form VARCHAR(100) NOT NULL,
  indication TEXT NOT NULL,
  pack_size VARCHAR(100),
  registration_number VARCHAR(50),
  category VARCHAR(100) NOT NULL,
  image_url TEXT,
  price DECIMAL(10,2),
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Veterinary Products Table
CREATE TABLE veterinary_products (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(255) NOT NULL,
  generic_name VARCHAR(255) NOT NULL,
  strength VARCHAR(100) NOT NULL,
  dosage_form VARCHAR(100) NOT NULL,
  indication TEXT NOT NULL,
  species VARCHAR(255) NOT NULL,
  withdrawal_period VARCHAR(255),
  pack_size VARCHAR(100),
  registration_number VARCHAR(50),
  category VARCHAR(100) NOT NULL,
  image_url TEXT,
  price DECIMAL(10,2),
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Insert default categories for Human Products
INSERT INTO categories (name, type, icon, description) VALUES
('Cardiovascular', 'human', '❤️', 'Heart and circulatory system medications'),
('Anti-Infectives', 'human', '🦠', 'Antibiotics and antimicrobial drugs'),
('Endocrinology & Diabetes', 'human', '🩺', 'Diabetes and hormonal disorders'),
('Gastroenterology', 'human', '🫄', 'Digestive system medications'),
('Respiratory', 'human', '🫁', 'Respiratory system treatments'),
('Pain Management', 'human', '💊', 'Pain relief and anti-inflammatory drugs');

-- Insert default categories for Veterinary Products
INSERT INTO categories (name, type, icon, description) VALUES
('Livestock & Cattle', 'veterinary', '🐄', 'Medications for cattle, sheep, and goats'),
('Poultry Health', 'veterinary', '🐔', 'Treatments for chickens, ducks, and birds'),
('Aquaculture', 'veterinary', '🐟', 'Fish and aquatic animal health'),
('Companion Animals', 'veterinary', '🐕', 'Dogs, cats, and pet medications'),
('Feed Additives & Supplements', 'veterinary', '🌾', 'Nutritional supplements and feed enhancers');

-- Insert sample Human Products
INSERT INTO human_products (name, generic_name, strength, dosage_form, indication, pack_size, registration_number, category, price) VALUES
('SOBEK-PRIL', 'Enalapril Maleate', '5mg, 10mg, 20mg', 'Film-coated Tablets', 'Hypertension, Heart failure, Asymptomatic left ventricular dysfunction', '30 tablets', 'EDA-12345/2023', 'Cardiovascular', 45.50),
('SOBEK-STATIN', 'Atorvastatin Calcium', '10mg, 20mg, 40mg', 'Film-coated Tablets', 'Hypercholesterolemia, Mixed dyslipidemia, Prevention of cardiovascular disease', '30 tablets', 'EDA-12346/2023', 'Cardiovascular', 65.00),
('SOBEK-CILLIN', 'Amoxicillin + Clavulanic Acid', '625mg (500mg + 125mg)', 'Film-coated Tablets', 'Respiratory tract infections, Urinary tract infections, Skin infections', '14 tablets', 'EDA-12348/2023', 'Anti-Infectives', 85.75),
('SOBEK-GLIP', 'Glimepiride', '1mg, 2mg, 4mg', 'Tablets', 'Type 2 diabetes mellitus', '30 tablets', 'EDA-12351/2023', 'Endocrinology & Diabetes', 32.25),
('SOBEK-ZOLE', 'Omeprazole', '20mg, 40mg', 'Enteric-coated Capsules', 'GERD, Peptic ulcer, H. pylori eradication', '14 capsules', 'EDA-12353/2023', 'Gastroenterology', 28.50);

-- Insert sample Veterinary Products
INSERT INTO veterinary_products (name, generic_name, strength, dosage_form, indication, species, withdrawal_period, pack_size, registration_number, category, price) VALUES
('SOBEK-VET OXYTETRACYCLINE', 'Oxytetracycline HCl', '200mg/ml', 'Injectable Solution', 'Respiratory infections, Mastitis, Foot rot in cattle and sheep', 'Cattle, Sheep, Goats', 'Meat: 28 days, Milk: 7 days', '100ml vial', 'GOVS-VET-001/2023', 'Livestock & Cattle', 125.00),
('SOBEK-VET COLISTIN', 'Colistin Sulfate', '12% w/w', 'Oral Powder', 'E.coli infections, Salmonella, Enteritis in poultry', 'Broilers, Layers, Turkeys', 'Meat: 5 days, Eggs: 0 days', '100g, 500g sachet', 'GOVS-VET-004/2023', 'Poultry Health', 95.50),
('SOBEK-VET CEPHALEXIN', 'Cephalexin', '250mg, 500mg', 'Capsules', 'Skin infections, Urinary tract infections, Respiratory infections', 'Dogs, Cats', 'Not applicable', '10 capsules/strip', 'GOVS-VET-009/2023', 'Companion Animals', 55.25);

-- Create indexes for better performance
CREATE INDEX idx_human_products_category ON human_products(category);
CREATE INDEX idx_human_products_active ON human_products(is_active);
CREATE INDEX idx_veterinary_products_category ON veterinary_products(category);
CREATE INDEX idx_veterinary_products_active ON veterinary_products(is_active);
CREATE INDEX idx_categories_type ON categories(type);

-- Enable Row Level Security (RLS)
ALTER TABLE human_products ENABLE ROW LEVEL SECURITY;
ALTER TABLE veterinary_products ENABLE ROW LEVEL SECURITY;
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;

-- Create policies for public read access
CREATE POLICY "Public read access for human products" ON human_products
    FOR SELECT USING (is_active = true);

CREATE POLICY "Public read access for veterinary products" ON veterinary_products
    FOR SELECT USING (is_active = true);

CREATE POLICY "Public read access for categories" ON categories
    FOR SELECT USING (true);

-- Admin policies (you'll need to set up authentication first)
-- These will be added after setting up authentication

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Leadership Team Table
CREATE TABLE leadership_team (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(255) NOT NULL,
  name_ar VARCHAR(255),
  title VARCHAR(255) NOT NULL,
  title_ar VARCHAR(255),
  department VARCHAR(255) NOT NULL,
  department_ar VARCHAR(255),
  bio TEXT NOT NULL,
  bio_ar TEXT,
  image_url TEXT,
  is_leadership BOOLEAN DEFAULT false,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Insert sample leadership team data
INSERT INTO leadership_team (name, name_ar, title, title_ar, department, department_ar, bio, bio_ar, image_url, is_leadership) VALUES
('Dr. Ahmed Hassan', 'د. أحمد حسن', 'Chief Executive Officer', 'الرئيس التنفيذي', 'Executive Management', 'الإدارة التنفيذية', 'Leading Sobek Pharma with 25+ years of pharmaceutical industry experience.', 'يقود شركة صوبيك فارما بأكثر من 25 عامًا من الخبرة في صناعة الأدوية.', 'https://i.pravatar.cc/400?img=12', true),
('Dr. Fatima El-Sayed', 'د. فاطمة السيد', 'Chief Scientific Officer', 'كبير مسؤولي العلوم', 'Research & Development', 'البحث والتطوير', 'Driving innovation and research excellence with expertise in pharmaceutical development.', 'يقود الابتكار والتميز في البحث مع الخبرة في تطوير الأدوية.', 'https://i.pravatar.cc/400?img=45', true),
('Mohamed Kamal', 'محمد كمال', 'Chief Operations Officer', 'كبير مسؤولي التشغيل', 'Operations', 'العمليات', 'Ensuring operational excellence and quality standards across all facilities.', 'يضمن التميز التشغيلي ومعايير الجودة عبر جميع المنشآت.', 'https://i.pravatar.cc/400?img=33', true),
('Sarah Ibrahim', 'سارة إبراهيم', 'Chief Financial Officer', 'كبير مسؤولي المالية', 'Finance', 'المالية', 'Managing financial strategy and sustainable growth initiatives.', 'يدير الاستراتيجية المالية ومبادرات النمو المستدام.', 'https://i.pravatar.cc/400?img=47', true),
('Dr. Mohamed Ali', 'د. محمد علي', 'Head of Manufacturing', 'رئيس التصنيع', 'Manufacturing', 'التصنيع', 'Overseeing pharmaceutical manufacturing operations and quality control.', 'يشرف على عمليات التصنيع الدوائي وضبط الجودة.', 'https://i.pravatar.cc/400?img=68', true),
('Dr. Nour El-Din', 'د. نور الدين', 'Quality Control Manager', 'مدير ضبط الجودة', 'Quality Control', 'ضبط الجودة', 'Ensuring product quality and compliance with international standards.', 'يضمن جودة المنتجات والامتثال للمعايير الدولية.', 'https://i.pravatar.cc/400?img=25', false),
('Ahmed Hassan', 'أحمد حسن', 'Production Supervisor', 'مشرف الإنتاج', 'Manufacturing', 'التصنيع', 'Managing daily production operations and team coordination.', 'يدير عمليات الإنتاج اليومية وتنسيق الفريق.', 'https://i.pravatar.cc/400?img=50', false),
('Fatima Mahmoud', 'فاطمة محمود', 'R&D Scientist', 'عالم بحث وتطوير', 'Research & Development', 'البحث والتطوير', 'Conducting research on new pharmaceutical formulations.', 'تقوم بأبحاث على تركيبات دوائية جديدة.', 'https://i.pravatar.cc/400?img=32', false);

-- Create indexes for leadership_team
CREATE INDEX idx_leadership_team_active ON leadership_team(is_active);

-- Enable Row Level Security for leadership_team
ALTER TABLE leadership_team ENABLE ROW LEVEL SECURITY;

-- Create policies for public read access
CREATE POLICY "Public read access for leadership team" ON leadership_team
    FOR SELECT USING (is_active = true);

-- Create triggers for updated_at
CREATE TRIGGER update_human_products_updated_at BEFORE UPDATE ON human_products
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_veterinary_products_updated_at BEFORE UPDATE ON veterinary_products
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_leadership_team_updated_at BEFORE UPDATE ON leadership_team
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();