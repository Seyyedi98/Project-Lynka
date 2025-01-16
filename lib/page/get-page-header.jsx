const getPageContent = (page) => {
  const header = JSON.parse(page.content);
  return header[0];
};

export default getPageContent;
