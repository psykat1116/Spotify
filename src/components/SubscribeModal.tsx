"use client";
import { useState } from "react";
import { Price, ProductWithPrice } from "../../types";
import Button from "./Button";
import Modal from "./Modal";
import { useUser } from "../../hooks/useUser";
import toast from "react-hot-toast";
import { postData } from "../../libs/helpers";
import { getStripe } from "../../libs/stripeClient";
import useSubscriptionModal from "../../hooks/useSubscriptionModal";

interface SubscribeModalProps {
  products: ProductWithPrice[];
}

const formatPrice = (price: Price) => {
  const priceString = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: price.currency,
    minimumFractionDigits: 0,
  }).format((price.unit_amount || 0) / 100);

  return priceString;
};

const SubscribeModal: React.FC<SubscribeModalProps> = ({ products }) => {
  const subscribeModal = useSubscriptionModal();
  const [priceIdLoading, setPriceIdLoading] = useState<string>();
  const { user, isLoading, subscription } = useUser();

  const onChange = (open: boolean) => {
    if (!open) {
      subscribeModal.onClose();
    }
  };

  // Subscription Checkout Function
  const handleCheckout = async (price: Price) => {
    setPriceIdLoading(price.id);
    if (!user) {
      setPriceIdLoading(undefined);
      return toast.error("You must be logged in to subscribe");
    }
    if (subscription) {
      setPriceIdLoading(undefined);
      return toast("You are already subscribed");
    }
    try {
      const sessionId = await postData({
        url: "/api/create-checkout-session",
        data: { price },
      });

      const stripe = await getStripe();
      stripe?.redirectToCheckout(sessionId);
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setPriceIdLoading(undefined);
    }
  };

  let content = <div className="text-center">No Products Available</div>;

  if (products.length) {
    content = (
      <div>
        {products.map((product) => {
          if (!product.prices?.length) {
            return <div key={product.id}>No Prices Available</div>;
          }
          return product.prices.map((price) => (
            <Button
              onClick={() => handleCheckout(price)}
              disabled={isLoading || price.id == priceIdLoading}
              key={price.id}
            >{`Subscribe for ${formatPrice(price)} a ${
              price.interval
            }`}</Button>
          ));
        })}
      </div>
    );
  }
  if (subscription) {
    content = <div className="text-center">Already Subscribed</div>;
  }
  return (
    <Modal
      title="Only For Premium Users"
      description="Listen to music with Spotify Premium"
      isOpen={subscribeModal.isOpen}
      onChange={onChange}
    >
      {content}
    </Modal>
  );
};

export default SubscribeModal;
