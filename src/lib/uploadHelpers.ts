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
  const allowedExtensions = ['.jpg', '.jpeg', '.png', '.webp'];
  const maxSize = 5 * 1024 * 1024; // 5MB
  
  // Get file extension
  const fileName = file.name.toLowerCase();
  const fileExtension = '.' + fileName.split('.').pop();
  
  // Check both MIME type and extension for compatibility
  const hasValidMimeType = allowedTypes.includes(file.type);
  const hasValidExtension = allowedExtensions.includes(fileExtension);
  
  if (!hasValidMimeType && !hasValidExtension) {
    throw new Error('نوع الملف غير مسموح. يُسمح فقط بـ JPG, PNG, WebP');
  }
  
  if (file.size > maxSize) {
    throw new Error('حجم الملف كبير جداً. الحد الأقصى 5MB');
  }
  
  return true;
};

// Upload CV/Resume file
export const uploadCV = async (file: File): Promise<string> => {
  try {
    // Validate CV file first
    validateCVFile(file);
    
    // Create FormData for file upload
    const formData = new FormData();
    formData.append('file', file);
    formData.append('type', 'cv'); // Indicate this is a CV upload
    
    // Upload to API endpoint
    const response = await fetch('/api/upload', {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Failed to upload CV');
    }

    const data = await response.json();
    return data.imageUrl; // API returns 'imageUrl' field for all uploads
  } catch (error: any) {
    console.error('Error uploading CV:', error);
    throw new Error(error.message || 'Failed to upload CV');
  }
};

export const validateCVFile = (file: File): boolean => {
  const allowedTypes = [
    'application/pdf',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
  ];
  const maxSize = 10 * 1024 * 1024; // 10MB for CVs
  
  if (!allowedTypes.includes(file.type)) {
    throw new Error('نوع الملف غير مسموح. يُسمح فقط بـ PDF, DOC, DOCX');
  }
  
  if (file.size > maxSize) {
    throw new Error('حجم الملف كبير جداً. الحد الأقصى 10MB');
  }
  
  return true;
};

// Upload media file (image or video)
export const uploadMedia = async (file: File): Promise<string> => {
  try {
    // Validate media file first
    validateMediaFile(file);
    
    // Create FormData for file upload
    const formData = new FormData();
    formData.append('file', file);
    formData.append('type', 'media'); // Indicate this is a media upload
    
    // Upload to API endpoint
    const response = await fetch('/api/upload', {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Failed to upload media');
    }

    const data = await response.json();
    return data.imageUrl; // API returns 'imageUrl' field for all uploads
  } catch (error: any) {
    console.error('Error uploading media:', error);
    throw new Error(error.message || 'Failed to upload media');
  }
};

export const validateMediaFile = (file: File): boolean => {
  const allowedImageTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/gif'];
  const allowedVideoTypes = ['video/mp4', 'video/webm', 'video/ogg', 'video/quicktime', 'video/x-msvideo', 'video/mpeg'];
  const allowedExtensions = ['.jpg', '.jpeg', '.png', '.webp', '.gif', '.mp4', '.webm', '.ogv', '.mov', '.avi', '.mpeg', '.mkv'];
  
  const maxImageSize = 5 * 1024 * 1024; // 5MB for images
  const maxVideoSize = 100 * 1024 * 1024; // 100MB for videos
  
  // Get file extension
  const fileName = file.name.toLowerCase();
  const fileExtension = '.' + fileName.split('.').pop();
  
  // Check both MIME type and extension for compatibility
  const isImage = allowedImageTypes.includes(file.type) || ['.jpg', '.jpeg', '.png', '.webp', '.gif'].includes(fileExtension);
  const isVideo = allowedVideoTypes.includes(file.type) || ['.mp4', '.webm', '.ogv', '.mov', '.avi', '.mpeg', '.mkv'].includes(fileExtension);
  
  if (!isImage && !isVideo) {
    throw new Error('نوع الملف غير مسموح. يُسمح فقط بـ صور (JPG, PNG, WebP) أو فيديو (MP4, WebM)');
  }
  
  const maxSize = isImage ? maxImageSize : maxVideoSize;
  if (file.size > maxSize) {
    const sizeInMB = maxSize / 1024 / 1024;
    throw new Error(`حجم الملف كبير جداً. الحد الأقصى ${sizeInMB}MB`);
  }
  
  return true;
};
