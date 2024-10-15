const statusCheck = async ( quantity, paidBalance, deliveryArray) => {
  const deliveryArraySum = deliveryArray?.reduce(
    (acc, curr) => acc + curr.quantity,
    0
  );

  if (paidBalance < deliveryArraySum + quantity) return "remaining";
  else return "completed";
};

export default statusCheck;
