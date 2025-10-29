// Test script for the new inventory management system
// This script tests the order creation and inventory deduction flow

const BASE_URL = 'http://localhost:3000';

async function testInventorySystem() {
  console.log('🧪 Testing Inventory Management System');
  console.log('=====================================');

  try {
    // Test 1: Check products API with stock information
    console.log('\n📦 Test 1: Fetching products...');
    const productsResponse = await fetch(`${BASE_URL}/api/admin/products?available=true&limit=5`);
    
    if (!productsResponse.ok) {
      console.error('❌ Products API failed:', productsResponse.statusText);
      return;
    }
    
    const productsData = await productsResponse.json();
    console.log('✅ Products fetched successfully');
    console.log('📊 Sample products:');
    
    const sampleProducts = productsData.products.slice(0, 3);
    sampleProducts.forEach(product => {
      const stock = product.units || product.stockQuantity || 0;
      console.log(`   - ${product.name}: ${stock} units in stock`);
    });

    if (sampleProducts.length === 0) {
      console.log('⚠️ No products found for testing');
      return;
    }

    // Test 2: Create a test order with stock validation
    console.log('\n📝 Test 2: Creating test order...');
    const testProduct = sampleProducts[0];
    const currentStock = testProduct.units || testProduct.stockQuantity || 0;
    
    if (currentStock === 0) {
      console.log('⚠️ Selected product has no stock, skipping order test');
      return;
    }

    // Test with reasonable quantity (not exceeding stock)
    const testQuantity = Math.min(2, currentStock);
    
    const testOrderData = {
      customer_id: 'test-customer',
      email: 'test@example.com',
      items: [{
        productId: testProduct.$id,
        name: testProduct.name,
        sku: testProduct.sku || `TEST-${testProduct.$id.slice(0, 6)}`,
        quantity: testQuantity,
        price: testProduct.price || 100,
        brand_id: testProduct.brand_id || ''
      }],
      shippingAddress: {
        fullName: 'Test Customer',
        addressLine1: '123 Test Street',
        city: 'Test City',
        state: 'Test State',
        postalCode: '12345',
        country: 'Test Country',
        phone: '+123456789'
      },
      billingAddress: {
        fullName: 'Test Customer',
        addressLine1: '123 Test Street',
        city: 'Test City',
        state: 'Test State',
        postalCode: '12345',
        country: 'Test Country',
        phone: '+123456789'
      },
      paymentMethod: 'cash_on_delivery',
      subtotal: (testProduct.price || 100) * testQuantity,
      shippingCost: 0,
      taxAmount: 0,
      discountAmount: 0
    };

    console.log(`🛒 Testing order: ${testQuantity}x ${testProduct.name} (${currentStock} available)`);

    const orderResponse = await fetch(`${BASE_URL}/api/orders`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(testOrderData),
    });

    if (!orderResponse.ok) {
      const errorData = await orderResponse.json();
      console.error('❌ Order creation failed:', errorData.error);
      if (errorData.details) {
        console.error('📋 Error details:', errorData.details);
      }
      return;
    }

    const orderData = await orderResponse.json();
    console.log('✅ Order created successfully!');
    console.log(`📋 Order ID: ${orderData.order.$id}`);
    console.log(`📄 Order Code: ${orderData.order.order_code}`);

    // Test 3: Verify stock was deducted
    console.log('\n📊 Test 3: Verifying stock deduction...');
    const updatedProductsResponse = await fetch(`${BASE_URL}/api/admin/products?available=true&limit=5`);
    const updatedProductsData = await updatedProductsResponse.json();
    
    const updatedProduct = updatedProductsData.products.find(p => p.$id === testProduct.$id);
    const newStock = updatedProduct.units || updatedProduct.stockQuantity || 0;
    
    console.log(`📦 Stock before order: ${currentStock}`);
    console.log(`📦 Stock after order: ${newStock}`);
    console.log(`📦 Expected deduction: ${testQuantity}`);
    
    if (newStock === currentStock - testQuantity) {
      console.log('✅ Stock deduction verified successfully!');
    } else {
      console.log('❌ Stock deduction mismatch!');
    }

    // Test 4: Test excessive quantity order (should fail)
    console.log('\n🚫 Test 4: Testing excessive quantity order...');
    const excessiveOrderData = {
      ...testOrderData,
      items: [{
        ...testOrderData.items[0],
        quantity: newStock + 100 // Request more than available
      }]
    };

    const excessiveOrderResponse = await fetch(`${BASE_URL}/api/orders`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(excessiveOrderData),
    });

    if (!excessiveOrderResponse.ok) {
      const errorData = await excessiveOrderResponse.json();
      console.log('✅ Excessive quantity order correctly rejected!');
      console.log(`📋 Error message: ${errorData.error}`);
      if (errorData.details) {
        console.log('📋 Stock validation details:', errorData.details);
      }
    } else {
      console.log('❌ Excessive quantity order should have been rejected!');
    }

    console.log('\n🎉 Inventory system testing completed!');
    console.log('=====================================');

  } catch (error) {
    console.error('❌ Test failed with error:', error.message);
  }
}

// Run the test
testInventorySystem();