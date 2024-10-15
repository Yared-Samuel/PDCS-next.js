const balanceCheck = async (newQuantity, paidBalance, deliveryArray) => {
  let deliveredBalance = 0;
  console.log({newQuantity, paidBalance, deliveryArray})
  if (deliveryArray.length > 0) {
    deliveredBalance = deliveryArray.reduce(
      (acc, curr) => acc + curr.quantity,
      0
    );
    console.log("there is balance");
  }
  deliveredBalance += newQuantity;
  console.log(deliveredBalance)
  if (paidBalance < deliveredBalance) {
    throw new Error("Balance is not enough");
  }
  console.log(deliveredBalance);
  return "Balance check passed. Proceeding with further actions.";
};

export default balanceCheck;
