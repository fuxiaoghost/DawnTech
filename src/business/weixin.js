export default {
    wxShare:function(title, desc, imageUrl, http) {
        var href = encodeURIComponent(location.href); 
        var url = '/api/signature?url=' + href; 
        var self = this; 
        http.get(url).then(function (resp) {
            if (resp && resp.body) {
                wx.config( {
                    appId:resp.body.appid, 
                    nonceStr:resp.body.nonceStr, 
                    timestamp:resp.body.timestamp, 
                    signature:resp.body.signature, 
                    jsApiList:["onMenuShareTimeline", "onMenuShareAppMessage"]
                }); 
                wx.ready(function () {
                    wx.onMenuShareAppMessage( {
                        title:title, 
                        desc:desc, 
                        link:location.href, 
                        imgUrl:imageUrl
                    }); 
                    wx.onMenuShareTimeline( {
                        title:title, 
                        link:location.href, 
                        imgUrl:imageUrl
                    }); 
                }); 
            }
        }, function () {
    
        }); 
    }   
}