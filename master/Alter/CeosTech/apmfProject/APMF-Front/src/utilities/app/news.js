export const getNewsPerId = (newsList, id) => {
  if (newsList !== undefined) {
    const newsSelected = newsList.find((news) => news.id === parseFloat(id));
    return newsSelected;
  }
  return undefined;
};
