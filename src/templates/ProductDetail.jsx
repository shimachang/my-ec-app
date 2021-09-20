import React, { useState, useEffect, useCallback } from "react";
import { makeStyles } from "@material-ui/core";
import { useSelector, useDispatch } from "react-redux";
import { db } from "../firebase";
import HTMLReactParser from "html-react-parser";
import { ImageSwiper } from "../components/Products";
import { SizeTable } from "../components/Products";
const useStyles = makeStyles((theme) => ({
    sliderBox: {
        [theme.breakpoints.down("sm")]: {
            margin: "0 auto 24px auto",
            height: 320,
            width: 320,
        },
        [theme.breakpoints.up("sm")]: {
            margin: "0 auto",
            height: "auto",
            width: 400,
        },
    },
    detail: {
        textAlign: "left",
        [theme.breakpoints.down("sm")]: {
            margin: "0 auto 16px auto",
            height: 320,
            width: 320,
        },
        [theme.breakpoints.up("sm")]: {
            margin: "0 auto",
            height: "aoto",
            width: 400,
        },
    },
    price: {
        fontSize: 36,
    },
}));

const returnCodeTobr = (text) => {
    if (text === "") {
        return text;
    } else {
        return HTMLReactParser(text.replace(/\r?\n/g, "<br/>"));
    }
};

const ProductDetail = () => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const selector = useSelector((state) => state);
    const path = selector.router.location.pathname;
    const id = path.split("/product/")[1];

    const [product, setProduct] = useState(null);

    useEffect(() => {
        db.collection("products")
            .doc(id)
            .get()
            .then((doc) => {
                const data = doc.data();
                setProduct(data);
            });
    }, []);

    return (
        <section className={"c-section-wrapin"}>
            {product && (
                <div className="p-grid__row">
                    <div className={classes.sliderBox}>
                        <ImageSwiper images={product.images} />
                    </div>
                    <div className={classes.detail}>
                        <h2 className={"u-text__heeadline"}>{product.name}</h2>
                        <p className={classes.price}>{product.price.toLocaleString()}¥</p>
                        <div className="module-spacer--small"></div>
                        <SizeTable sizes={product.sizes}/>
                        <div className="module-spacer--small"></div>
                        <p>{returnCodeTobr(product.description)}</p>
                    </div>
                </div>
            )}
        </section>
    );
};

export default ProductDetail;
