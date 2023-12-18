export const formatDate = (dateToFormat) => {
  const date = new Date(dateToFormat);
  let m = (date.getMonth() + 1).toString().padStart(2, 0);
  let d = date.getDate().toString().padStart(2, 0);
  return `${m}/${d}/${date.getFullYear()}`;
};
