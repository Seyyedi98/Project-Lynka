const useTruncate = (data, maxLength) => {
  if (data.length > maxLength) {
    const truncatedData = data.slice(0, maxLength);
    return `${truncatedData}...`;
  } else {
    return data;
  }
};
export default useTruncate;
