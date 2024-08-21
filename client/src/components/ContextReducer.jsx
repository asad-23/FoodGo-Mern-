import React, { createContext, useContext, useReducer } from "react";

const CartDispatchContext = createContext()
const CartStateContext = createContext()

const reducer = (state, action) => {
    switch(action.type){
        case 'ADD': 
            return [...state, {
                id: action.id,
                name: action.name,
                price: action.price,
                totalPrice: action.totalPrice,
                count: action.count
            }]

        case 'REMOVE':
            let newArr = state.filter((item, index) => index !== action.index)
            return newArr;

        case 'UPDATE':
            let updatedArr = state.map((food) => {
                if(food.id === action.id){
                    return {...food, count: action.count, totalPrice: action.totalPrice}
                } else {
                    return food;
                }
            });
            return updatedArr;
        
        case 'DROP':
            let empArr = [];
            return empArr;

        default:
            console.log("Error");
            return state;
    }
}

export const CartProvider = ({children}) => {

    const [state, dispatch] = useReducer(reducer, [])

    return(
        <CartDispatchContext.Provider value={dispatch}>
            <CartStateContext.Provider value={state}>
                {children}
            </CartStateContext.Provider>
        </CartDispatchContext.Provider>
    )
}


export const useCart = () => useContext(CartStateContext);
export const useCartDispatch = () => useContext(CartDispatchContext);