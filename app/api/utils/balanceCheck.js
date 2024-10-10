import Inventory from "../../models/Inventory";

const balanceCheck = async (so, quantity) => {
    let deliveredBalance = 0
  const inventory = await Inventory.findOne({ salesOrder: so });

  const paidBalance = inventory?.quantity;

  const deliveryArray = inventory?.delivery;

  if (deliveryArray.length > 0) {
    deliveredBalance = deliveryArray.reduce((acc, curr) => acc + curr.quantity, 0) 
    console.log("there is balance")
  }
  
  deliveredBalance += quantity

  if (paidBalance < deliveredBalance){
    throw new Error("Balance is not enough");
  }
  console.log(deliveredBalance)
  return "Balance check passed. Proceeding with further actions.";
};

export default balanceCheck;
