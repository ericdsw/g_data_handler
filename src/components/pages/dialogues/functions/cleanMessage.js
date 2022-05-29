const cleanupRegex = /({.=.+?})|({\/.})|(\[.+?\])|({w})|({g})/g;
export default function cleanMessage(message) {
  return message.replace(cleanupRegex, '');
}
