const getPageContent = (page) => {
  const elements = JSON.parse(page.content);
  return elements[1];
};

export default getPageContent;
