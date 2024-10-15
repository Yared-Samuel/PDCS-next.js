const balanceCheck = async ( quantity, paidBalance, deliveryArray) => {
    let deliveredBalance = 0

  
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
