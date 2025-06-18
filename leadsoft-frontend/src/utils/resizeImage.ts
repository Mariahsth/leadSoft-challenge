export const resizeImage = (file: File, width = 1080, height = 1080): Promise<File> => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    const reader = new FileReader();

    reader.onload = (event) => {
      const result = event.target?.result;

      if (!result) {
        reject("Erro ao ler o arquivo");
        return;
      }

      img.onload = () => {
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");

        if (!ctx) {
          reject("Erro ao obter o contexto do canvas");
          return;
        }

        canvas.width = width;
        canvas.height = height;

        // 🔁 Calcular o crop central
        const aspectRatio = img.width / img.height;
        const targetRatio = width / height;

        let sourceWidth = img.width;
        let sourceHeight = img.height;
        let sourceX = 0;
        let sourceY = 0;

        if (aspectRatio > targetRatio) {
          // imagem mais larga que 1:1
          sourceWidth = img.height * targetRatio;
          sourceX = (img.width - sourceWidth) / 2;
        } else if (aspectRatio < targetRatio) {
          // imagem mais alta que 1:1
          sourceHeight = img.width / targetRatio;
          sourceY = (img.height - sourceHeight) / 2;
        }

        // desenha com crop centralizado
        ctx.drawImage(img, sourceX, sourceY, sourceWidth, sourceHeight, 0, 0, width, height);

        canvas.toBlob(
          (blob) => {
            if (blob) {
              const resizedFile = new File([blob], file.name, { type: "image/jpg" });
              resolve(resizedFile);
            } else {
              reject("Erro ao converter canvas para blob");
            }
          },
          "image/jpg",
          0.95
        );
      };

      img.onerror = () => reject("Erro ao carregar a imagem");
      img.src = result as string;
    };

    reader.readAsDataURL(file);
  });
};
