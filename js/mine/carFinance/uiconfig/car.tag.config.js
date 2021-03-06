/*************************************************/
/**                                                **/
/**        汽车金融-车辆信息组件配置项                    **/
/**        使用模块：已审、待审                            **/
/**                                                **/
/**        备注：《所有修改人要添加使用模块》                **/
/**                                                **/
/*************************************************/
var carTag = [{
    xtype: 'fieldcontainer',
    items: [{
        xtype: 'hidden',
        name: 'id'
    }]
}, {
    xtype: 'fieldcontainer',
    items: [{
        xtype: 'hidden',
        name: 'bankId'
    }]
}, {
    xtype: 'fieldcontainer',
    items: [{
        xtype: 'hidden',
        name: 'brandId'
    }]
}, {
    xtype: 'fieldcontainer',
    items: [{
        xtype: 'connection',
        required: true,
        serial: 2,
        checked: true,
        title: '车型',
        id: 'carBrandId',
        url: ctx + '/cfCarBrand/carBrand.action',
        name: 'carBrandId',
        tip: '请输入正确的车型'
    }, {
        xtype: 'text',
        serial: 3,
        required: true,
        checked: true,
        title: '座位数',
        name: 'seats',
        tip: '请输入正确的座位数',
        maxlength: 2,
        checkObj: 'int'
    }, {
        xtype: 'select',
        required: true,
        checked: true,
        serial: 4,
        id: 'newOrOld',
        name: 'newOrOld',
        title: '车型构成',
        tip: '请输入正确的车型构成',
        checked: true,
        isPlugin: true,
        data: [{
            name: "新车",
            value: 1
        }, {
            name: "二手车",
            value: 0
        }],
        checkFn: "validSelect(this)",
        checkObj: 'not_null'
    }, {
        xtype: 'connection',
        required: true,
        id: 'carLicenseProvince',
        name: 'carLicenseProvince',
        title: '上牌地',
        serial: 5,
        url: ctx + '/city/getCityListDoMain.action',
        checked: true,
        tip: '请输入正确的上牌地'
    }]
}, {
    xtype: 'fieldcontainer',
    items: [{
        xtype: 'select',
        required: true,
        checked: true,
        id: 'board',
        serial: 6,
        name: 'board',
        title: '是否公牌',
        tip: '请输入正确的公牌',
        checkObj: 'not_null',
        isPlugin: true,
        checkFn: "validSelect(this)",
        data: [{
            name: "是",
            value: 1
        }, {
            name: "否",
            value: 0
        }]
    }, {
        xtype: 'select',
        required: true,
        serial: 7,
        id: 'cfProductId',
        name: 'cfProductId',
        title: '产品类型',
        tip: '请输入正确的产品类型',
        checked: true,
        isPlugin: true,
        url: ctx + "/product/getList.action",
        async: false,
        textClass: 'col-md-2',
        labelClass: 'col-md-1',
        displayField: 'productName',
        valueField: 'id',
        checkFn: "validSelect(this)",
        checkObj: 'not_null'
    }, {
        xtype: 'select',
        required: true,
        id: 'loanPeriodMonthCode',
        name: 'loanPeriodMonthCode',
        title: '年限(月)',
        checked: true,
        serial: 8,
        tip: '请输入正确的年限(月)',
        isPlugin: true,
        checkFn: "validSelect(this)",
        checkObj: 'not_null'
    }, {
        xtype: 'text',
        readonly: true,
        name: 'loanBank',
        id: 'loanBank',
        title: '贷款银行',
        serial: 9,
        textClass: 'col-md-2',
        labelClass: 'col-md-1',
        readonly: true,
        tip: '请输入正确的贷款银行'
    }]
}, {
    xtype: 'fieldcontainer',
    items: [{
        xtype: 'text',
        required: true,
        checked: true,
        name: 'driverLicneseOwner',
        title: '行驶证车主',
        serial: 10,
        tip: '请输入正确的行驶证车主',
        textClass: 'col-md-2',
        labelClass: 'col-md-1',
        maxlength: 50,
        checkReg: 'china_english'
    }, {
        xtype: 'text',
        required: true,
        name: 'auditCarPrice',
        title: '审核车价',
        serial: 11,
        textClass: 'col-md-2',
        labelClass: 'col-md-1',
        lightUp: true,
        checked: true,
        tip: '请输入正确的审核车价',
        maxlength: 9,
        checkObj: 'float'
    }, {
        xtype: 'text',
        required: true,
        name: 'actualLoadMoney',
        title: '实际贷款额',
        serial: 12,
        tip: '请输入正确的实际贷款额',
        checked: true,
        lightUp: true,
        maxlength: 9,
        checkObj: 'float'
    }, {
        xtype: 'text',
        required: true,
        checked: true,
        readonly: true,
        serial: 13,
        name: 'actualFirstPay',
        maxlength: 9,
        title: '实际首付款',
        tip: '请输入正确的实际首付款',
        checkObj: 'float'
    }]
}, {
    xtype: 'fieldcontainer',
    items: [{
        xtype: 'text',
        required: true,
        checked: true,
        serial: 14,
        readonly: true,
        name: 'actualFirstPayRatio',
        maxlength: 9,
        title: '实际首付比例(%)',
        tip: '请输入正确的实际首付比例(%)',
        checkObj: 'float'
    }, {
        xtype: 'text',
        required: true,
        checked: true,
        readonly: true,
        serial: 15,
        name: 'actualLoanRatio',
        maxlength: 9,
        title: '实际贷款比例(%)',
        tip: '请输入正确的实际贷款比例(%)',
        checkObj: 'float'
    }, {
        xtype: 'text',
        required: true,
        name: 'customerRate',
        title: '客户费率(%)',
        serial: 16,
        tip: '请输入正确的客户费率',
        checked: true,
        lightUp: true,
        maxlength: 9,
        checkObj: 'float'
    }, {
        xtype: 'text',
        required: true,
        checked: true,
        serial: 17,
        readonly: true,
        lightUp: true,
        name: 'installmentPayMoney',
        maxlength: 9,
        title: '分期付款总额',
        tip: '请输入正确的分期付款总额',
        checkObj: 'float'
    }]
}, {
    xtype: 'fieldcontainer',
    items: [{
        xtype: 'text',
        required: true,
        checked: true,
        readonly: true,
        serial: 18,
        name: 'installmentPayRatio',
        maxlength: 9,
        title: '分期付款总额比例(%)',
        tip: '请输入正确的分期付款总额比例(%)',
        checkObj: 'float'
    }, {
        xtype: 'text',
        required: true,
        readonly: true,
        serial: 19,
        checked: true,
        name: 'installmentPayPoundage',
        maxlength: 9,
        title: '分期手续费',
        tip: '请输入正确的分期手续费',
        checkObj: 'float'
    }, {
        xtype: 'text',
        required: true,
        checked: true,
        serial: 20,
        name: 'contractCarPrice',
        maxlength: 9,
        title: '合同车价',
        tip: '请输入正确的合同车价',
        checkObj: 'float'
    }, {
        xtype: 'text',
        required: true,
        serial: 21,
        readonly: true,
        checked: true,
        name: 'bankRate',
        maxlength: 9,
        title: '银行费率(%)',
        tip: '请输入正确的银行费率(%)',
        checkObj: 'float'
    }]
}, {
    xtype: 'fieldcontainer',
    items: [{
        xtype: 'text',
        required: true,
        serial: 22,
        readonly: true,
        checked: true,
        lightUp: true,
        name: 'contractPrice',
        maxlength: 9,
        title: '合同价',
        tip: '请输入正确的合同价',
        checkObj: 'float'
    }, {
        xtype: 'text',
        required: true,
        serial: 23,
        readonly: true,
        checked: true,
        name: 'contractPriceRatio',
        maxlength: 9,
        title: '合同价比例(%)',
        tip: '请输入正确的合同价比例(%)',
        checkObj: 'float'
    }, {
        xtype: 'text',
        required: true,
        readonly: true,
        checked: true,
        serial: 24,
        lightUp: true,
        name: 'repayMonth',
        maxlength: 9,
        title: '月还款',
        tip: '请输入正确的月还款',
        checkObj: 'float'
    }, {
        xtype: 'text',
        required: true,
        readonly: true,
        serial: 25,
        checked: true,
        name: 'firstRepay',
        maxlength: 9,
        title: '首期还款',
        tip: '请输入正确的首期还款',
        checkObj: 'float'
    }]
}, {
    xtype: 'fieldcontainer',
    items: [{
        xtype: 'text',
        name: 'insuranceFee',
        maxlength: 9,
        title: '保险费用',
        serial: 26,
        tip: '请输入正确的保险费用',
        checkObj: 'float'
    }, {
        xtype: 'text',
        name: 'configTaxFee',
        maxlength: 9,
        title: '配置税',
        serial: 27,
        tip: '请输入正确的配置税',
        checkObj: 'float'
    }, {
        xtype: 'text',
        name: 'totalFee',
        maxlength: 9,
        readonly: true,
        title: '参融总和',
        serial: 28,
        tip: '请输入正确的参融总和',
        checkObj: 'float'
    }, {
        xtype: 'buttons',
        serial: 29,
        textClass: 'col-md-3 text-right',
        buttons: [{
            btnClass: 'btn-primary calculate-button',
            title: '按公式计算 '
        }, {
            btnClass: 'btn-success save-car-button m-l-6',
            title: '保存车辆信息 '
        }]
    }]
}, {
    xtype: 'fieldcontainer',
    items: [{
        xtype: 'textarea',
        name: 'remark',
        serial: 30,
        labelClass: 'col-md-1',
        textClass: 'col-md-11',
        cls: 'height:120px',
        checkLen: 'checkLen(1000,this)',
        maxlength: 1000,
        fTip: '您已输入<span class="count red">0</span>个字符,还可以输入<span class="remainCount red">1000</span>个字符',
        title: '备注'
    }]
}];
