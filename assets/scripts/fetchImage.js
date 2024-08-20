const fetchImage = async (apiUrl, requestOptions) => {
  try {
    const response = await fetch(apiUrl, requestOptions);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    return data[0]?.urls?.regular;
  } catch (error) {
    console.error("Error:", error);
    
  }
};
