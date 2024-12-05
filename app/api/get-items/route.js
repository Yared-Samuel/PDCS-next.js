import connect from '../../utils/db'; // Your DB connection utility
import Items from '../../models/Items'; // Your Mongoose model

// Function to fetch items from the database
export const fetchItems = async () => {
  await connect(); // Connect to the DB
  try {
    // Fetch all items from the database
    const items = await Items.find({});
    return items;
  } catch (err) {
    throw new Error('Error fetching items: ' + err.message);
  }
};
