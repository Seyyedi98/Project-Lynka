const getPageTheme = (page) => {
  const theme = JSON.parse(page.theme);

  return theme;
};

export default getPageTheme;
