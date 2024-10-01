export const convertToBase64 = (file: Blob): Promise<string> => {
  return new Promise((resolve, reject) => {
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);
    fileReader.onload = () => {
      if (typeof fileReader.result === "string") {
        resolve(fileReader.result);
      } else {
        reject(new Error("Failed to convert file to base64 string"));
      }
    };
    fileReader.onerror = (error) => {
      reject(error);
    };
  });
};
