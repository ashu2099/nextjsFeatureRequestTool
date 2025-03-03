export const fetchItems = async (queryData) => {
  const response = await fetch(`/api/${queryData?.queryKey[0]}`);

  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return response.json();
};
