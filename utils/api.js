export const fetchItems = async (queryData) => {
  const response = await fetch(`/api/${queryData?.queryKey[0]}`);

  if (!response.ok) {
    throw new Error("Network response was not ok");
  }

  return response.json();
};

export const fetchFeatureRequests = async (queryData) => {
  const response = await fetch(
    `/api/${queryData?.queryKey[0]}?page=${queryData?.queryKey[1]}&limit=${queryData?.queryKey[2]}`
  );

  if (!response.ok) {
    throw new Error("Network response was not ok");
  }

  return response.json();
};

export const addIdea = async (ideaToBeAdded) => {
  const response = await fetch(`/api/ideas`, {
    method: "POST",
    body: JSON.stringify(ideaToBeAdded),
  });

  if (!response.ok) {
    throw new Error("Network response was not ok");
  }

  return response.json();
};

export const deleteIdea = async (ideaToBeDeletedId) => {
  const response = await fetch(`/api/ideas?deletionId=${ideaToBeDeletedId}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    throw new Error("Network response was not ok");
  }

  return response.json();
};
