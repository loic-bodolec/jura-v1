export const getTokenFromAuthorization = (authorization: string | undefined): string | null => {
  if (!authorization) return null;
  return authorization.split(' ')[1];
};
