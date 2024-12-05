import { fetchItems } from "../../api/get-items/route";

export default async function GetItem() {
  try {
    // Fetch items using the separated function
    const items = await fetchItems();

    return (
      <div>
        <h1>Items</h1>
        <ul>
          {items.map((item) => (
            <li key={item._id}>{item.name}</li>
          ))}
        </ul>
      </div>
    );
  } catch (err) {
    return (
      <div>
        <p>Error: {err.message}</p>
      </div>
    );
  }
}
