export const validateImage = async (image: File | null): Promise<string | null> => {
  if (!image) {
    return "Imagem obrigatória."; 
  }

  if (!image.type.startsWith("image/")) {
    return "O arquivo precisa ser uma imagem."; 
  }

  return new Promise((resolve) => {
    const img = new Image();
    const reader = new FileReader();

    reader.onload = (e: ProgressEvent<FileReader>) => {
      img.onload = () => {
        if (img.width !== 1080 || img.height !== 1080) {
          resolve("A imagem deve ter 1080x1080 pixels.");
        } else {
          resolve(null);  
        }
      };

      img.onerror = () => resolve("Erro ao carregar a imagem.");
      img.src = e.target?.result as string;
    };

    reader.readAsDataURL(image);
  });
};
