export function validateCaption(caption: string): boolean {
    return caption.length >= 3 && caption.length <= 300; 
  }
  