export default function useFilterTheme(themes, filter) {
  const data = Object.entries(themes).filter(
    ([key, [_, data]]) => data.type === filter,
  );

  return data;
}
