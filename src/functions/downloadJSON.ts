/**
 * Converts the provided json data to a file, and begins downloading
 * it
 */
export default function downloadJSON(fileName: string, jsonData: {[key: string]: any}): void {
  const data = encodeURIComponent(JSON.stringify(jsonData, null, 2));
  const uri = `data:application/json;charset=utf-8,${data}`;

  const linkElement = document.createElement('a');
  linkElement.setAttribute('href', uri);
  linkElement.setAttribute('download', fileName);
  linkElement.click();
}
