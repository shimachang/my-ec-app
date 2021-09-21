import React from "react";
import { useDispatch, useSelector } from "react-redux";
import List from "@material-ui/core/List"
import { getProductsInCart } from "../reducks/users/selectors";

const CartList = () => {
    const selector = useSelector((state => state))
    const productsInCart = getProductsInCart(selector)
    return (
        <section className="c-secction-wrapin">
            <h2 className="u-text__headline">
                ショッピングカート
            </h2>
            <List>
                {productsInCart.length > 0 && (
                    productsInCart.map(product => )
                )}
            </List>
        </section>
    )
}

export default CartList