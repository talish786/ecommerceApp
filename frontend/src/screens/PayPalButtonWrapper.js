import React, { useEffect, useRef, useState } from "react";
import axios from "axios";

const PayPalButtonWrapper = ({ amount, onSuccess }) => {
  const [sdkReady, setSdkReady] = useState(false);
  const buttonRef = useRef();

  useEffect(() => {
    const addPayPalScript = async () => {
      const { data: ClientId } = await axios.get(`/api/config/paypal`);
      const script = document.createElement("script");
      script.type = "text/javascript";
      script.src = `https://www.paypal.com/sdk/js?client-id=${ClientId}`;
      script.async = true;
      script.onload = () => {
        setSdkReady(true);
      };
      document.body.appendChild(script);
    };

    if (!window.paypal) {
      addPayPalScript();
    } else {
      setSdkReady(true);
    }
  }, []);

  useEffect(() => {
    if (sdkReady) {
      window.paypal
        .Buttons({
          createOrder: (data, actions) => {
            return actions.order.create({
              purchase_units: [
                {
                  amount: {
                    value: amount,
                  },
                },
              ],
            });
          },
          onApprove: async (data, actions) => {
            const order = await actions.order.capture();
            onSuccess(order);
          },
          onError: (err) => {
            console.error(err);
          },
        })
        .render(buttonRef.current);
    }
  }, [sdkReady, amount, onSuccess]);

  return <div ref={buttonRef} />;
};

export default PayPalButtonWrapper;
