
const totalAmount = (cart)=>{

const amount = cart.reduce((acc, item)=>acc + item.food.price * item.quantity , 0)
return amount;
}

export default totalAmount;