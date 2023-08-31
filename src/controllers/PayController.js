const paypal = require("paypal-rest-sdk");
const Firebase = require("../services/Firebase");

const PayService = require("../services/PayService");
const OrderService = require("../services/OrderService");
const OrderDetailService = require("../services/OrderDetailService");
const crypto = require("crypto");

module.exports = {
  async pay(req, res) {
    /* 
            #swagger.tags = ['Payment']
             #swagger.description = "payment by paypal"
            */
    try {
      const payerId = req.query.PayerID;
      const paymentId = req.query.paymentId;
      const idpayment = req.query.idpayment;
      const idorder = req.query.idorder;
      const customerid = req.query.customerid;

      const total = await PayService.getPayment(idpayment);
      const execute_payment_json = {
        payer_id: payerId,
        transactions: [
          {
            amount: {
              currency: "USD",
              total: total,
            },
          },
        ],
      };
      paypal.payment.execute(
        paymentId,
        execute_payment_json,
        async function (error, payment) {
          if (error) {
            console.log(error.response);
            throw error;
          } else {
            console.log(JSON.stringify(payment));
            //set lai cart
            //chuyen status bang ordercarts

            await PayService.updatePayment(idpayment);
            await OrderService.updateOrderStatus(idorder, "Pending", total);
            const id = crypto.randomBytes(15).toString("hex");
            await OrderService.createOrder(id, customerid);

            // const orderDetail = await OrderDetailService.getOrderCartDetail(idorder)
            // await OrderDetailService.updateOrderDetail(orderDetail.idorderdetail)
            // await OrderService.updateOrderTracking(idorder, "Pending");
            // const tokenDeviceMobile =
            //   "emjevywaQ2W8L5wOMVL9bO:APA91bFgJqBvd4QDCF_Ng1h8uw5zhUfFLU3ICA-rKfLiEK9gA2hn3oHjrc4hl58Ttu1C5ChmYC-q2m3amNjAmFoqlhR4d9guCfsncxjRuEw0T3-eeEl44lyuOn0rMn6mWoNbfe8p-05N";
            // Firebase.setMsg(tokenDeviceMobile, "Bạn có 1 đơn đặt hàng mới!");
            // Firebase.sendNoti();
            res.status(200).send({
              status: "success",
              message: "Mua hàng thành công",
            });
          }
        }
      );
    } catch (error) {
      console.log("____(pay) err");
    }
  },
};
