const getPageHero = (page) => {
  const hero = JSON.parse(page.content);

  return hero[0][0];
};

export default getPageHero;
