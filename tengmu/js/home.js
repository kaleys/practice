(function($){
	$(document).ready(function(){
		var pageNav = $("#page-menu"),
			pageNavToggle = $("#btn-alert-list");
		$('#fullpage').fullpage({
	        verticalCentered: true,
	        css3: false,
	        navigation: true,
	        scrollOverflow : true,
	        menu: "#page-menu",
	        navigationPosition: 'right',
	        anchors: ['homePage','aboutPage','servicePage','workPage','newsPage','teamPage','contactPage'],
	        onLeave:function(index){
	        	$("#alert-menu").modal('hide');
	        	if(index==7) {
	        		changeCustomerStyle(true);
	        	}
	        },
	        afterLoad: function(n,index) {
	        	if(index==7){
	        		changeCustomerStyle(100);
	        	}
	        }
	    })

		//云动
		$(".cloud").each(function(){
			var _self = this;
			new CloudMove({
				$ele: $(_self),/*
				duration:$(_self).data('speed')||0,
				delay: $(_self).data('delay')||0*/
			})
		})


		//弹窗菜单
		var targetMenu = $("#btn-alert-list");
		$("#alert-menu").on('show.bs.modal',function(e){
			pageNavToggle.addClass('alert-action-off');
		}).on('hidden.bs.modal',function(e){
			pageNavToggle.removeClass('alert-action-off');
		});

		//关于我们
		var target = $("#btn-alert-about");
		$("#alert-about").on('show.bs.modal',function(e){
			target.removeClass('hidden');
			$.fn.fullpage.setAllowScrolling(false);
		}).on('hidden.bs.modal',function(e){
			target.addClass('hidden');
			$.fn.fullpage.setAllowScrolling(true);
		});

		//下载
		var iosDown = false;
		var btnDownload = $("#btn-alert-appdownload");
		$("#alert-appdownload").on('show.bs.modal',function(e){
			if(iosDown){
				$(".app-ios").show();
			}else {
				$(".app-android").show();
			}
			btnDownload.removeClass('hidden');
		}).on('hidden.bs.modal',function(e){
			btnDownload.addClass('hidden');
			$(this).find('img').hide();
		});
		$("#app-download button").each(function(i){
			this.index = i;
			$(this).click(function(){
				iosDown = this.index==1 ? false : true;
				$("#alert-appdownload").modal('show').find('.modal-dialog').height($(window).height());
			})
		})


		//图片展示
		lightbox.option({
			positionFromTop:0,
		})
		$(".work-list-toggle").on('click',function(){
			$(this).next(".work-list-anli").find('a').eq(0).trigger('click');
			return false;
			
		})


		//客户样式逐个变
		function changeCustomerStyle(timerDelay){
			var isRemove = (typeof timerDelay=='boolean') ? timerDelay : false;
			if(isRemove){
				$(".customer-item").removeClass('customer-item-active');
			}else {
				var timerDelay = timerDelay || 200;
				$(".customer-item").each(function(index){
					var that = this;
					var timer = (index+1)*timerDelay;
					setTimeout(function(){
						$(that).addClass('customer-item-active');
					},timer);
				})
			}
			
		}


		//底部高度计算
		function fixFooterPosition() {
			var $footer = $(".footer");
			var winHeight = $(window).winHeight;
			var computed = $("#contact-customer").outerHeight()+ $footer.outerHeight();
			if( winHeight> computed) {
				$footer.addClass('footer-abs');
			}else {
				$footer.removeClass('footer-abs');
			}
		}

		fixFooterPosition();
		$(window).on('resize',function(){
			throttle(fixFooterPosition);
		})


		
	})

	/**
	 * 节流函数，第一次不需要延迟
	 * @param  {Function} fn       [需要执行的方法]
	 * @param  {[type]}   interval [多少秒执行一次]
	 * @return {[type]}            [description]
	 */
	var throttle = function(fn,interval){
		var _self = fn,
				timer,
				firstTime = true;

		return function(){
			var args = arguments,
					_me = this;

			if(firstTime){
				_self.apply(_me,args);
				return firstTime = false;
			}

			if(timer){
				return false;
			}

			timer = setTimeout(function(){
				clearTimeout(timer);
				timer=null;
				_self.apply(_me,args);
			},interval||500);


		}
	}

	var CloudMove = function(opts){
		if(!opts.$ele){
			return ;
		}
		var opts = $.extend({
			duration:50,
			delay:0
		},opts);
		this.opts = opts;
		var ele = opts.$ele;
		this.$ele = ele;
		this.initLeft = ele.position().left;
		this.width = ele.width();
		this.startMove();
	}

	CloudMove.prototype.startMove = function(){
		var _self = this;
		if(this.opts.delay){
			setTimeout(function(){
				_self.move();
			},this.opts.delay)
		}else{
			_self.move();
		}

	}
	CloudMove.prototype.move = function(){
		var _self = this;
		this.timer && clearInterval(this.timer);
		this.timer = setInterval(function(){
			var $ele = _self.$ele;
			var left = $ele.position().left;
			
			if (left <= -_self.width){
				left = $(window).width()+_self.width + 30;
			}
			$ele.css('left',parseInt(left)-1);
		},this.opts.duration)
	}
	CloudMove.prototype.stop = function(){
		this.timer&&clearInterval(this.timer);
		this.timer = null;
	}
})(jQuery)