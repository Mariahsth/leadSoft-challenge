export function validateImage(image: string): boolean {
    const imageExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.bmp', '.svg'];
    return imageExtensions.some((ext) => image.toLowerCase().endsWith(ext));
  };
  
