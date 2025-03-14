const parseJson = function (data) {
  let stringData;
  try {
    stringData = JSON.parse(data);
  } catch (error) {}
  return stringData;
};

export default parseJson;
