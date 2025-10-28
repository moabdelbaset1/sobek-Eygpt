// Upload helpers for product images
export const uploadProductImage = async (file: File): Promise<string> => {
  try {
    // Validate file first
    validateImageFile(file);
    
    // Create FormData for file upload
    const formData = new FormData();
    formData.append('file', file);
    
    // Upload to API endpoint
    const response = await fetch('/api/upload', {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Failed to upload image');
    }

    const data = await response.json();
    return data.imageUrl;
  } catch (error: any) {
    console.error('Error uploading image:', error);
    throw new Error(error.message || 'Failed to upload image');
  }
};

export const validateImageFile = (file: File): boolean => {
  const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
  const maxSize = 5 * 1024 * 1024; // 5MB
  
  if (!allowedTypes.includes(file.type)) {
    throw new Error('نوع الملف غير مسموح. يُسمح فقط بـ JPG, PNG, WebP');
  }
  
  if (file.size > maxSize) {
    throw new Error('حجم الملف كبير جداً. الحد الأقصى 5MB');
  }
  
  return true;
};