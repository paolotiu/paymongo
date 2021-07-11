export const isomorphicBtoA = (string: string) => {
  if (typeof window === 'undefined') {
    return Buffer.from(string).toString('base64');
  }
  return window.btoa(string);
};
