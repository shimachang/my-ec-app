import React, { useEffect } from "react";
import IconButton from "@material-ui/core/IconButton";
import { Badge } from "@material-ui/core";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import MenuIcon from "@material-ui/icons/Menu";
import { getProductsInCart, getUserId } from "../../reducks/users/selectors";
import { useSelector, useDispatch } from "react-redux";
import { db } from "../../firebase";
import { fetchProductsInCart } from "../../reducks/users/operations";

const HeaderMenu = (props) => {
    const dispatch = useDispatch();
    const selector = useSelector((state) => state);
    const userId = getUserId(selector);
    let productsInCart = getProductsInCart(selector);

    // Listen products in user's cart
    useEffect(() => {
        const unsubscribe = db
            .collection("users")
            .doc(userId)
            .collection("cart")
            .onSnapshot((snapshots) => {
                snapshots.docChanges().forEach((change) => {
                    const product = change.doc.data();
                    const changeType = change.type;

                    switch (changeType) {
                        case "added":
                            productsInCart.push(product);
                            break;
                        case "modified":
                            const index = productsInCart.findIndex((product) => product.cartId === change.doc.id);
                            productsInCart[index] = product;
                            break;
                        case "removed":
                            productsInCart = productsInCart.filter((product) => product.cartId !== change.doc.id);
                            break;
                        default:
                            break;
                    }
                });

                dispatch(fetchProductsInCart(productsInCart));
            });

        return () => unsubscribe();
    }, []);

    return (
        <>
            <IconButton>
                <Badge badgeContent={productsInCart.length} color="secondary">
                    <ShoppingCartIcon />
                </Badge>
            </IconButton>
            <IconButton>
                <FavoriteBorderIcon />
            </IconButton>
            <IconButton>
                <MenuIcon onClick={(e) => props.handleDrawerToggle(e)} />
            </IconButton>
        </>
    );
};

export default HeaderMenu;
