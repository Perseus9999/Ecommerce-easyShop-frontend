"use client";

import {
  CartItem,
  addToCart,
  decrementAmount,
  handleCountValue,
  incrementAmount,
  removeFromCart,
} from "@/lib/features/cart/cartSlice";
import { useDispatch } from "react-redux";
import { Button } from "./ui/button";
import { FaShoppingCart } from "react-icons/fa";
import { PiBasketFill } from "react-icons/pi";
import { useAppSelector } from "@/lib/hooks";
import { useEffect, useState } from "react";

type AddToCartWrapperProps = {
  cartItem: CartItem;
  btnStyle?: "style-1" | "style-2" | "style-3" | "style-4" | "withoutCounter";
};

const AddToCartBtnWrapper = ({
  cartItem,
  btnStyle = "style-1",
}: AddToCartWrapperProps) => {
  const [addedItem, setAddedItem] = useState<undefined | CartItem>();
  const dispatch = useDispatch();
  const { cartItems, countValue } = useAppSelector((state) => state.cartSlice);

  useEffect(() => {
    setAddedItem(cartItems.find((item) => item._id === cartItem._id));
    dispatch(handleCountValue("none"));
    return () => {};
  }, [cartItem._id, cartItems, dispatch]);

  console.log(addedItem);

  const Counter = () => (
    <div className="flex w-full sm:w-auto relative z-10 items-center bg-background rounded-lg overflow-hidden border">
      <Button
        type="button"
        variant="outline"
        className="h-9 w-9 rounded-none border-none"
        onClick={() => dispatch(decrementAmount(cartItem._id))}
      >
        -
      </Button>
      <span className="px-3 flex-1 text-center">{addedItem?.amount}</span>
      <Button
        type="button"
        variant="outline"
        className="h-9 w-9 rounded-none border-none"
        onClick={() => dispatch(incrementAmount(cartItem._id))}
      >
        +
      </Button>
    </div>
  );

  return (
    <>
      {btnStyle === "withoutCounter" && (
        <Button
          className="basis-1/2 flex gap-2 items-center"
          type="button"
          onClick={() => {
            addedItem
              ? dispatch(removeFromCart(cartItem._id))
              : dispatch(addToCart({ ...cartItem, amount: countValue }));
          }}
        >
          <span className="text-lg">
            <FaShoppingCart />
          </span>
          <span>{addedItem ? "Added" : "Add to cart"}</span>
        </Button>
      )}
      {btnStyle === "style-1" && (
        <>
          {!addedItem ? (
            <Button
              className="w-full flex gap-2 items-center text-xs sm:text-base relative z-10"
              type="button"
              onClick={() => dispatch(addToCart({ ...cartItem, amount: 1 }))}
            >
              <span className="text-lg">
                <FaShoppingCart />
              </span>
              <span>Add To Cart</span>
            </Button>
          ) : (
            <Counter />
          )}
        </>
      )}

      {btnStyle === "style-2" && (
        <>
          {!addedItem ? (
            <Button
              type="button"
              className="bg-transparent border-input text-primary flex gap-2 items-center rounded-3xl hover:bg-primary hover:text-white text-xs sm:text-base w-full sm:w-auto relative z-10"
              onClick={() => dispatch(addToCart({ ...cartItem, amount: 1 }))}
            >
              <span className="text-xl">
                <PiBasketFill />
              </span>
              <span>Cart</span>
            </Button>
          ) : (
            <Counter />
          )}
        </>
      )}

      {btnStyle === "style-3" && (
        <>
          {!addedItem ? (
            <Button
              className="hover:bg-primary hover:text-white"
              type="button"
              variant="outline"
              title="Add to cart"
              onClick={() => dispatch(addToCart({ ...cartItem, amount: 1 }))}
            >
              <span className="text-sm sm:text-base">Add To Cart</span>
            </Button>
          ) : (
            <Counter />
          )}
        </>
      )}
      {btnStyle === "style-4" && (
        <>
          {!addedItem ? (
            <Button
              className="h-8 w-full sm:w-8 hover:bg-primary hover:text-white"
              type="button"
              variant="outline"
              title="Add to cart"
              onClick={() => dispatch(addToCart({ ...cartItem, amount: 1 }))}
            >
              <span className="text-lg">+</span>
            </Button>
          ) : (
            <Counter />
          )}
        </>
      )}
    </>
  );
};

export default AddToCartBtnWrapper;
