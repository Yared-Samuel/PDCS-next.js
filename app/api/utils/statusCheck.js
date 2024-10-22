const statusCheck = async (newQuantity, paidBalance, deliveryArray) => {
    let deliveryArraySum = 0
  // deliveryArraySum = deliveryArray?.reduce(
  //   (acc, curr) => acc + curr.quantity,
  //   0
  // );

  deliveryArray.length ? deliveryArray.forEach((item)=> deliveryArraySum = deliveryArraySum + item.quantity) : true

                                        // 4400
  const delivered = deliveryArraySum + Number(newQuantity);

    console.log({paidBalance, deliveryArraySum, newQuantity, delivered})
  if (paidBalance == delivered) return "completed"
  else return "remaining";
};

export default statusCheck;
