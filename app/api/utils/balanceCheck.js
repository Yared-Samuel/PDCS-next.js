const balanceCheck = async (newQuantity, paidBalance, deliveryArray) => {
  let deliveredBalance = 0;
  console.log({newQuantity, paidBalance, deliveryArray})

  deliveryArray.length ? deliveryArray.forEach((item)=> deliveredBalance = deliveredBalance + item.quantity) : true

  console.log(deliveredBalance)

  
  deliveredBalance = deliveredBalance + Number(newQuantity);
  console.log({"deliveredBalance": deliveredBalance})
  console.log({"paidBalance": paidBalance})
  
  if (paidBalance < deliveredBalance) {
    throw new Error("Balance is not enough");
  }
  
  return "Balance check passed. Proceeding with further actions.";
};

export default balanceCheck;
