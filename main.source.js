//引入弹窗
ol.load.define("ec.box" , [
	"jquery",
	{mark:"jquery.bgiframe",uri: "base/jquery.bgiframe.min.js",type: "js",charset: "utf-8",depend:true,loadType:null},
	{uri: "ec.box/box-min.js",type: "js",depend:true}
]);

ec.load('ec.box');

/**
 * 配置文件
 */
window.HuaweiActivity || (window.HuaweiActivity={});

HuaweiActivity.Cfg = {
	Domain: {
		WEB: 'https://www.vmall.com',
		CDN: '',
		WEB_SALE: 'http://sale.vmall.com/318.html',
		LOGIN: 'http://hwid1.vmall.com:8080',
		API:'http://amsfronttestlf.vmall.com/'
	},	
	Coupon: {

		//商城优惠券
		VMALL_COUPON: [
			{
				activityCode: 'C17020001b8',
				batchCode: 'B02251539',
				couponImg: 'images/coupons.jpg',
				couponName: 'couponName'
			},
			{
				activityCode: 'C17020001b8',
				batchCode: 'B02251539',
				couponImg: 'images/coupons.jpg',
				couponName: 'couponName'
			},
			{
				activityCode: 'C17020001b8',
				batchCode: 'B02251539',
				couponImg: 'images/coupons.jpg',
				couponName: 'couponName'
			},
			{
				activityCode: 'C17020001b8',
				batchCode: 'B02251539',
				couponImg: 'images/coupons.jpg',
				couponName: 'couponName'
			},
			{
				activityCode: 'C17020001b8',
				batchCode: 'B02251539',
				couponImg: 'images/coupons.jpg',
				couponName: 'couponName'
			},
			{
				activityCode: 'C17020001b8',
				batchCode: 'B02251539',
				couponImg: 'images/coupons.jpg',
				couponName: 'couponName'
			},
			{
				activityCode: 'C17020001b8',
				batchCode: 'B02251539',
				couponImg: 'images/coupons.jpg',
				couponName: 'couponName'
			},
			{
				activityCode: 'C17020001b8',
				batchCode: 'B02251539',
				couponImg: 'images/coupons.jpg',
				couponName: 'couponName'
			},
			{
				activityCode: 'C17020001b8',
				batchCode: 'B02251539',
				couponImg: 'images/coupons.jpg',
				couponName: 'couponName'
			}

		],
		THIRD_COUPON: [
			{
				activityCode: 'C1702000182',
				batchCode: 'Bliuxu0220',
				couponImg: 'images/coupons.jpg',
				couponName: 'couponName'
			},
			{
				activityCode: 'C1702000182',
				batchCode: 'Bliuxu0220',
				couponImg: 'images/coupons.jpg',
				couponName: 'couponName'
			},
			{
				activityCode: 'C1702000182',
				batchCode: 'Bliuxu0220',
				couponImg: 'images/coupons.jpg',
				couponName: 'couponName'
			},
			{
				activityCode: 'C1702000182',
				batchCode: 'Bliuxu0220',
				couponImg: 'images/coupons.jpg',
				couponName: 'couponName'
			},
		]
	},
	Product: {

		//明星推荐区域
		StarRecommend: [
			{
				productId: '1',
				productName: 'productName',
				productImg: 'images/phone.png'
			},
			{
				productId: '1',
				productName: 'productName',
				productImg: 'images/phone.png'
			},
			{
				productId: '1',
				productName: 'productName',
				productImg: 'images/phone.png'
			},
			{
				productId: '1',
				productName: 'productName',
				productImg: 'images/phone.png'
			}
		],

		//爆款推荐区域
		HotRecommend: [
			{
				productId: '1',
				productName: 'productName',
				productImg: 'images/phone.png'
			},
			{
				productId: '1',
				productName: 'productName',
				productImg: 'images/phone.png'
			},
			{
				productId: '1',
				productName: 'productName',
				productImg: 'images/phone.png'
			},
			{
				productId: '1',
				productName: 'productName',
				productImg: 'images/phone.png'
			}
		],

		//秒杀专区
		RushBuyArea: [
			{
				productId: '1',
				productName: 'productName',
				productImg: 'images/phone.png'
			},
			{
				productId: '1',
				productName: 'productName',
				productImg: 'images/phone.png'
			},
			{
				productId: '1',
				productName: 'productName',
				productImg: 'images/phone.png'
			},
			{
				productId: '1',
				productName: 'productName',
				productImg: 'images/phone.png'
			}
		],

		//明星产品区域
		StarProduct: [
			{
				productId: '1',
				productName: 'productName',
				productImg: 'images/phone.png'
			},
			{
				productId: '1',
				productName: 'productName',
				productImg: 'images/phone.png'
			},
			{
				productId: '1',
				productName: 'productName',
				productImg: 'images/phone.png'
			},
			{
				productId: '1',
				productName: 'productName',
				productImg: 'images/phone.png'
			}
		],

		//华为分会场
		HuaWeiArea: [
			{
				productId: '1',
				productName: 'productName',
				productImg: 'images/phone.png'
			},
			{
				productId: '1',
				productName: 'productName',
				productImg: 'images/phone.png'
			},
			{
				productId: '1',
				productName: 'productName',
				productImg: 'images/phone.png'
			},
			{
				productId: '1',
				productName: 'productName',
				productImg: 'images/phone.png'
			}
		],

		//荣耀分会场
		RyArea: [
			{
				productId: '1',
				productName: 'productName',
				productImg: 'images/phone.png'
			},
			{
				productId: '1',
				productName: 'productName',
				productImg: 'images/phone.png'
			},
			{
				productId: '1',
				productName: 'productName',
				productImg: 'images/phone.png'
			},
			{
				productId: '1',
				productName: 'productName',
				productImg: 'images/phone.png'
			}
		],

		//会员权益
		MemberArea: [
			{
				productId: '1',
				productName: 'productName',
				productImg: 'images/phone.png'
			},
			{
				productId: '1',
				productName: 'productName',
				productImg: 'images/phone.png'
			},
			{
				productId: '1',
				productName: 'productName',
				productImg: 'images/phone.png'
			},
			{
				productId: '1',
				productName: 'productName',
				productImg: 'images/phone.png'
			}
		],

		//家庭分会场区域
		FamilyArea: [
			{
				productId: '1',
				productName: 'productName',
				productImg: 'images/phone.png'
			},
			{
				productId: '1',
				productName: 'productName',
				productImg: 'images/phone.png'
			},
			{
				productId: '1',
				productName: 'productName',
				productImg: 'images/phone.png'
			},
			{
				productId: '1',
				productName: 'productName',
				productImg: 'images/phone.png'
			}
		],

		//配件分会场区域
		AccessoryArea: [
			{
				productId: '1',
				productName: 'productName',
				productImg: 'images/phone.png'
			},
			{
				productId: '1',
				productName: 'productName',
				productImg: 'images/phone.png'
			},
			{
				productId: '1',
				productName: 'productName',
				productImg: 'images/phone.png'
			},
			{
				productId: '1',
				productName: 'productName',
				productImg: 'images/phone.png'
			}
		]
	},
	Share: {
		title: '分享的标题',
		pic: 'images/phone.png',
		url: 'https://www.vmall.com'
	}
}

HuaweiActivity.Cfg.Url = {
	//登录
	LOGIN: HuaweiActivity.Cfg.Domain.LOGIN + 
			"/oauth2/portal/login.jsp?validated=true&service=http%3A%2F%2F" + 
			HuaweiActivity.Cfg.Domain.WEB +
			"%2Faccount%2Fcaslogin%3Furl%3Dhttp%253A%252F%252F" + 
			HuaweiActivity.Cfg.Domain.WEB_SALE + "&loginChannel=26000000&reqClientType=26",

	//登出
	LOGINOUT: '',

	//手机绑定
	BIND_PHONE: HuaweiActivity.Cfg.Domain.WEB + 
				"/member/bind/phone/redirect?back_url=http%3A%2F%2F" + 
				HuaweiActivity.Cfg.Domain.WEB_SALE,

	//实名认证
	AUTH_NAME: HuaweiActivity.Cfg.Domain.WEB + '/authmember/accesstoken',


	//领券
	API_COUPON: HuaweiActivity.Cfg.Domain.API + 'couponCodeActivity/receive.json',

	/*//领券
	PICK_COUPON: '',*/

	//领第三方券
	PICK_THIRD_COUPON: '',

	//抽奖
	API_PRIZE: HuaweiActivity.Cfg.Domain.API + 'prizeActivity/commonPrize.json?activityCode=P1702000f5b',/*P1702000f61*/

	//增加抽奖次数
	API_ADD_PRIZE_COUNT: HuaweiActivity.Cfg.Domain.API + '/prizeActivity/share.json?activityCode=P1702000f5b',

	//中奖人员名单
	API_PRIZE_USER: HuaweiActivity.Cfg.Domain.API + 'prizeActivity/queryPrizeResult.json?activityCode=P1702000f5b'
}



HuaweiActivity.Action = {
	
	//页面初始化
	initial: function () {

		//渲染页面
		this.renderPage();

		//领券交互
		this.bindCoupon();

		//娃娃机交互
		HuaweiActivity.wawaji.init('#wawaji');

		//初始化弹窗
		this.initModal();


	},

	initModal: function(){
		var fn = function(){
			if(!ec.box) {
				setTimeout(fn,20);
				return;
			}
			var url = HuaweiActivity.Cfg.Url;

			HuaweiActivity.box = new ec.box(null,{boxid:"ec_box_tip",boxclass:"event-carnival-dialog",showButton:false});
			
			
			HuaweiActivity.boxBtns = {
				yes: '<a class="event-carnival-dialog-button-yes box-ok" href="javascript:;">确 定</a>',
				login: '<a class="event-carnival-dialog-button-yes box-ok" href="'+ url.LOGIN +'">马上登录</a>',
				bindPhone: '<a class="event-carnival-dialog-button-yes box-ok" target="_blank" href="'+ url.BIND_PHONE+ '">马上绑定</a>',
				authName: '<a class="event-carnival-dialog-button-yes box-ok" target="_blank" href="'+ url.AUTH_NAME+ '">马上认证</a>',
				shareButton : '<a class="event-carnival-dialog-button-ver" href="javascript:;" onclick="HuaweiActivity.wawaji.shareSina();">立即分享</a>',
			}

			/**
			 * 弹窗公用方法
			 * @param  {[object]} opts {
			 *    isSad: boolean  是否是失败的
			 *    msg: string  弹出时显示的文字
			 *    btn: string  弹出框显示的btn
			 *    callback: object  btn点击的回调函数，与ec.box里的配置一样
			 * }
			 * @return {[type]}      [description]
			 */
			HuaweiActivity.boxOpen = function(opts){
				var icon = opts.isSad ? '<s></s>' : '<i></i>',
					html = '<div class="event-carnival-dialog"><div class="box-ct"><div class="box-header"><div class="box-tl"></div><div class="box-tc"><div class="box-tc1"></div><div class="box-tc2"><a class="box-close" title="关闭" onClick="return false;" href="javascript:;"></a><span class="box-title"></span></div></div><div class="box-tr"></div></div><table width="100%" cellspacing="0" cellpadding="0" border="0"><tbody><tr><td class="box-cl"></td><td class="box-cc"><div class="box-content"><div class="event-carnival-dialog"><div class="h">{class}</div><div class="b"><p>{text}</p></div><div class="f">{button}</div></div></div></td><td class="box-cr"></td></tr></tbody></table><div class="box-bottom"><div class="box-bl"></div><div class="box-bc"></div><div class="box-br"></div></div></div></div>',
					callback;
				html = html.replace('{class}', icon)
								.replace('{text}', opts.msg)
								.replace('{button}', opts.btn);
				callback = opts.callback || {
					onok: function(box) {
						box.close();
					}
				}
				HuaweiActivity.box.open(html, callback)
			}
		}
		fn();
	},
	
	renderPage: function(){
		var opts = HuaweiActivity.Cfg,
			products = opts.Product,
			tplMap = [
				{module: 'Coupon', data: opts.Coupon.VMALL_COUPON},
				{module: 'StarRecommend'},
				{module: 'HotRecommend', tpl: 'tpl-product'},
				{module: 'RushBuyArea', },
				{module: 'StarProduct', tpl: 'tpl-product'},
				{module: 'HuaWeiArea', tpl:'tpl-public'},
				{module: 'RyArea', tpl:'tpl-public'},
				{module: 'MemberArea', tpl: 'tpl-product'},
				{module: 'FamilyArea', tpl: 'tpl-public'},
				{module: 'AccessoryArea', tpl: 'tpl-public'}
			],
            //VMALL_COUPON  商城优惠券
			//THIRD_COUPON  第三方优惠券
			//StarRecommend 明星推荐区域
			//HotRecommend  爆款推荐区域
			//RushBuyArea   秒杀专区
			//StarProduct   明星产品区域
			//HuaWeiArea    华为分会场
			//RyArea        荣耀分会场
			//MemberArea    会员权益
			//FamilyArea    家庭分会场区域
			//AccessoryArea 配件分会场区域
			$wrap,
			tplName,
			tplData;
		for(var i= 0, item; item=tplMap[i++];) {

			
			$wrap = $('.js-'+item.module);
			tplName = item.tpl || 'tpl-'+ item.module;
			if(item.module == 'Coupon') {
				tplData = item.data.slice(0,(Math.floor(item.data.length/4)*4));
			}else {
				tplData = item.data || products[item.module];
			}

			$wrap.html(template(tplName, {list: tplData}));

		}

	},

	bindCoupon: function(){
		var urlOpts = HuaweiActivity.Cfg.Url,
			btns = HuaweiActivity.boxBtns,
			//消息
			tips = {
				'9204': '亲，别着急，活动还没开始呦~~',
				'9205': '噢，亲，来晚了，活动结束了~',
				'9206': '亲，您还未登录哦，登录后才能领取哦~',
				'9208': '亲，需绑定手机帐号才能领取哦，马上绑定吧>>',
				'9209': '亲，需实名认证才能领取哦，手机帐号登录实名认证更便捷哦！',
				'9013': '噢，今天的抽奖机会用完了~~',
				'9212':'噢，亲，来晚了，今天的优惠券已经领完了，先看看其它活动吧~',
				'9214':'亲，你已领过啦，每人每种优惠券限领1张哦，请看看其它优惠券吧~',
				success: '恭喜您获得{object}1张，请20分钟后在”个人中心-我的优惠券“中查收。',
				default: '亲，瞬间被你的热情吓到了，容我缓缓，请稍候再来哦~'
			},
		
			$couponWrap = $('.js-Coupon'),

			//错误回调
			errorCb =  function(code){
				var msg, btn, boxHtml,codeMap = {9206:'login',9208:'bindPhone',9209:'authName'},
					btns = HuaweiActivity.boxBtns;
				if(code) {
					msg = tips[code] || tips.default;
					btn = btns[codeMap[code]] || btns.yes;
				}else {
					msg = tips.default;
					btn = btns.yes;
				}


				HuaweiActivity.boxOpen({
					isSad: true,
					msg: msg,
					btn: btn
				})
			},

			//成功回调
			successCb = function(response){
				var code = response.code,
					msg,
					isSuccess = response.success;
				if(isSuccess) {
					msg = tips.success.replace('{object}',response.batchName);
					HuaweiActivity.boxOpen({
						isSad: false,
						msg: msg,
						btn: HuaweiActivity.boxBtns.yes
					});
				}else {
					errorCb(code);
				}
			},

			//领券接口调用
			getCoupon = function(e){
				var opts = HuaweiActivity.Cfg,
					target = $(this),
					index = target.attr('data-index'),
					data = HuaweiActivity.Cfg.Coupon.VMALL_COUPON[index],
					url;
				if(!data) {
					errorCb();
				}
				url = opts.Url.API_COUPON + '?activityCode=' + data.activityCode +
					'&batchCode=' + data.batchCode+
					"&t="+(+new Date());
				$.ajax({
					type:'get',
					url: url,
					dataType:'jsonp',
					jsonp:'callback',
					success: successCb,
					error: function(){
						errorCb();
					}
				})
			};

		$couponWrap.find('.js-item').bind('click',getCoupon);
	}

};



HuaweiActivity.wawaji = {
	init: function (wrapEle) {
		if(!wrapEle) {
			return false;
		}
        this.json = {
            btnJumpClass: 'btn-jump-up',
            isUsePoint: 0,
            isUserLogin: false,
            isShared: false,
            code: 0,
            count: 0
        };
        this.codeMap = {9006: 'login', 9008: 'bindPhone'}
        this.status = 0; //状态
        

        this.$wrap = $(wrapEle);
        this.$startBtn = this.$wrap.find('.startbtn');
        this.$endBtn = this.$wrap.find('.endbtn');

        this.initUserStatus();
        this.initEvent();

        
        //查询活动中奖用户，并滚动显示
       	this.getPrizeData();

       
    },

    //弹窗信息
    boxMsg: {
    	9004: '亲，别着急，活动还没开始哟~',
    	9006: '亲，您还未登录哦，登录后才能抽奖哦~',
    	9005: '噢，亲，来晚了，活动结束了~',
    	9008: '亲，需绑定手机号才能抽奖哦，马上绑定吧>>',
    	
    	9026: '呀，你的积分不够啦~快去看看如何赚取积分吧~',
    	unShared: '噢，今天的抽奖机会用完了~~</br>分享还可获得1次抽奖机会哦，马上分享吧！',
    	usePoint: '噢，你的抽奖机会用完啦~别捉急，使用积分可以继续抽奖哦~温馨提示：每次抽奖将消耗5个积分。',
    	unPrized: '唉，就差那么一点点和大奖擦肩而过，别灰心，换个姿势再来一次~~',
    	third: '恭喜你抽中{object}券1张~稍后请到 “我的-消息中心”查看~',
    	self: '哇哦！恭喜您抽中{object}优惠券1张，稍后请到“个人中心-我的优惠券”中查收~',
    	product:'唉呀妈呀！恭喜您抽中{object}一台~别激动！记得4月1日前到个人中心设置默认地址以便我们安排奖品发放哦',
    	default: '亲，瞬间被你的热情吓到了，容我缓缓，请稍候再来哦~'
    },

    //初始化用户信息
    initUserStatus: function(){
    	var me = this;
    	me.apiRequest(function(response){
    		me.json.isShared = response.isSupportShare||false;
    		me.json.count = response.limit||0;
    		me.json.code = response.code;
    		me.json.isUserLogin = response.code != '9006';
    	})
    },

    
    //使用积分抽奖
    usePointPrize:  function(code){
    	var me = this;
    	HuaweiActivity.wawaji.json.isUsePoint = code;
    	if(code) {
    		me.startPrize()
    		//alert('这里要让娃娃机转起来');
    	}
    },

    //api请求成功之后回调
    successCb: function(response){
    	var codeMap = this.codeMap,
    		me = this,
    		isPrized = false,
    		callback;

    	//更新用户数据的状态
    	me.json.count = response.limit;
    	me.json.isShared = response.isSupportShare;
    	me.json.code = response.code;


    	if(response.success) {
			//type奖品类型，0无奖品，1优惠券，2实物奖品，3优购码，4第三方券\
			//name 奖品名称
			var type = response.type, name = response.name,
				msg;
			isPrized = type !== 0;
			switch(type) {
				case 1:
					msg = me.boxMsg.self.replace('{object}',name);
					break;
				case 2:
					msg = me.boxMsg.product.replace('{object}',name);
					break;
				case 4:
					msg = me.boxMsg.product.replace('{object}',name);
					break;
				default: 
					msg = me.boxMsg.unPrized
					break;
			}

			callback = function(){
				HuaweiActivity.boxOpen({
					msg: msg, 
					isSad: false, 
					btn: HuaweiActivity.boxBtns.yes
				})
			}
		}else {
			var code = response.code,
				msg, btn;
			if(code == '9013'&&response.isSupportShare){
				msg = tips[code];
				btn = btns.yes;
			}else {
				msg = me.boxMsg[code]|| me.boxMsg.default
				btn = HuaweiActivity.boxBtns.yes
			}
			callback = function(){
				HuaweiActivity.boxOpen({msg: msg, isSad: true, btn: btn})
			}
		}

		me.$endBtn.removeClass(this.json.btnJumpClass);
		me.clawAction(isPrized,callback);

		me.status = 0;
    	
    },

    //发送api请求
    apiRequest: function(callback){
    	var url = HuaweiActivity.Cfg.Url.API_PRIZE,
    		isUsePoint = this.json.isUsePoint,
    		me = this,
    		errorCb = function(msg){
    			HuaweiActivity.boxOpen({
    				msg: msg,
    				isSad: true,
    				btn: HuaweiActivity.boxBtns.yes
    			})
    		};

    	url +='&isUsePoint='+ isUsePoint + '&t=' + (+new Date());

    	$.ajax({
    		url: url,
    		dataType: 'jsonp',
    		jsonp: 'callback',
    		success: function(response) {
				callback.call(me,response)
    		},
    		error: function(response) {
    			errorCb(me.boxMsg.default);
    			
    		}
    	})
    },


    //绑定事件
    initEvent: function () {
        var me = this, btnclass=me.json.btnJumpClass;
        //点击开始按钮
        me.$startBtn.bind('click', function(){
        	if(me.status!==0) {
        		return ;
        	}
        	var msg , isSad = false, btn;
        	
        	if(!me.json.isUserLogin) {							//没登录
        		msg = me.boxMsg['9006'];
        		isSad = true;
        		btn = HuaweiActivity.boxBtns.login;
        	}else if(!me.json.isShared&&me.json.code == 9013) {	//没分享没次数
        		msg = me.boxMsg.unShared;
        		isSad = true;
        		btn = HuaweiActivity.boxBtns.shareButton;
        		
        	}else if(me.json.isShared&&me.json.code == 9013) {	//已分享，没次数
        		msg = me.boxMsg.usePoint;
        		isSad = true;
        		btn = '<a class="event-carnival-dialog-button-yes box-ok" href="javascript:;" onclick="HuaweiActivity.wawaji.usePointPrize(0)">取消</a>'+
    					'<a class="event-carnival-dialog-button-yes box-ok" href="javascript:;" onclick="HuaweiActivity.wawaji.usePointPrize(1)">继续抽奖</a>';
        	}
        	$(this).removeClass(btnclass);

        	if(isSad) {
        		HuaweiActivity.boxOpen({msg: msg, isSad: true, btn: btn});
        		return;
        	}

        	me.startPrize();
        })
        
        //点击抓取按钮
        $('.endbtn').click(function () {
        	if(me.status!==1) {
        		return false;
        	}

        	me.prize();
        	me.status = 0;
            
        });
    },

    startPrize: function(){
    	var me = this;
    	me.status = 1;
    	me.$endBtn.addClass(me.json.btnJumpClass);
    	me.goRight();
    },

    //抽奖了
    prize: function () {
        var me = this;
        me.apiRequest.call(me,me.successCb);
        
    },


    goRight: function () {
        var me = this,
            jPaw = $(".j-paw"),
            time = (220 - parseFloat(jPaw.css("left"))) / 220 * 4000;
        jPaw.addClass("right-moving").animate({
            left: 220 + "px"
        }, {
            duration: time,
            complete: function () {
                me.goLeft();
            },
            step: function (nowLeft) {
                if (nowLeft > 200 && $(this).hasClass("right-moving")) {
                    $(this).removeClass("right-moving");
                }
            }
        })
    },
    goLeft: function () {
        var me = this,
            jPaw = $(".j-paw");
        jPaw.addClass("left-moving").animate({
            left: "0"
        }, {
            duration: 4000,
            complete: function () {
                me.goRight();
            },
            step: function (nowLeft) {
                if (nowLeft < 7 && $(this).hasClass("left-moving")) {
                    $(this).removeClass("left-moving");
                }
            }
        })
    },
    clawAction: function (type,callback) {
        var me = this,
            jPaw = $(".j-paw");
        jPaw.stop().removeClass("left-moving right-moving").find(".j-paw-middle").animate({
            height: "240px"
        }, 2000, function () {
            if (type) {
                jPaw.addClass("winning");
            }
            var _this = $(this);
            setTimeout(function () {
                _this.animate({
                    height: "25px"
                }, 2000, function () {
                	callback&&callback();
                    //Tool.pcTipShow(me.json.icon, me.json.text, me.json._class, me.json.btn);
                })
            }, 1000)
        })
    },
    reset: function () {
        this.flag1 = true;
        this.flag2 = false;
        var $jPaw = $(".j-paw");
        $jPaw.stop().removeClass("right-moving left-moving winning").css("left", 0);
        $(".j-game-start").addClass("btn-jump-up");
        $('.j-paw-wawa').removeClass("btn-jump-up");
    },
    /**
     * 获取中奖用户列表
     * 展示在转盘抽奖下面滚动显示
     */
    getPrizeData: function () {
        window.wwjCallback = function (json) {
            var obj = $("#wwjPrizeList"),
                html = '', list, len,
                i, j;
            if (!(json.prizeResult && json.prizeResult.length)) {
                return;
            }
            len = json.prizeResult.length;
            if (len > 0) {
                if (len >= 3) {  //超过3条才滚动展示
                    var copyTime = 300 / len;
                    for (j = 0; j < copyTime; j++) {
                        for (i = 0; i < len; i += 1) {
                            list = json.prizeResult[i];
                            html += '<li>' + list.custLoginName + ' 抽中<b>' + list.prizeName + '</b>!</a>';
                        }
                    }
                } else {  //小于3条要先把 <marquee> 去掉
                    obj = obj.parent();
                    for (i = 0; i < len; i += 1) {
                        list = json.prizeResult[i];
                        html += '<li>' + list.custLoginName + ' 抽中<b>' + list.prizeName + '</b>!</a>';
                    }
                }
                obj.html('<ul>' + html + '</ul>').show();
                $("#priceList-default-text").hide();
            }
        };
        $.ajax({
            url: HuaweiActivity.Cfg.Url.API_PRIZE_USER,
            type: 'GET',
            data: {
            	t: +(new Date())
            },
            dataType: 'jsonp',
            jsonp: "callback", // 参数名
            jsonpCallback: 'wwjCallback'
        });
    },

    //增加分享次数
    addPrizeCount: function(){
    	var me = this;
    	$.ajax({
    		url: HuaweiActivity.Cfg.Url.API_ADD_PRIZE_COUNT + '&t=' + (+new Date()),
    		dataType: 'jsonp',
    		jsonp: 'callback',
    		success: function(){
    			me.json.isShared = true;
    			me.json.count +=1;
    			return true;
    		}
    	})
    },

    //分享
    shareSina: function(){
    	this.addPrizeCount();
    	var shareOpts = HuaweiActivity.Cfg.Share;
        var str = 'http://service.weibo.com/share/share.php?title=';
        str += ('' + encodeURIComponent(shareOpts.title));
        str += ('&pic=' + encodeURIComponent(shareOpts.pic));
        str += ('&url=' + encodeURIComponent(shareOpts.url) + '&appkey=23431084');
        window.open(str);
    }

};


(function($){

	HuaweiActivity.Action.initial();
	
})(jQuery);



