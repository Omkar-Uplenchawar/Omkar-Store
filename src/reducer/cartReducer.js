const cartReducer = (state, action) => {
  if (action.type === "ADD_TO_CART") {
    let { id, color, amount, product ,price} = action.payload;
    // console.log(
    //   "🚀 ~ file: cartReducer.js ~ line 4 ~ cartReducer ~ product",
    //   product
    // );

    let existingProduct =state.cart.find((curItem) => curItem.id == id + color );
    let cartProduct;
    if (existingProduct) {
      let updateProduct = state.cart.map((curElem)=>{
        if (curElem.id == id + color) {
          let newAmount =curElem.amount +amount;
          if (newAmount>= curElem.max) {
            newAmount = curElem.max;
          }
          return{
            ...curElem,
            amount:newAmount,
          };
        } else {
          return {
            ...curElem
          }
        }
      })
      return {
        ...state,
        cart: updateProduct,
      }; 
    }else{
      cartProduct = {
      id: id + color,
      name: product.name,
      color,
      amount,
      image: product.image[0].url,
      price: product.price,
      max: product.stock,
    };

    }

    
    return {
      ...state,
      cart: [...state.cart, cartProduct],
    };
  }

  if (action.type === "SET_DECREASE") {
    let updatedProduct = state.cart.map((curElem) =>{
      if (curElem.id ===action.payload){
        let dec = curElem.amount -1;
          if (dec<=1) {
            dec=1;
          }
        return {
          ...curElem,
          amount: dec,
        }
      }else {
        return curElem;
      }
    })
    return {
      ...state,
      cart: updatedProduct,
    }
  }
  if (action.type === "SET_INCREASE") {
    let updatedProduct = state.cart.map((curElem) =>{
      if (curElem.id ===action.payload){
        let inc = curElem.amount + 1;
          if (inc>=curElem.max) {
            inc=curElem.max;
          }
        return {
          ...curElem,
          amount: inc,
        }
      }else {
        return curElem;
      }
    })
    return {
      ...state,
      cart: updatedProduct,
    }
  }

  if (action.type === "REMOVE_ITEM") {
    let updatedCart = state.cart.filter(
      (curItem) => curItem.id !== action.payload
    );
    return {
      ...state,
      cart: updatedCart,
    };
  }

  if (action.type === "CLEAR_CART") {
    return {
      ...state,
      cart: [],
    };
  }

  if(action.type === "CART_ITEM_TOTAL_PRICE"){
    let {total_price , total_item} = state.cart.reduce((accum, curElem)=>{
      let {price , amount} = curElem
       accum.total_price += (price * amount);
       accum.total_item += amount;
       return accum;
    },{
      total_item:0,
      total_price:0,
    });
    return {
      ...state,
      total_price,
      total_item,
    }
  }


  return state;
};

export default cartReducer;
