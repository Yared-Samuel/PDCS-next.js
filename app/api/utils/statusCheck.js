const statusCheck = async (newQuantity, paidBalance, deliveryArray) => {
    //0
  const deliveryArraySum = deliveryArray?.reduce(
    (acc, curr) => acc + curr.quantity,
    0
  );
                                        // 4400
  const delivered = deliveryArraySum + newQuantity;

         // 8800     
  if (paidBalance = delivered) return "completed";
  else return "remaining";
};

export default statusCheck;
