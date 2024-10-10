const remaining = (getPayment) => {
    let delivered
    if (getPayment?.delivery && getPayment.delivery.length === 0) {
        delivered = 0
    }else if (getPayment?.delivery) {
     delivered = getPayment?.delivery.reduce((acc, curr) => acc + curr.quantity, 0)

    }else {
        delivered = 0
    }
    const paid = getPayment?.quantity

    let remaining = paid - delivered
    console.log(remaining)
    return remaining
}

export default remaining