export async function getDataFromApi() {
    const res = await fetch("https://api.brest.bar/items/bars");
    if (!res.ok) {
      throw new Error("Failed to fetch data");
    }
    return res.json();
  }
  
  