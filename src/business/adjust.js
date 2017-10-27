export default {
    isMobile: function() {
        return !!navigator.userAgent.match(/(iPhone|iPod|Android|ios)/i);
    },
    linkTarget : function() {
        return this.isMobile() ? '' : '_blank';
    }
}