"use client";
import { useRouter } from "next/navigation";
import React, { use, useEffect, useState } from "react";
import useSubscriptionModal from "../../../../hooks/useSubscriptionModal";
import { useUser } from "../../../../hooks/useUser";
import { postData } from "../../../../libs/helpers";
import toast from "react-hot-toast";
import Button from "@/components/Button";

const AccountContent = () => {
  const subscribeModal = useSubscriptionModal();
  const router = useRouter();
  const { isLoading, subscription, user } = useUser();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!isLoading && !user) {
      router.replace("/");
    }
  }, [isLoading, user, router]);

  const redirectToCustomerPortal = async () => {
    setLoading(true);
    try {
      const { url, error } = await postData({ url: "/api.create-portal-link" });
      window.location.assign(url);
    } catch (error: any) {
      toast.error(error.message);
    }
    setLoading(false);
  };

  return (
    <div className="mb-7 px-6">
      {!subscription && (
        <div className="flex flex-col gap-y-4">
          <p>No Active Plan</p>
          <Button
            onClick={subscribeModal.onOpen}
            className="w-[300px]"
          ></Button>
        </div>
      )}
      {subscription && (
        <div className="flex flex-col gap-y-4">
          <p>
            You are currently on the{" "}
            <b>{subscription?.prices?.product?.name}</b> Plan
          </p>
          <Button
            disabled={loading || isLoading}
            className="w-[300px]"
            onClick={redirectToCustomerPortal}
          >
            Open Customer Portal
          </Button>
        </div>
      )}
    </div>
  );
};

export default AccountContent;
