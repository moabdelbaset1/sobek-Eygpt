async function createSampleOrders() {
  try {
    console.log('🚀 Attempting to create sample orders...');
    const response = await fetch('http://localhost:3000/api/admin/create-sample-orders', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      }
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    console.log('✅ Sample orders created successfully:', data);
  } catch (error) {
    console.error('❌ Error creating sample orders:', error.message);
  }
}

createSampleOrders();