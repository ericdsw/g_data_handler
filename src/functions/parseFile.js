export default function parseFile(file, acceptedType) {
  const fileReader = new FileReader();

  const fileParsePromise = new Promise((resolve, reject) => {
    if (file.type !== acceptedType) {
      reject(new Error("Unsupported file type provided"));
    } else {
      fileReader.onload = (event) => {
        try {
          const result = JSON.parse(event.target.result);
          resolve(result);
        } catch (exception) {
          reject(new Error("Malformed JSON file"));
        }
      };

      fileReader.onerror = (event) => {
        reject(new Error("Error reading file"));
      };
      fileReader.readAsText(file);
    }
  });

  return fileParsePromise;
}
