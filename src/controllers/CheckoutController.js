const Firebase = require("../services/Firebase");
const OrderService = require("../services/OrderService");
const PayService = require("../services/PayService");

module.exports = {
  async checkout(req, res) {
    /* 
            #swagger.tags = ['Payment']
             #swagger.description = "Order by trash"
            */
    try {
      // const items_cart = req.body.items_cart;
      const total = req.body.total;
      const idorder = req.body.idorder;
      await PayService.createPayment(idorder,total,"cash")//nhận hàng xong nhớ cập nhật payment status


      await OrderService.updateOrderStatus(idorder)

      const tokenDeviceMobile ="cg9vLKO8RFaMBsW9LxELkB:APA91bFF0PM8MZOFQ_MQ4tcrEC7c6pNIRQ9s4JM7O388T75wfa5gEHDX8Il9MV7Bw79qh_MrcIJiWZ_grOcXwZ2O14SfRQMyCPDyNllJ_bNOevcig1hdh4ZvgcTBWEIIiaMNX0CQmLV0";//bao
      
      // "eowymDzjzrDw-YfpzdJgJs:APA91bFpIgAosp6Z3SgHZr59sr2Juo9uJanEE7WtSw7Chp-bgNFcGyefVETfYJ1fuKhTDcmDmdtYd8TuyeALS_MkfIIyC-FU4q5gRfZCF6YHWkdfASqiE1Oul1NsS5GSFh8-hu0n545G";//huu
      // "eRVsNwobSVSttr8W3LT_CZ:APA91bEvQCsQhK4JM6yX5iZt3uahN-fin6y00D5j1_zbQPQ1BHVBpbcMcpnjhKZk0cFP8-BjQ2Vss1Fp6hdiAd4m496PUsP5gr1rz-L8pQi7UgWhkYpvNmjaFwU1PSr6kZf1HEVznx9e";//q.a
      // Firebase.setMsg(tokenDeviceMobile, "Bạn có 1 đơn đặt hàng mới!");
      // Firebase.sendNoti();

      Firebase.registerUichaTopic();
            Firebase.fcm_uicha_Topic("Bạn có 1 đơn đặt hàng mới!");

      

      return res.status(200).json({
        status: 200,
        message: "Đặt hàng thành công!",
      });
    } catch (error) {
      console.log("_______(orderNoMoneyErr)");
    }
  },
};

