/**
 * Sets a cookie in the user's browser
 * 
 * @param name of the cookie
 * @param value of the cookie
 * @param expiry_days from now, null for a session cookie
 */
function setCookie(name, value, expiry_days)
{
	// checking domains
	var domain_name = 'clubpenguin.com';
	var hostname = window.location.hostname;
	if (hostname.search(/cp.local/) > -1) {
		domain_name = hostname;
	}

	expiry_str = '';
	path_str = '; path=/';
	domain_str = '; domain='+domain_name;
	if(expiry_days) {
		var d = new Date();
		d.setDate(d.getDate() + expiry_days);
		expiry_str = ';expires=' + d.toGMTString();
	}
	
	document.cookie = name + '=' + escape(value) + expiry_str + path_str + domain_str;
}


/**
 * Gets the value of the cookie from the user's browser
 * 
 * @param name of the cookie
 * @return value of the cookie, null if the cookie isn't found
 */
function getCookie(name)
{
	var s = document.cookie.indexOf(name + "=");
	if(s == -1) {
		return null;
	}
	s += name.length + 1;
	var e = document.cookie.indexOf(";", s);
	if(e == -1) {
		e = document.cookie.length;
	}
	return unescape(document.cookie.substring(s, e));
}

/* 
The following checks for and records if a visitor is new or is a return visitor -- for A/B testing T&T
*/
if (!getCookie ('cpvisitor')) { 
	setCookie('cpvisitorsession', 'true', ''); 
	setCookie ('cpvisitor', 'new', 2400); 
} else { 
	if (!getCookie ('cpvisitorsession')) { 
		if ((getCookie ('cpvisitor')) == 'new') {
			setCookie ('cpvisitor', 'new', -1); 
			setCookie ('cpvisitor', 'return', 2400); 
		}			
	}
}


/* 
The following checks for and records the OAST source code present in a URL clicked on from a creative asset on an external site
*/

var qsParm = new Array();
function qs() {
var query = window.location.search.substring(1);
var parms = query.split('&');
	for (var i=0; i<parms.length; i++) {
	var pos = parms[i].indexOf('=');
		if (pos > 0) {
		var key = parms[i].substring(0,pos);
		var val = parms[i].substring(pos+1);
		qsParm[key] = val;
		}
	}
} 

qsParm['oast'] = null;
qs();

if (qsParm['oast'] != null) {
	if (getCookie ('oast')) { 
		setCookie ('oast', '', -1);
		setCookie ('oast', qsParm['oast'], 2400);
	} else {
		setCookie ('oast', qsParm['oast'], 2400);
	}
}

if(typeof jsAPI === 'undefined') {
	jsAPI = {};
}

jsAPI.showHTMLElements = function() {
	$('#membershipOptionsPrimary, #membershipOptions_real, #membershipOptions_other, #membershipOptionsSecondary, #membershipOptions_ca').css({"visibility":"visible"});
} 


jsAPI.mboxBackground = function() {
	try{
		$('#content').css({
			'background' : '#417DC5'
		});
		
		var IE7 =  ($.browser.msie  && parseInt($.browser.version) == 7);
		if (IE7){
			if ($('#membershipOptionsPrimary').length > 0){
				$('#membershipOptionsPrimary').css({
					'background' : 'url(/images/pricing_bg_ca_ie7.png) 0 0 no-repeat',
					'height':'135px',
					'margin': '8px 0 0 -14px'
				});	
			}
		} else{
			if ($('#membershipOptionsPrimary').length > 0){
				$('#membershipOptionsPrimary').css({
					'background' : 'url(/images/pricing_bg_ca_b.png) 0 0 no-repeat',
					'height':'135px',
					'margin': '8px 0 0 -14px'
				});	
			}
		}
		
		if ($('#membershipOptions_other').length > 0){
			$('#membershipOptions_other').css({
				'background' : 'url(/images/pricing_bg_ca_b.png) 0 0 no-repeat'
			});	
		}
		
		if ($('#membershipOptions_ca').length > 0){
			$('#membershipOptions_ca').css({
				'background' : 'url(/images/pricing_bg_ca_a.png) 0 0 no-repeat',
				'height':'154px',
				'margin-left': '-15px'
			});
		}
		
		if ($('#membershipOptions_real').length > 0){
			$('#membershipOptions_real').css({
				'background' : 'url(/images/pricing_bg_ca_b.png) 0 0 no-repeat',
				'height':'135px',
				'margin-left': '-15px'
			});	
		}		

		
		if ($('#content .padd').length > 2) {
			//euro style template with no padding
			$('#membershipOptions_other').css({
				'height':'135px',
				'margin': '8px 0 20px 15px'
			});	
		} else {
			//ar style template with padding already in place
			if (!$($('#membershipOptions_other').parent()).hasClass('padd')){
				$('#membershipOptions_other').css({
					'height':'135px',
					'margin': '8px 0 20px 15px'
				});	
			} else {
				$('#membershipOptions_other').css({
					'height':'135px',
					'margin': '8px 0 20px -15px'
				});	
			}
		}
	
		if ($('#content .padd').length > 1) {
			$($('#content .padd')[0]).css({
				'background' : '#fefde1',
				'border-bottom' : '3px solid #013A69'
			});
			var lastPad = $($('#content .padd')[($('#content .padd').length-1)]);
			if (lastPad.find('object').length == 0) {
				//last pad container doesn't contains flash
				lastPad.css({
					'background' : '#fff',
					'border-top' : '3px solid #013A69',
					'margin-top' : '25px'
				});
			} else {
				//last pad container contains both flash and purchase image
				if (lastPad.find('#membershipOptionsSecondary').length > 0) {
					$('#membershipOptionsSecondary').wrap('<div class="temporary-div" />');
					$('#content .padd').css({
						'padding-bottom':0
					});
				}
				
			}
		}

	}catch(e){}
}

	;
if(typeof CP === 'undefined') {
	CP = {};
}

if(!CP.utils) {
	CP.utils = {};
}

CP.utils.Modal = function(options) {
	// options that can overwritten
	this.options = {
		overlayOpacity: 0.8,
		overlayClickClose: true,
		showClose: true,
		contentCloseDelegate: null,
		centerOnResize: true,
		transitionDuration: 250,
		onOpenComplete: function(){},
		onCloseComplete: function(){},
		onOpenStart: function(){},
		onCloseStart: function(){}
	};
	jQuery.extend(true, this.options, options);

	// states
	this.isOpen = false;
	this.isLoading = false;

	//Due to conflicts with Panels only run this on the homepage at this time.  -- Added to backlog for permanent fix.
	if (location.pathname.match(/(\/|\/fr|\/es|\/de|\/pt)(\/index.php)?/)) {
	  this.inject();
	  this.attach();
	}
};
CP.utils.Modal.prototype.inject = function(){
	 //create and embed required elements
	 this.overlay = jQuery('<div id="modal-overlay"></div>').appendTo('body');
	 this.loading = jQuery('<div id="modal-loading"></div>').appendTo('body');
	 this.modal = jQuery('<div id="modal-window"></div>').appendTo('body');
	 // optional - close button
	 if(this.options.showClose){
	  	this.closeButton = jQuery('<a id="modal-close" href="#">close</a>').appendTo(this.modal);
	 }
	 this.modalContent = jQuery('<div id="modal-content"></div>').appendTo(this.modal);
	 // set overlay opacity to value in options
	 this.overlay.css('opacity', this.options.overlayOpacity);
	 this.body = jQuery('body');
};
CP.utils.Modal.prototype.attach = function(){
	var self = this;
	// overlay and loading resize handler
	jQuery(window).resize(function(){
		self.positionOverlay();
		self.centerElement(self.loading);
	});

	// optional - content triggered close event
	if(this.options.contentCloseDelegate != null){
		this.modalContent.delegate(this.options.contentCloseDelegate, 'click', function(e){
			e.preventDefault();
			self.close();
		});
	}
	// optional - hide on overlay click
	this.overlay.click(function(e){
		e.stopPropagation();

		if(self.options.overlayClickClose){
			self.close();
		}
	});

	// optional - close button
	if(this.options.showClose){
		// hide on close button click
		this.closeButton.click(function(e){
			e.preventDefault();
			self.close();
		});
	}
	// optional - window resize handler
	if(this.options.centerOnResize){
		jQuery(window).resize(function(){
			self.centerElement(self.modal);
		});
	}
};
CP.utils.Modal.prototype.centerElement = function(element){
	// usefull dimensions
	var elementWidth = element.width();

	var elementHeight = element.height();
	var windowWidth = jQuery(window).width();
	var windowHeight = jQuery(window).height();
	var scrollTop = jQuery(window).scrollTop();
	// calculate center
	var left = (windowWidth / 2) - (elementWidth / 2);
	var top = scrollTop + ((windowHeight / 2) - (elementHeight / 2));
	// bounding
	if(top < 0 ) top = 0;
	if(left < 0) left = 0;
	// set position
	element.css({
		top: top,
		left: left
	});
}
CP.utils.Modal.prototype.positionOverlay = function(){
	// ie6 alternate overlay size other browsers use css
	if(jQuery.browser.msie && jQuery.browser.version === '6.0'){
		this.overlay.css('height', jQuery(document).height());
	}
};
CP.utils.Modal.prototype.positionModal = function(){
	this.centerElement(this.modal);
};
CP.utils.Modal.prototype.showLoading = function(){
	if(this.isOpen){
		// already open just show loading indicator
		this.modal.fadeOut(this.options.transitionDuration);
		this.loading.fadeIn(this.options.transitionDuration);
	}else{
		// not open yet
		this.overlay.fadeIn(this.options.transitionDuration);
		this.positionOverlay();
		this.loading.fadeIn(this.options.transitionDuration);
		this.centerElement(this.loading);
	}
	this.isLoading = true;
};
CP.utils.Modal.prototype.open = function(modalContent, openCallback, closeCallback){
	var self = this;
	if(!this.isOpen){
		if(this.isLoading){
			// modal is already in loading state just open content
			this.loading.hide();
			this.modalContent.append(modalContent);
			this.modal.fadeIn(this.options.transitionDuration, function() {
				// callbacks
				self.options.onOpenComplete();

				if(closeCallback) self.activeCloseCallback = closeCallback;
			});
			this.options.onOpenStart();
			if(openCallback) openCallback();
			this.centerElement(this.modal);
			// update state
			this.isOpen = true;
			this.isLoading = false;
			if (self.closeButton) {
				self.closeButton.show();
			}
			this.body.addClass('modal-active');
		} else{
			// fresh modal nothing is open yet
			this.overlay.fadeIn(self.options.transitionDuration, function(){
				self.modalContent.append(modalContent);
				self.modal.fadeIn(self.options.transitionDuration, function() {
					// callbacks
					self.options.onOpenComplete();

					if(closeCallback) self.activeCloseCallback = closeCallback;
				});
				self.options.onOpenStart();
				if (self.closeButton) {
					self.closeButton.show();
				}
				if(openCallback) openCallback();
				self.centerElement(self.modal);
				// update state
				self.isOpen = true;
				self.isLoading = false;
				self.body.addClass('modal-active');
			});
			this.positionOverlay();
		}
	}else{
		// window already open just refresh content
		this.modal.css({visibility: 'hidden'}); ////to support interapp linking, instead of //this.modal.hide();
		this.modalContent.empty();
		this.modalContent.append(modalContent);
		this.options.onOpenStart();
		this.modal.css({visibility: 'visible'}); //to support interapp linking, instead of //this.modal.show();
		this.centerElement(this.modal);
		// update state
		this.isOpen = true;
		this.isLoading = false;
		this.body.addClass('modal-active');
		// callbacks
		this.options.onOpenComplete();
		if(openCallback) openCallback();
		if(closeCallback) this.activeCloseCallback = closeCallback;
	}
};
CP.utils.Modal.prototype.close = function(callback){
	if(this.isOpen){
		var self = this;

		//If you are in IE, find all embedded objects and replace them with divs. fadeout doesn't play too nice them
		if(jQuery.browser.msie) {
			var embeddedObjects = self.modalContent.find('object'); //Pro, Swfobject 2.x only uses object element!

			embeddedObjects.each(function(index, embObj) {
				embeddedObjects.replaceWith('<div id="' + embeddedObjects.attr('id') + '" />');
			});
		}

		// callback
		this.options.onCloseStart();

		// hide everything
		this.modal.fadeOut(this.options.transitionDuration, function(){
			self.modalContent.empty();
			self.loading.hide();
			self.overlay.hide();
			if (self.closeButton) {
				self.closeButton.hide();
			}

			// update state
			self.isLoading = false;
			self.isOpen = false;

			// remove class to body to signify closed modal
			self.body.removeClass('modal-active');

			// callbacks
			self.options.onCloseComplete();
			if(callback) callback();
			if(self.activeCloseCallback) {
				self.activeCloseCallback();
				self.activeCloseCallback = null;
			}
		});
	}
};
;
if (typeof CP === 'undefined') {
	var CP = {};
}

(function($) {

	CP.metrics = function(options) {
		var hostName = window.location.hostname, swid, prefix;
		this.initOptions();
		$.extend(true, this.options, options);

		// -- Referrer
		this.options.REF = document.referrer;

		// -- TransID
		if (this.options.TRANSID === '-1') {
			transid = getCookie('playspanTRANSID');
		}
		if (transid && transid !== "null") {
			this.options.TRANSID = transid;
		}
		if (this.options.TRANSID === '-1' || this.options.TRANSID === "null") {
			// If we still have '-1' or "null" assign unique identifier
			// Generate a GUID
			transid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) { var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8); return v.toString(16); });
			this.options.TRANSID = transid;
			try {
				setCookie('playspanTRANSID', transid);
			} catch(e){}
		}

		// -- BrowserID
		if (this.options.BROWSERID === '-1') {
			browserid = getCookie('cpBROWSERID');
		}
		if (browserid && browserid !== "null") {
			this.options.BROWSERID = browserid;
		}
		if (this.options.BROWSERID === '-1' || this.options.BROWSERID === "null") {
			// If we still have '-1' or "null" assign unique identifier
			//Generate a GUID
			browserid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) { var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8); return v.toString(16); });
			this.options.BROWSERID = browserid;
			try {
				setCookie('cpBROWSERID', browserid, 365);
			} catch (e){}
		}

		// -- SWID
		if (this.options.SWID === '-1') {
			swid = getCookie('playspanSWID');
		}
		if (swid && swid !== "null") {
			this.options.SWID = swid;
		}

		// -- UserID
		if (this.options.USERID === '-1') {
		  if (this.options.VIEW_NETWORK == 'cp' && this.options.SWID != '-1') {
		    this.options.USERID = this.options.SWID;
		  } else {
		    this.options.USERID = this.options.BROWSERID;
		  }
		}

		// -- App Name & Context
		if (!this.options.CONTEXT_PREFIX) {
			prefix = getCookie('contextVariant') || 'purchase_funnel_';
			this.setContextVariant(prefix);
		}
		if (hostName.indexOf("stage") >= 0 || hostName.indexOf("localhost") >= 0 || hostName.indexOf("sandbox") >= 0 || hostName.indexOf("qa") >= 0 || hostName.indexOf("dev") >= 0) {
			this.options.API_APP_NAME = "qa_" + this.options.API_APP_NAME;
		}

		// -- App Locale
		if (document.documentElement.lang) {
			this.options.APP_LOCALE = document.documentElement.lang.toLowerCase().substr(0, 2);
		}
		switch (this.options.APP_LOCALE) {
			case "en":
				this.options.APP_LOCALE += "_US";
				break;
			case "pt":
				this.options.APP_LOCALE += "_BR";
				break;
			case "fr":
				this.options.APP_LOCALE += "_FR";
				break;
			case "es":
				this.options.APP_LOCALE += "_ES";
				break;
			case "de":
				this.options.APP_LOCALE += "_DE";
				break;
			case "ru":
				this.options.APP_LOCALE += "_RU";
				break;
		}
	};

	CP.metrics.prototype.setSWID = function(swid) {
		if (swid && swid !== "null") {
			this.options.SWID = swid;
			try {
				setCookie('playspanSWID', swid);
				window.metrics.network_mapping_info();
			} catch (e) {
			}
		}
	};

	CP.metrics.prototype.getTRANSID = function() {
		if (transid && transid !== "null") {
			return transid;
		}
	};

	CP.metrics.prototype.setContextVariant = function(variant) {
		this.options.CONTEXT_PREFIX = variant;
		try {
			setCookie('contextVariant', variant);
		} catch (e) {
		}
	};

	CP.metrics.prototype.logTimingEvent = function(location, moreData) {
		var tag = this.options.TAG, network = this.options.NETWORK, viewNetwork = this.options.VIEW_NETWORK, appLocale = this.options.APP_LOCALE, context = this.options.CONTEXT, transid = this.options.TRANSID, data = {
			'tag' : tag,
			'network' : network,
			'view_network' : viewNetwork,
			'lang' : appLocale,
			'app_locale' : appLocale,
			'context' : context,
			'location' : location,
			'timestamp_ms' : (new Date()).getTime(),
			'transaction_id' : transid,
			'browser_id' : browserid,
			'abTestId' : browserid
		};
		if (moreData) {
			$.extend(true, data, moreData);
		}

		this.logEvent(data);
	};

	CP.metrics.prototype.logError = function(moreData) {
		var tag = 'error', network = this.options.NETWORK, viewNetwork = this.options.VIEW_NETWORK, appLocale = this.options.APP_LOCALE, data = {
			'tag' : tag,
			'network' : network,
			'view_network' : viewNetwork,
			'lang' : appLocale,
			'app_locale' : appLocale,
			'browser_width' : $(window).width(),
			'browser_height' : $(window).height()
		};
		if (moreData) {
			$.extend(true, data, moreData);
		}
		this.logEvent(data);
	};

	CP.metrics.prototype.pageView = function(page, moreData) {

		if(window.location.hostname.indexOf("play") >= 0){
			page = "play";
		}

		var tag = 'pageview', network = this.options.NETWORK, viewNetwork = this.options.VIEW_NETWORK, appLocale = this.options.APP_LOCALE
		, transid = this.options.TRANSID, browserid = this.options.BROWSERID, data = {
			'tag' : tag,
			'network' : network,
			'view_network' : viewNetwork,
			'lang' : appLocale,
			'app_locale' : appLocale,
			'transaction_id' : transid,
			'browser_id' : browserid,
			'location' : page,
			'browser_width' : $(window).width(),
			'browser_height' : $(window).height(),
			'abTestId' : browserid
		};
		if (moreData) {
			$.extend(true, data, moreData);
		}
		this.logEvent(data);
	};

	CP.metrics.prototype.network_mapping_info = function(moreData) {
		this.options.VIEW_NETWORK = "bd";
		var secondarynetwork = "cp";
		var tag = 'network_mapping_info', network = this.options.NETWORK, viewNetwork=this.options.VIEW_NETWORK, appLocale = this.options.APP_LOCALE
		, browserid = this.options.BROWSERID, data = {
			'tag' : tag,
			'network' : network,
			'view_network' : viewNetwork,
			'app_locale' : appLocale,
			'secondary_user_id' : this.options.SWID,
			'secondary_network' : secondarynetwork
		};

		if (moreData) {
			$.extend(true, data, moreData);
		}

		var networkMappingSent = getCookie('networkMappingSent') || 0;
		if (networkMappingSent == 0) {
			this.logEvent(data);
			setCookie('networkMappingSent', 1);
		}
	};

	CP.metrics.prototype.game_action = function(action, name, moreData) {
		var tag = 'game_action', network = this.options.NETWORK, viewNetwork = this.options.VIEW_NETWORK, appLocale = this.options.APP_LOCALE
		, transid = this.options.TRANSID, browserid = this.options.BROWSERID, data = {
			'tag' : tag,
			'network' : network,
			'view_network' : viewNetwork,
			'lang' : appLocale,
			'app_locale' : appLocale,
			'transaction_id' : transid,
			'browser_id' : browserid,
			'context' : name,
			'action' : action
		};

		if (moreData) {
			$.extend(true, data, moreData);
		}

		this.logEvent(data);
	};

	CP.metrics.prototype.testImpression = function(testName, control, variant) {
		var tag = 'test_impression', network = this.options.NETWORK, viewNetwork = this.options.VIEW_NETWORK, appLocale = this.options.APP_LOCALE
		var url = window.location.pathname, transid = this.options.TRANSID, browserid = this.options.BROWSERID, Swid = this.options.SWID, data = {
			'tag' : tag,
			'network' : network,
			'view_network' : viewNetwork,
			'app_locale' : appLocale,
			'browser_id' : browserid,
			'SWID' : Swid,
			'test' : testName,
			'control' : control,
			'variant' : variant
		};
		this.logTestImpression(data);
	};

	CP.metrics.prototype.clickedLink = function(moreData) {
		//Only log this if referrer is not *.clubpenguin.com
		var referrerUrl = '';
		if (this.options.REF) {
			 referrerUrl =  this.options.REF;
		}

		//Grab the original homepage referrer because we force a redirect for geo targetting purposes.
		homepageReferrer = getCookie('homepageReferrer');
		if (homepageReferrer && homepageReferrer !== "null") {
		  referrerUrl =  homepageReferrer;
		  //clear the cookie value
		  setCookie('homepageReferrer', 'null', -1);
		}

		var tag = 'clicked_link', network = this.options.NETWORK, viewNetwork = this.options.VIEW_NETWORK, appLocale = this.options.APP_LOCALE
		var trackingCodeCMP = this.getQueryParam('cmp'), trackingCodeOAST = this.getQueryParam('oast');
		var trackingCode = "";
		//only one or the other will be set cmp = emails, oast = banners etc
		if (trackingCodeCMP) {
			trackingCode += trackingCodeCMP;
		}
		if (trackingCodeOAST) {
			trackingCode += trackingCodeOAST;
		}
		var trackUrl = window.location.href, isNewUser = (getCookie('cpvisitor') == "new" ? 1 : 0 );
		var transid = this.options.TRANSID, browserid = this.options.BROWSERID, data = {
			'tag' : tag,
			'network' : network,
			'view_network' : viewNetwork,
			'lang' : appLocale,
			'app_locale' : appLocale,
			'transaction_id' : transid,
			'browser_id' : browserid,
			'abTestId' : browserid,
			'is_new_user' : isNewUser,
			'tracking_code' : trackingCode,
			'ref_id' : "", //do not know what this is referring to.
			'track_url' : encodeURIComponent(trackUrl),
			'referrer_url' : encodeURIComponent(referrerUrl)
		};
		if (moreData) {
			$.extend(true, data, moreData);
		}

		//log each clicked link
		if (referrerUrl != '') {
			var referrerUrlSplit = referrerUrl.split('/');
			//hostname will be in array value 2
			var referrerUrl = referrerUrlSplit[2];
			// DRTV Domains - since we're already past the point of setting the logging variable
			// this test is just so we ensure that NO logging occurs for DRTV Parents page when referrer is DRTV Kids
			// and Membership Purchase pages are NOT logged when coming from DRTV Parents
			if (referrerUrl.match(/clubpenguinoffer.com/) || referrerUrl.match(/clubpenguintv.com/) || referrerUrl.match(/getclubpenguin.com/) || referrerUrl.match(/tryclubpenguin.com/)) {
				referrerUrl = 'clubpenguin.com';
			}
		}
		if (!referrerUrl.match(/clubpenguin.com/) || trackingCode != "") {
			this.logEvent(data);
		}
	};

	CP.metrics.prototype.user_info = function(device_type, device_model, os_version, moreData) {
		var data = {
			'tag' : 'user_info',
			'network' : this.options.NETWORK,
			'view_network' : this.options.VIEW_NETWORK,
			'app_locale' : this.options.APP_LOCALE,
			'transaction_id' : this.options.TRANSID,
			'browser_id' : this.options.BROWSERID,
			'device_type' : device_type,
			'os_version' : os_version,
			'model' : device_model
		};
		if (moreData) {
			$.extend(true, data, moreData);
		}
		this.logEvent(data);
	};

	CP.metrics.prototype.geo = function(moreData) {
		//Only log this if referrer is not *.clubpenguin.com
		var referrerUrl = '';
		if (this.options.REF) {
			 referrerUrl =  this.options.REF;
		}
		var data = {
			'tag' : 'geo',
			// 'useragent' : navigator.userAgent
			'network' : this.options.NETWORK,
			'view_network' : this.options.VIEW_NETWORK,
			'app_locale' : this.options.APP_LOCALE
		};
		if (moreData) {
			$.extend(true, data, moreData);
		}

		//log each clicked link
		if (referrerUrl != '') {
			var referrerUrlSplit = referrerUrl.split('/');
			//hostname will be in array value 2
			var referrerUrl = referrerUrlSplit[2];
			// DRTV Domains - since we're already past the point of setting the logging variable
			// this test is just so we ensure that NO logging occurs for DRTV Parents page when referrer is DRTV Kids
			// and Membership Purchase pages are NOT logged when coming from DRTV Parents
			if (referrerUrl.match(/clubpenguinoffer.com/) || referrerUrl.match(/clubpenguintv.com/) || referrerUrl.match(/getclubpenguin.com/) || referrerUrl.match(/tryclubpenguin.com/)) {
				referrerUrl = 'clubpenguin.com';
			}
		}
		if (!referrerUrl.match(/clubpenguin.com/)) {
			var pic, url = window.location.protocol + "//log.data.disney.com/g?app=" + this.options.API_APP_NAME + "&user_id=" + this.options.USERID;
			for ( var key in data) {
				if (data.hasOwnProperty(key)) {
					url += "&" + key + "=" + data[key];
				}
			}
			url += '&rnd=' + Math.random();	// adding random to avoid img caching in FF
			if (this.callbackImage) {
				pic = this.callbackImage;
			} else {
				pic = new Image();
			}
			pic.src = url;
		}
	};

	CP.metrics.prototype.log = function(tag, moreData) {
		var transid = this.options.TRANSID;
		var network = this.options.NETWORK, viewNetwork = this.options.VIEW_NETWORK, appLocale = this.options.APP_LOCALE, data = {
			'tag' : tag,
			'network' : network,
			'view_network' : viewNetwork,
			'lang' : appLocale,
			'app_locale' : appLocale,
			'browser_width' : $(window).width(),
			'browser_height' : $(window).height(),
			'transaction_id' : transid
		};
		if (moreData) {
			$.extend(true, data, moreData);
		}
		this.logEvent(data);
	};

	CP.metrics.prototype.logEvent = function(data) {
		if (data) {
			$.extend(true, this.options, data);
		}
		var pic, url = window.location.protocol + "//log.data.disney.com/cp?app=" + this.options.API_APP_NAME + "&user_id=" + this.options.USERID;
		for ( var key in data) {
			if (data.hasOwnProperty(key)) {
				url += "&" + key + "=" + data[key];
			}
		}
		url += '&rnd=' + Math.random();	// adding random to avoid img caching in FF

		if (this.callbackImage) {
			pic = this.callbackImage;
		} else {
			pic = new Image();
		}
		pic.src = url;
	};

	CP.metrics.prototype.logTestImpression = function(data) {
		if (data) {
			$.extend(true, this.options, data);
		}
		var TI_APP_NAME ="clubpenguin";
		var hostName = window.location.hostname, swid, prefix;
		if (hostName.indexOf("stage") >= 0 || hostName.indexOf("sandbox") >= 0 || hostName.indexOf("qa") >= 0 || hostName.indexOf("dev") >= 0) {
			TI_APP_NAME = "qa_" + TI_APP_NAME;
		}

		var pic, url = window.location.protocol + "//log.data.disney.com/cp?app="+ TI_APP_NAME + "&user_id=" + this.options.BROWSERID;
		for ( var key in data) {
			if (data.hasOwnProperty(key)) {
				url += "&" + key + "=" + data[key];
			}
		}
		if (this.callbackImage) {
			pic = this.callbackImage;
		} else {
			pic = new Image();
		}
		pic.src = url;
	};

	CP.metrics.prototype.stepTime = function(funnelName, stepName, moreData) {
		this.options.TAG = 'step_timing';
		try {
			var existingFunnel = getCookie('playspanFunnelName');
			if (!this.options.CONTEXT) {
				this.options.CONTEXT = existingFunnel;
				if (!this.options.CONTEXT) {
					if (funnelName.indexOf('_') < 0) {
						funnelName = this.options.CONTEXT_PREFIX + funnelName;
					}
					setCookie('playspanFunnelName', funnelName);
					this.options.CONTEXT = funnelName;
				}
			}

			this.logTimingEvent(stepName, moreData);
			if (stepName === 'end') {
				this.reset();
			}
		} catch (e) {
		}
	};

	CP.metrics.prototype.reset = function() {
		this.initOptions();
		setCookie('playspanFunnelName', '');
		setCookie('contextVariant', '');
	};

	CP.metrics.prototype.initOptions = function() {
		this.options = {
			API_APP_NAME : 'clubpenguin',
			SWID : '-1',
			ABTESTID : '-1',
			TRANSID : '-1',
			BROWSERID : '-1',
			USERID : '-1',
			CONTEXT : '',
			APP_LOCALE : 'en_US',
			LOCALE : 'en_US',
			NETWORK : 'c',
			VIEW_NETWORK : 'bd',
			REASON : '',
			TAG : '',
			CONTEXT_PREFIX : ''
		};
	};

	CP.metrics.prototype.track = function(pagename) {
		try {
			cto.pageName = pagename;
			cto.track();
			return true;
		} catch (e) {
			return false;
		}
	};

	CP.metrics.prototype.getQueryParam = function(param) {
		//escape any regex dilimeters
		name = name.replace(/[\[]/,"\\\[").replace(/[\]]/,"\\\]");
		//find the param in the query string
	    var result =  window.location.search.match(
	        new RegExp("(\\?|&)" + param + "(\\[\\])?=([^&]*)")
	    );

	    //If found return value else return false;
	    return result ? result[3] : false;
	}

})(window.jQuery);

window.jQuery(document).ready(function($) {
	window.metrics = new CP.metrics();
});
;
if (typeof CP === 'undefined') {
    CP = {};
}

if (typeof CP.global === 'undefined') {
    CP.global = {};
}

CP.global.defaults = {
    countryCode: 'US'
}

CP.global.runningVars = {
    rssURL: "http://www.clubpenguin.com/blog/rss.xml",
    hasFlash: true,
    blogInterval: null,
    blogDelay: 4000,
    currentBlog: 0,
    modal: null
};

(function($) {

    CP.common = function(options) {
        this.options = {};
        $.extend(true, this.options, options);
        this.load();
    };

    CP.common.prototype.initListeners = function() {

        //language select dropdown
        $('#langdropdown a.top-level').click(function(e) {
            e.preventDefault();
            $(this).addClass('active');
            $('#languages').css('display', 'block');
        });
        $('#langdropdown').mouseleave(function() {
            $('a.top-level').removeClass('active');
            $('#languages').hide();
        });


        //footer language select
        $('#language-select a.top-level').click(function(e) {
            e.preventDefault();
            $(this).addClass('active');
            $('#bottom-languages').css('display', 'block');
        });
        $('#language-select').mouseleave(function() {
            $('a.top-level').removeClass('active');
            $('#bottom-languages').hide();
        });

    };

    CP.common.prototype.load = function() {
        if (typeof swfobject == "undefined") {
            CP.global.runningVars.hasFlash = false;
        } else {
            CP.global.runningVars.hasFlash = swfobject.hasFlashPlayerVersion("9");
        }
        this.initListeners();
        if ($('.blogscroll').length > 0) {
            this.autoRotateBlogTitles();
        }
        //this.styleMobileFoooter();
        if (window.location.href.indexOf('/de/') > 0 && $('#bucket-fire').length > 0 && $('#bucket-puffle').length > 0) {
            $('#bucket-fire').show();
            $('#bucket-puffle').hide();
        } else {
            $('#bucket-fire').hide();
            $('#bucket-puffle').show();
        }
        //this.initModal();
    };

    CP.common.prototype.initModal = function() {
        CP.global.runningVars.modal = new CP.utils.Modal({
            showClose: false,
            contentCloseDelegate: '.modal-close',
            onOpenComplete: function() {},
            onCloseComplete: function() {},
            onCloseStart: function() {},
            onOpenStart: function() {}
        });
    };

    CP.common.prototype.showModal = function(htmlFile, wrapId, openCallback, closeCallback) {
        $('#modal-content').load(htmlFile + ' #' + wrapId, function() {
            //open modal
            if (!closeCallback) closeCallback = null;
            if (!openCallback) openCallback = null;
            CP.global.runningVars.modal.open('', openCallback, closeCallback);
        });
    };

    CP.common.prototype.closeModal = function() {
        CP.global.runningVars.modal.close();
    }

    CP.common.prototype.showBlogTitle = function(index) {
        var self = this;
        if ($('#nav ul.blogscroll').length > 0) {
            $('#nav ul.blogscroll li.active').fadeOut(200, function() {
                $(this).removeClass('active');
                $($('#nav ul.blogscroll li')[index]).fadeIn(200, function() {
                    $(this).addClass('active');
                });
            });
        }
    };

    CP.common.prototype.autoRotateBlogTitles = function() {
        var self = this;
        CP.global.runningVars.blogInterval = setInterval(function() {
            self.showBlogTitle(CP.global.runningVars.currentBlog);
            CP.global.runningVars.currentBlog = ((CP.global.runningVars.currentBlog + 1) % 3);
        }, CP.global.runningVars.blogDelay);
    };

    CP.common.prototype.styleMobileFoooter = function() {
        /* legacy footer */
        $("#submit").hide();

        $("#page-changer select").change(function() {
            window.location = $("#page-changer select option:selected").val();
        });

        $.fn.extend({
            customStyle: function(options) {
                return this.each(function() {
                    var currentSelected = $("option:first");
                    $(this).after('<span class="customStyleSelectBox"><span class="customStyleSelectBoxInner">' + currentSelected.text() + '</span></span>').css({
                        position: 'absolute',
                        opacity: 0,
                        fontSize: $(this).next().css('font-size')
                    });
                    var selectBoxSpan = $(this).next();
                    var selectBoxWidth = parseInt($(this).width()) - 40;
                    var selectBoxSpanInner = selectBoxSpan.find(':first-child');
                    // //selectBoxSpan.css({display:'inline-block'});
                    // selectBoxSpanInner.css({width:selectBoxWidth, display:'inline-block'});
                    // var selectBoxHeight = parseInt(selectBoxSpan.height()) + parseInt(selectBoxSpan.css('padding-top')) + parseInt(selectBoxSpan.css('padding-bottom'));
                    //$(this).height(selectBoxHeight).change(function(){
                    //  selectBoxSpanInner.text($(this).val()).parent().addClass('changed');
                    //});
                });
            }
        });

        $(function() {
            $('select.styled').customStyle();
        });
    }

     /**
      * @function {static public} getCountryCode
      * This functino will get the country code by searching the following in order :
      *   <ul>
      *     <li>URL Param</li>
      *     <li>Cookie</li>
      *     <li>Default (currently US)/li>
      *   </ul>
      *   
      * @return {String} A two character string representing the Country Code. Example: US or RU
      */
    CP.common.getCountryCode = function() {

        //product and parent section
        //snippet to parse url parameter
        $.myUrlParam = function(name) {
            var results = new RegExp('[\\?&]' + name + '=([^&#]*)').exec(window.location.href);
            return results ? results[1] : null;
        };

        var countryCode = $.myUrlParam('country') || getCookie('CP_OVERRIDE_LOCATION');
        if (!countryCode || countryCode == '--') {
            countryCode = CP.global.defaults.countryCode;
        }
        return countryCode;
    };


    Drupal.behaviors.append_parameter = {
        attach: function(context, settings) {

            // Checks for nochrome
            if (window.location.href.indexOf('nochrome=1') >= 0) {
                // hide some divs that shouldn't be there on mobile
                $('#printButton,#downloadButton,#nav').hide();

                if (!getCookie('nochrome')) {
                    setCookie('nochrome', '1');
                }

                // New rule - disallow any link in blog content that is external
                $('.page-blog .views-field-body a, .node-type-cp-blog .views-field-body a').each(function() {
                    var href = this.href;
                    if (href.indexOf('clubpenguin.com') == -1 && href.indexOf('localhost') == -1) {
                        $(this).replaceWith($(this).text()); //deactivate link
                    }
                    //disable links to contact us section from within the blog
                    if (href.indexOf('clubpenguin.com/help/contact') > -1 || href.indexOf('localhost:8082/help/contact') > -1) {
                        $(this).replaceWith($(this).text()); //deactivate link
                    }

                });

                // Look at every link and ensure nochrome var
                $('a').each(function() {
                    var href = this.href;
                    if (href.indexOf('clubpenguin.com') != -1 || href.indexOf('localhost') != -1) {
                        // don't append if already have nochrome var, propagate it
                        if (href.indexOf("nochrome=1") < 0) {
                            if (href.indexOf('?') != -1) {
                                href = href + '&nochrome=1';
                            } else {
                                href = href + '?nochrome=1';
                            }
                            $(this).attr('href', href);
                        }
                    }
                });
            }


            var countryCode = window.CP.common.getCountryCode();

            $('a[href*="products"], a[href*="parents"]').each(function() {
                // grab the url
                var href = this.href;

                // don't append if already have country code var
                if (href.indexOf("country=") >= 0) {
                    return;
                }

                // find out if there's a hashtag, set that aside
                var hashtag = '';
                var indexOfHash = href.indexOf('#');
                if (indexOfHash >= 0) {
                    hashtag = href.substr(indexOfHash);
                    // if there's a hashtag, remove it from the url
                    hashtagLength = hashtag.length;
                    hrefLength = href.length;
                    href = href.substr(0, hrefLength - hashtagLength);
                }

                // continue on with the country tweaks
                if (href.indexOf('?') != -1) {
                    href = href + '&country=' + countryCode;
                } else {
                    href = href + '?country=' + countryCode;
                }

                // add the hashtag back in at the end
                href = href + hashtag;
                $(this).attr('href', href);
            });

        }
    };
})(window.jQuery);

window.jQuery(document).ready(function() {
    window.common = new CP.common();
});;
(function($) {
  /**
   * Main Club Penguin Behaviors
   */
  Drupal.behaviors.club_penguin = {
    attach: function (context) {
      // checkbox checked state class for ie 8
      // also used for styling checkboxes
      $('.form-type-checkbox label', context).once('checkboxProcessed', function() {
        $(this,context).click(function() {
          $(this).toggleClass('checked');
        });
      });
      
      //radio button checked state class for ie 8
      $('.form-radio').click(function(){
        $(this).parents(".form-radios").each( function(index, element) {
            $(element).find("label").removeClass('checked');
        });
        $(this).siblings('label').addClass('checked');
      });

      // //ios 5.1
      // if (navigator.userAgent.match(/OS 5(_\d)+ like Mac OS X/i)) {
      //   $('label[for^="edit-terms-of-use"]').unbind('touchstart');
      //   $('label[for^="edit-terms-of-use"]').bind('touchstart', function(e){
      //     $(this).toggleClass('checked');
      //     var forid = $(this).attr("for");
      //     var checkbox = $('input#'+forid);
      //     checkbox.attr("checked", !checkbox.attr("checked"));
      //   });
      // }

      //snippet to parse url parameter
      $.myUrlParam = function(name) {
        var results = new RegExp('[\\?&]' + name + '=([^&#]*)').exec(window.location.href);
        return results?results[1]:null;
      }

      // accordion for news & media q & a listing auto open
      $('.view-id-company.view-display-id-block_2 .item-list', context).each(function(i) {
        var row = $(this);
        if (!row.hasClass('accordion')) {
          $('.views-field-title-field', row).click(function(e) {
            $(this).parents('li').siblings().removeClass('open');
            $(this).parents('li').toggleClass('open');
            return false;
          });
        }
        row.addClass('accordion');
        $('.views-row-' + $.myUrlParam('expand')).addClass('open');
      });

      // reloads page and set location cookie
      $('#country_override').change(function() {
        //remove current option country code and add new country code along with default class
        var countryclasspre = $("#country_override-button .ui-selectmenu-status").text();
        var countryclasspost = $("option:contains(" + countryclasspre + ")").val().toLowerCase().replace(/ /g, '-');
        $('#country_override-button .ui-selectmenu-status').removeClass().addClass('ui-selectmenu-status ' + countryclasspost + ' country-icon');
        // cookie replaced by url parameter
        //$.cookie("CP_OVERRIDE_LOCATION_BY_USER", $('#country_override').val(), { path: '/' });
        location.replace("?country=" + $('#country_override').val());
      });

      //only if country button exist
      if ($('#country_override-button .ui-selectmenu-status').length) {
        // grab value from original select menu and add to jquiery select menu option
        $('#country_override-menu li a').each(function() {
          var countryclasspre = $(this).text();
          var countryclasspost = $("option:contains(" + countryclasspre + ")").val().toLowerCase().replace(/ /g, '-');
          $(this).addClass(countryclasspost + ' country-icon');
        });

        // does the same but for currently selected option
        $('#country_override-button .ui-selectmenu-status').ready(function() {
          var countryclasspre = $('#country_override-button .ui-selectmenu-status').text();
          var countryclasspost = $("option:contains(" + countryclasspre + ")").val().toLowerCase().replace(/ /g, '-');
          $('#country_override-button .ui-selectmenu-status').addClass(countryclasspost + ' country-icon');
          $('a.' + countryclasspost + '.country-icon').addClass('hide-country');
        });
      }

      // Watching Play buttons for iOS devices
      if( (navigator.userAgent.match(/iPhone/i)) || (navigator.userAgent.match(/iPod/i)) || (navigator.userAgent.match(/iPad/i)) ) {
        var title = Drupal.t('Please download the Club Penguin app to login and play on this device.');
        var content = Drupal.t('By clicking below you are leaving Club Penguin and are about to go to appstore.com where a different Terms of Use and Privacy Policy will apply.');
        var cancel = Drupal.t('Cancel');
        var download = Drupal.t('Download');
        var extraClass = 'play-now';
        var downloadLink = 'http://appstore.com/disney/clubpenguin';
        $('a.play-now').addClass('agegated-link').attr('href',downloadLink).attr('data-interstitial_ok',download).attr('data-interstitial_cancel',cancel).attr('data-interstitial_text',content).attr('data-interstitial_title',title);
      }
    }
  };

})(jQuery);

window.jQuery(document).ready(function($){
  // Basic Browser Testing
  if(jQuery.browser.mobile) {
    $('body').addClass('browser-mobile');
  } else {
    $('body').addClass('browser-desktop')
  }

  // Send BI "geo" pixel
  if (typeof Drupal.settings.bi_settings == 'undefined' || typeof Drupal.settings.bi_settings.geo == 'undefined' || Drupal.settings.bi_settings.geo == true) {
    try {
        window.metrics.geo();
    } catch(e){}
  }

  // Send BI "network_mapping_info" pixel
  try {
    var userid = getCookie('playspanSWID');
    if( userid !== null && userid !== "-1"){
      window.metrics.network_mapping_info();
    }
  } catch(e){}

  // Send BI "clicked_link" pixel
  if (typeof Drupal.settings.bi_settings == 'undefined' || typeof Drupal.settings.bi_settings.clicked_link == 'undefined' || Drupal.settings.bi_settings.clicked_link == true) {
    try {
      window.metrics.clickedLink();
    } catch(e){}
  }

  // Send BI "page_view" pixel
  if (typeof Drupal.settings.bi_settings == 'undefined' || typeof Drupal.settings.bi_settings.page_view == 'undefined' || Drupal.settings.bi_settings.page_view == true) {
    try {
      var url = window.location.pathname;
      window.metrics.pageView(url);
    } catch(e){}
  }

  // Send BI "test_impression" pixel
  try {
    if ($('.abtest').length > 0) {
      $('.abtest').each(function(i, occurrence){
        var testName = $(this).attr('rel');
        var testType = $(this).children().get(0).className;
        var control = 1;
        var variant = 0;
        if (testType != 'control') {
          variant = testType.replace('variant', '');
          control = 0;
        }
        window.metrics.testImpression(testName, control, variant);
      });
    }
  } catch(e){}
});

/**
 * jQuery.browser.mobile (http://detectmobilebrowser.com/)
 * jQuery.browser.mobile will be true if the browser is a mobile device
 * Code copied Oct. 1, 2015
 **/
(function(a){(jQuery.browser=jQuery.browser||{}).mobile=/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))})(navigator.userAgent||navigator.vendor||window.opera);
;
(function($) {

  Drupal.behaviors.club_penguin_qt = {
    attach: function(context, settings) {
      //-- FUN STUFF
      //-----------------------------------
      // NEXT click
      $('#quicktabs-community_landing_top .next', context).click( function() {
        // Find the current tab.
        var id = $('#quicktabs-community_landing_top .quicktabs-tabs li.active').index();
        var nav_count = $('#quicktabs-community_landing_top .quicktabs-tabs li').length;

        // Send the click event.
        $('#quicktabs-tab-community_landing_top-' + get_qt_id('next',nav_count,id)).click();
      });
      // PREVIOUS click
      $('#quicktabs-community_landing_top .previous', context).click( function() {
        // Find the current tab.
        var id = $('#quicktabs-community_landing_top .quicktabs-tabs li.active').index();
        var nav_count = $('#quicktabs-community_landing_top .quicktabs-tabs li').length;

        // Send the click event.
        $('#quicktabs-tab-community_landing_top-' + get_qt_id('previous',nav_count,id)).click();
      });

      //-- PRODUCTS
      //-----------------------------------
      // NEXT click
      $('#quicktabs-products_landing_quicktab .next', context).click( function() {
        // Find the current tab.
        var id = $('#quicktabs-products_landing_quicktab .quicktabs-tabs li.active').index();
        var nav_count = $('#quicktabs-products_landing_quicktab .quicktabs-tabs li').length;

        // Send the click event.
        $('#quicktabs-tab-products_landing_quicktab-' + get_qt_id('next',nav_count,id)).click();
      });
      // PREVIOUS click
      $('#quicktabs-products_landing_quicktab .previous', context).click( function() {
        // Find the current tab.
        var id = $('#quicktabs-products_landing_quicktab .quicktabs-tabs li.active').index();
        var nav_count = $('#quicktabs-products_landing_quicktab .quicktabs-tabs li').length;

        // Send the click event.
        $('#quicktabs-tab-products_landing_quicktab-' + get_qt_id('previous',nav_count,id)).click();
      });

      // Transfer click to a tag from li
      // TODO: Do we need this?
      $('.quicktabs-tabs li', context).click( function() {
        $(this).find("a").click();
      });
    }
  };

  function get_qt_id(direction,nav_count,active_id) {
    if (direction == 'previous') { // Previous arrow
        if (active_id == 0) { id = nav_count - 1; }
        else { id = id - 1; }
    } else { // Next arrow
        id = (active_id + 1) % nav_count;
    }
    return id;
  }

})(jQuery);;
/*jshint eqnull:true */
/*!
 * jQuery Cookie Plugin v1.2
 * https://github.com/carhartl/jquery-cookie
 *
 * Copyright 2011, Klaus Hartl
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * http://www.opensource.org/licenses/mit-license.php
 * http://www.opensource.org/licenses/GPL-2.0
 */
(function ($, document, undefined) {

	var pluses = /\+/g;

	function raw(s) {
		return s;
	}

	function decoded(s) {
		return decodeURIComponent(s.replace(pluses, ' '));
	}

	var config = $.cookie = function (key, value, options) {

		// write
		if (value !== undefined) {
			options = $.extend({}, config.defaults, options);

			if (value === null) {
				options.expires = -1;
			}

			if (typeof options.expires === 'number') {
				var days = options.expires, t = options.expires = new Date();
				t.setDate(t.getDate() + days);
			}

			value = config.json ? JSON.stringify(value) : String(value);

			return (document.cookie = [
				encodeURIComponent(key), '=', config.raw ? value : encodeURIComponent(value),
				options.expires ? '; expires=' + options.expires.toUTCString() : '', // use expires attribute, max-age is not supported by IE
				options.path    ? '; path=' + options.path : '',
				options.domain  ? '; domain=' + options.domain : '',
				options.secure  ? '; secure' : ''
			].join(''));
		}

		// read
		var decode = config.raw ? raw : decoded;
		var cookies = document.cookie.split('; ');
		for (var i = 0, parts; (parts = cookies[i] && cookies[i].split('=')); i++) {
			if (decode(parts.shift()) === key) {
				var cookie = decode(parts.join('='));
				return config.json ? JSON.parse(cookie) : cookie;
			}
		}

		return null;
	};

	config.defaults = {};

	$.removeCookie = function (key, options) {
		if ($.cookie(key) !== null) {
			$.cookie(key, null, options);
			return true;
		}
		return false;
	};

})(jQuery, document);
;
String.prototype.trim = function() {
    return this.replace(/^\s+|\s+$/g, "");
};

if (typeof CP === 'undefined') {
    CP = {};
}
CP.runningVars = {
    layoutDirty: true,
    isTouchDevice: false,
    cleanWidth: 0,
    firstLoad: true,
    langDir: ""
};

(function($) {

    CP.agegate = function(isGated, cutoffYear, langDir) {
        CP.runningVars.cutoffYear = cutoffYear;
        CP.runningVars.isGated = isGated;
        CP.runningVars.langDir = langDir;
        $.extend(true, this.options, {});
        this.load();
    };

    CP.agegate.prototype.initListeners = function() {
        var self = this;
        var htmltext = "";
        var hideContinue = false;

        $('#agegate label').live("click", function() {
            if (!$(this).hasClass('option')) {
                $(this).hide();
            }
        });

        $("#agegate input").live("focus", function() {
            //Hide label
            if (!$("label[for='" + $(this).attr('id') + "']").hasClass('option')) {
                $("label[for='" + $(this).attr('id') + "']").hide();
            }
        });

        $("#agegate input").live("blur", function() {
            var value = $(this).val();
            if (value == "") {
                $("label[for='" + $(this).attr('id') + "']").css('display', 'inline-block');
            }
            $("#tip-box").html('');
            $("#tip-box").hide();
        });

        //agegate -- Gated Link Pressed
        $('.agegated-link').live('mousedown', function() {
            CP.runningVars.clickedLink = this;
            CP.runningVars.pendingUrl = $(this).attr("href");
            CP.runningVars.interstitialText = $(this).attr("rel");
            CP.runningVars.interstitialData = $(this).data();
            if (typeof CP.runningVars.interstitialText == 'undefined') {
                CP.runningVars.interstitialText = false;
            }

            CP.runningVars.visitorAge = getCookie('cpvisitor-yob') || null;
            if (!(CP.runningVars.isGated || self.isLinkGated(CP.runningVars.pendingUrl))
                || (CP.runningVars.visitorAge != null && parseInt(CP.runningVars.visitorAge) <= CP.runningVars.cutoffYear)) {

                //show interstitial
                self.showAgegate(function() {

                    $('#modal-window #modal-close').hide();
                    $('#agegate .question').hide();
                    $('#agegate .sorry').hide();
                    if (CP.runningVars.interstitialData) {
                        if (CP.runningVars.interstitialData.interstitial_title) {
                            $('#agegate h3.interstitial').html(CP.runningVars.interstitialData.interstitial_title);
                        }

                        if (CP.runningVars.interstitialData.interstitial_text) {
                            $('#agegate #interstitial').html(CP.runningVars.interstitialData.interstitial_text);
                        }

                        if (CP.runningVars.interstitialData.interstitial_cancel) {
                            $('#agegate #cancel').html(CP.runningVars.interstitialData.interstitial_cancel);
                        }

                        if (CP.runningVars.interstitialData.interstitial_ok) {
                            if (CP.runningVars.interstitialData.interstitial_ok == 'hide') {
                                hideContinue = true;
                            } else {
                                $('#agegate #continue').html(CP.runningVars.interstitialData.interstitial_ok);
                            }
                        }

                        if (CP.runningVars.interstitialData.interstitial_class) {
                            $('#agegate').addClass(CP.runningVars.interstitialData.interstitial_class);
                        }
                    } else if (CP.runningVars.interstitialText) {
                        htmltext = CP.runningVars.interstitialText.split("|");
                        if (htmltext.length >= 2) {
                            $('#agegate h3.interstitial').html(htmltext[0]);
                            $('#agegate #interstitial').html(htmltext[1]);
                            //custom text for cancel button
                            if (htmltext.length >= 3) {
                                $('#agegate #cancel').html(htmltext[2]);
                            }
                            //custom text for ok button
                            if (htmltext.length >= 4) {
                                if (htmltext[3] == 'hide') {
                                    hideContinue = true;
                                } else {
                                    $('#agegate #continue').html(htmltext[3]);
                                }
                            }
                            //add class to the agegate wrapper
                            if (htmltext.length >= 5) {
                                $('#agegate').addClass(htmltext[4]);
                            }
                        }
                    }

                    try {
                        var clickedLinkUrl = CP.runningVars.clickedLink.href.split('/');
                        if (clickedLinkUrl.length > 2) {
                            clickedLinkUrl = clickedLinkUrl[0] + '/' + clickedLinkUrl[1] + '/' + clickedLinkUrl[2];
                        } else {
                            clickedLinkUrl = clickedLinkUrl[0];
                        }
                    } catch (e) {
                        clickedLinkUrl = ""
                    };
                    var newText = $('#interstitial').text().replace('%1', clickedLinkUrl);
                    $('#interstitial').text(newText);

                    $('#agegate .interstitial').show();
                    $('#agegate #cancel').show();
                    if (hideContinue) {
                        $('#agegate #continue').hide();
                    } else {
                        $('#agegate #continue').show();
                    }
                    $('#agegate #submit').hide();
                });
                return false;
            } else {
                //show age gate question
                self.showAgegate(function() {
                    $('#modal-window #modal-close').hide();
                    $('#agegate .question').show();
                    $('#agegate .sorry').hide();
                    $('#agegate .interstitial').hide();
                    $('#agegate #cancel').hide();
                    $('#agegate #continue').hide();
                    $('#agegate #submit').show();
                });
                return false;
            }
        }).live('click', function() {
            return false
        });

        // Age gate -- submit date
        $('#agegate #submit').live('click', function() {

            var month = $('#agegate #edit-month').val();
            var day = $('#agegate #edit-day').val();
            var year = $('#agegate #edit-year').val();
            if (month.length == 0 || month <= 0 || month > 31 //for ease of implementing MM/DD/YYYY and DD/MM/YYYY we just reverse the labels.
                || day.length == 0 || day <= 0 || day > 31 //for ease of implementing MM/DD/YYYY and DD/MM/YYYY we just reverse the labels.
                || year.length == 0 || year <= 1900 || year >= 2100) {
                $('#agegate h3').css({
                    'color': '#f00'
                });
            } else {
                $('#agegate h3').css({
                    'color': '#fff'
                });
                //write cookie
                setCookie('cpvisitor-yob', year, null);
                if (parseInt(year) < parseInt(CP.runningVars.cutoffYear)) {

                    $('#agegate .question').fadeOut(200, function() {
                        if (CP.runningVars.interstitialText) {
                            htmltext = CP.runningVars.interstitialText.split("|");
                            if (htmltext.length >= 2) {
                                $('#agegate h3.interstitial').html(htmltext[0]);
                                $('#agegate #interstitial').html(htmltext[1]);
                            }
                            //custom text for cancel button
                            if (htmltext.length >= 3) {
                                $('#agegate #cancel').html(htmltext[2]);
                            }
                            //custom text for ok button
                            if (htmltext.length >= 4) {
                                $('#agegate #continue').html(htmltext[3]);
                            }
                            //add class to the agegate wrapper
                            if (htmltext.length >= 5) {
                                $('#agegate').addClass(htmltext[4]);
                            }

                        }

                        try {
                            var clickedLinkUrl = CP.runningVars.clickedLink.href.split('/');
                            if (clickedLinkUrl.length > 2) {
                                clickedLinkUrl = clickedLinkUrl[0] + '/' + clickedLinkUrl[1] + '/' + clickedLinkUrl[2];
                            } else {
                                clickedLinkUrl = clickedLinkUrl[0];
                            }
                        } catch (e) {
                            clickedLinkUrl = ""
                        };
                        var newText = $('#interstitial').text().replace('%1', clickedLinkUrl);
                        $('#interstitial').text(newText);

                        $('#agegate .interstitial').fadeIn(200);
                        $('#agegate #submit').hide();
                        $('#agegate #cancel').show();
                        $('#agegate #continue').show();
                    });

                } else {
                    $('#agegate .question').fadeOut(200, function() {
                        $('#agegate .sorry').fadeIn(200);
                        $('#agegate #submit').hide();
                        $('#agegate #cancel').show();
                    });
                }
            }
        });

        // Age gate -- insterstitial answers
        $('#agegate #continue').live('click', function() {
            CP.runningVars.modal.close();
            window.location.href = CP.runningVars.pendingUrl;
        });

        $('#agegate #cancel').live('click', function() {
            CP.runningVars.modal.close();
        });
    };

    CP.agegate.prototype.initLinks = function(selector) {
        selector = selector || 'a';
        //determine external links
        $(selector).each(function(i, link) {
            var isExternal = (link.href.indexOf('clubpenguin.com') < 0 &&
                link.href.indexOf('cpassets-a') < 0 &&
                link.href.indexOf('cpsslassets-a') < 0 &&
                link.href.indexOf('clubpenguin.de') < 0 &&
                link.href.indexOf('clubpenguinimg') < 0 &&
                link.href.indexOf('disneycareers.com') < 0 &&
                link.href.indexOf('disneytermsofuse.com') < 0 &&
                link.href.indexOf('disneyprivacycenter.com') < 0 &&
                link.href.indexOf('clubpenguinoffer.com') < 0 &&
                link.href.indexOf('clubpenguintv.com') < 0 &&
                link.href.indexOf('getclubpenguin.com') < 0 &&
                link.href.indexOf('tryclubpenguin.com') < 0 &&
                link.href.indexOf('www.disneylatino.bumeran.com.ar') < 0 &&
                link.href.indexOf('disney.com') < 0 &&
                link.href.indexOf('localhost') < 0 &&
                link.href.indexOf('cp.local') < 0 &&
                link.href.indexOf('javascript:') < 0 &&
                link.href.indexOf('#nogo') < 0 &&
                link.href.indexOf('mailto:') < 0 &&
                !$(link).hasClass("ui-selectmenu") &&

                link.href.length > 0 &&
                link.href.indexOf('204.') < 0);
            if (isExternal) {
                if (link.href.indexOf("?nochrome=1") < 0) {
                    $(link).addClass('agegated-link');
                    $(link).attr('target', '_blank');
                }
            }

        });
    };
    
    //Is this link age gated for all users (not just specific regions)
    //ie twitter.
    CP.agegate.prototype.isLinkGated = function(href) {
        var isGated = (href.indexOf('twitter.com') >= 0)
        return isGated;
    };

    CP.agegate.prototype.initModal = function() {
        $("#modal-overlay").remove();
        $("#modal-loading").remove();
        $("#modal-window").remove();

        CP.runningVars.modal = new CP.utils.Modal({
            showClose: false,
            contentCloseDelegate: '.modal-close',
            onOpenComplete: function() {},
            onCloseComplete: function() {},
            onCloseStart: function() {},
            onOpenStart: function() {}
        });
    };

    CP.agegate.prototype.showAgegate = function(openCallback, closeCallback) {
        var url = window.location.protocol + "//" + window.location.host + CP.runningVars.langDir + "/geoip/agegate-overlay";
        $('#modal-content').load(url + ' #agegate-wrap', function() {
            //open modal
            if (!closeCallback) closeCallback = null;
            if (!openCallback) openCallback = null;
            CP.runningVars.modal.open('', openCallback, closeCallback);
        });
    };

    CP.agegate.prototype.load = function() {
        var self = this;
        CP.runningVars.visitorAge = getCookie('cpvisitor-yob') || null;
        this.initLinks();
        this.initListeners();
        this.initModal();

        if (window.PIE) {
            $('.base a.button, .menu li a').each(function() {
                PIE.detach(this);
                PIE.attach(this);
            });
        }

        try {
            imgSizer.collate();
        } catch (e) {}
        CP.runningVars.firstLoad = false;
    };

})(window.jQuery);

window.jQuery(document).ready(function() {
    var isGated;
    var cutoffYear;

    //Check if we've already looked up the agegate info?
    isGated = getCookie('cpvisitor-agig') || 'lookup';
    cutoffYear = getCookie('cpvisitor-agcoy') || 'lookup';

    if (isGated == 'lookup') {
        var request = jQuery.ajax({
            type: "POST",
            url: window.location.protocol + "//" + window.location.host + "/geoip/all",
            data: '{}',
            async: false,
            success: function(result) {
                isGated = result.required;
                cutoffYear = result.cutoffYear;
                countryCode = result.countryCode;
            }
        });
        if (isGated == 'lookup') {
            //default to not showing agegate if ajax call failed.
            isGated = false;
            cutoffYear = 2000;
        } else {
            //only set the cookies if the values were actually determined
            setCookie('cpvisitor-agcoy', cutoffYear, null);
            setCookie('cpvisitor-agig', isGated, null);
            setCookie('CP_OVERRIDE_LOCATION', countryCode, 14);
        }

        // Trigger GEO-Target Info Setup
        jQuery(document).trigger('cp.geo:ready',[countryCode]);

    } else {
        // Trigger GEO-Target Info Setup
        var countryCode = getCookie('CP_OVERRIDE_LOCATION');
        jQuery(document).trigger('cp.geo:ready',[countryCode]);   
    }

    var lang = document.documentElement.lang;
    var langDir = "";
    switch (lang) {
        case "de":
            langDir = "/de";
            break;
        case "es":
            langDir = "/es";
            break;
        case "fr":
            langDir = "/fr";
            break;
        case "pt":
            langDir = "/pt";
            break;
        case "ru":
            langDir = "/ru";
            break;
        case "en":
        default:
            langDir = "";
            break;
    }

    if (isGated == "false") isGated = false;
    if (isGated == "true") isGated = true;
    cutoffYear = parseInt(cutoffYear);
    window.agegate = new CP.agegate(isGated, cutoffYear, langDir);
});;
  /* DOL Web Analytics
     Refer to "club_penguin_preprocess_html" for
     data setup of Drupal.settings values
  -----------------------------------------------*/
(function($) {
  var initial_timeout = 10000;

  // Get Analytics Script
  function load_analytics(timeout_value) {
    var dol_analytics_url = Drupal.settings.cp_tracking.protocolBase + '://global.go.com/stat/dolWebAnalytics.js';
    $.ajax({
      url:      dol_analytics_url,
      dataType: 'script',
      cache:    true,
      timeout:  timeout_value
    })
    .done(function(data, textStatus, jqxhr){
      // Successfully loaded
      run_cto();
    })
    .fail(function(jqxhr, textStatus, errorThrown){
      // Failed to load; send BI tracking info
      window.metrics.logError({
        'script':       dol_analytics_url, 
        'error_status': textStatus, 
        'error_thrown': errorThrown,
        'timeout':      timeout_value + 'ms'
      });
      // if script times out after first try, then increase timeout value 1.5 times and try again
      if (textStatus == 'timeout' && timeout_value == initial_timeout) {  
        load_analytics(1.5*initial_timeout);
      }
    });
  }

  // Run DOL Analytics
  function run_cto() {
    cto = new CTO();
    cto.account = Drupal.settings.cp_tracking.ctoAccount;
    cto.category = Drupal.settings.cp_tracking.ctoCategory;
    cto.site = Drupal.settings.cp_tracking.ctoSite;
    if ( Drupal.settings.cp_tracking.section != 'home') {
      cto.siteSection = Drupal.settings.cp_tracking.section;
    }
    cto.pageName = Drupal.settings.cp_tracking.pageName + '_' + Drupal.settings.cp_tracking.langPath;
    cto.contentType = Drupal.settings.cp_tracking.qs;
    cto.property = Drupal.settings.cp_tracking.ctoProperty;
    cto.track(); //Required. Do not remove.
  };

  // On document ready, ajax load DOL Analytics and run our tracking
  $(function() {
    load_analytics(initial_timeout);
  });

})(jQuery);
;
