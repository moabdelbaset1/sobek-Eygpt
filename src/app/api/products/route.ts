import {NextRequest, NextResponse} from 'next/server';

type Product = {
  id: string;
  name: string;
  therapeuticArea: string;
  dosageForm: string;
  regulatoryStatus: 'OTC' | 'Rx' | 'Supplement';
};

const MOCK_PRODUCTS: Product[] = [
  {id: 'p1', name: 'Paracetamol 500 mg Tablets', therapeuticArea: 'Pain', dosageForm: 'Tablet', regulatoryStatus: 'OTC'},
  {id: 'p2', name: 'Ibuprofen 400 mg Tablets', therapeuticArea: 'Pain', dosageForm: 'Tablet', regulatoryStatus: 'OTC'},
  {id: 'p3', name: 'Azithromycin 500 mg Tablets', therapeuticArea: 'Anti-infective', dosageForm: 'Tablet', regulatoryStatus: 'Rx'},
  {id: 'p4', name: 'Omeprazole 20 mg Capsules', therapeuticArea: 'Gastro', dosageForm: 'Capsule', regulatoryStatus: 'Rx'},
  {id: 'p5', name: 'Cetirizine 10 mg Tablets', therapeuticArea: 'Allergy', dosageForm: 'Tablet', regulatoryStatus: 'OTC'},
  {id: 'p6', name: 'Metformin 500 mg Tablets', therapeuticArea: 'Metabolic', dosageForm: 'Tablet', regulatoryStatus: 'Rx'},
  {id: 'p7', name: 'Vitamin D3 1000 IU Capsules', therapeuticArea: 'Vitamins', dosageForm: 'Capsule', regulatoryStatus: 'Supplement'},
  {id: 'p8', name: 'ORS Sachets', therapeuticArea: 'Electrolytes', dosageForm: 'Sachet', regulatoryStatus: 'OTC'}
];

export function GET(req: NextRequest) {
  const {searchParams} = new URL(req.url);
  const area = searchParams.get('area');
  const form = searchParams.get('form');
  const status = searchParams.get('status');

  let results = MOCK_PRODUCTS;
  if (area) results = results.filter(p => p.therapeuticArea.toLowerCase() === area.toLowerCase());
  if (form) results = results.filter(p => p.dosageForm.toLowerCase() === form.toLowerCase());
  if (status) results = results.filter(p => p.regulatoryStatus.toLowerCase() === status.toLowerCase());

  return NextResponse.json({count: results.length, items: results});
}


