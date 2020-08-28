// The following is a little hacky, adds a link to the blob and immediately clicks it
// and removes it from the document. See https://stackoverflow.com/a/49500465
function createBlobLinkAndClick(blob: Blob, filename: string) {
  const blobUrl = window.URL.createObjectURL(blob);
  let a = document.createElement('a');
  a.download = filename;
  a.href = blobUrl;
  document.body.appendChild(a);
  a.click();
  a.remove();
}

export function downloadImage(imageUrl: string, downloadFilename: string) {
  fetch(imageUrl)
    .then(response => response.blob())
    .then(blob => {
      createBlobLinkAndClick(blob, downloadFilename);
    })
    .catch(error => console.error(error));
}
