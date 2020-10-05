/**
 * covers the provided json data to a file, and begins downloading
 * it
 */
export default function downloadJSON(fileName, jsonData) {
  const data = encodeURIComponent(JSON.stringify(jsonData));
  const uri = `data:application/json;charset=utf-8,${data}`;

  const linkElement = document.createElement("a");
  linkElement.setAttribute("href", uri);
  linkElement.setAttribute("download", fileName);
  linkElement.click();
}
