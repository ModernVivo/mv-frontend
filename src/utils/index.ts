export const objectToQueryParams = (obj: string | string[][] | null) => {
  if(!obj) return "";
  return "?" + new URLSearchParams(obj).toString();
};
