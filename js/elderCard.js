// 1.输入姓名 身份证号
// 2.返回需挂失补办的卡号
// 3.选择卡号，填写邮寄信息或选择自取，APP计算付费
// 4.调用付费接口（支付宝、微信)
// 5.完成付费，生成通知，完成！


function handleClick() {
    window.yl.call("alert", { 
        title:"温馨提示", 
        content:"亲，本功能正在玩命开发中...", 
        buttonText:"确定" 
        })
    // alert('亲，本功能正在玩命开发中...');
}

common.getUerInfo()
