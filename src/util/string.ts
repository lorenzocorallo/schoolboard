export const urlify = (text: string) => {
  const domainRegex = /^.*([a-zA-Z]+(\.[a-zA-Z]+)+).*$/i;
  const urlied = text.replace(domainRegex, (url) => `https://${url}`);

  const urlRegex = /(https?:\/\/[^\s]+)/g;
  return urlied.replace(urlRegex, (url) => {
    return `<a target="_blank" href="${url}">Link</a>`;
  });
};

export default urlify;
