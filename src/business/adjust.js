export default {
    isMobile: function() {
        var userAgent = process.BROWSER ? navigator.userAgent : process.UA;
        return !!userAgent.match(/(iPhone|iPod|Android|ios)/i);
    },
    linkTarget : function() {
        return this.isMobile() ? '' : '_blank';
    }
}