/**
 * Converts a File object to a Base64 string using FileReader API
 * @param file - The image file to convert
 * @returns Promise that resolves to Base64 string with data URI prefix
 */
export const imageFileToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        resolve(reader.result);
      } else {
        reject(new Error('Failed to read file as string'));
      }
    };
    
    reader.onerror = () => {
      reject(new Error('Error reading file'));
    };
    
    reader.readAsDataURL(file);
  });
};

/**
 * Extracts the Base64 data from a data URI string
 * @param dataUri - The data URI string (e.g., "data:image/jpeg;base64,...")
 * @returns The Base64 data without the prefix
 */
export const extractBase64Data = (dataUri: string): string => {
  return dataUri.split(',')[1];
};

/**
 * Validates if the file is an acceptable image type
 * @param file - The file to validate
 * @returns True if the file is a valid image type
 */
export const isValidImageFile = (file: File): boolean => {
  const validTypes = ['image/png', 'image/jpeg', 'image/jpg'];
  return validTypes.includes(file.type);
};
