<template>
    <div class="contract">
        <h2>留言合约</h2>
        <br>
        <span class="tips">留言给其他人</span>
        <input class="input" v-model="messageTo" placeholder="给谁留言">
        <input class="input" v-model="messageContent" placeholder="留言内容">
        <input type="submit" class="submit" value="留言" @click="leaveMessageTo()">
        <div class="split"></div>
        <span class="tips">查询给其他人的留言</span>
        <input class="input" v-model="lookupMessageTo" placeholder="给谁留过言">
        <input type="submit" class="submit" value="查询" @click="getMessageTo()">
        <div class="split"></div>
        <span class="tips">查询其他人给我的留言</span>
        <input class="input" v-model="lookupMessageFrom" placeholder="来自谁的留言">
        <input type="submit" class="submit" value="查询" @click="getMessageFrom()">
        <div class="split"></div>
        <foot></foot>
    </div>
</template>
<script>
import foot from "../components/foot.vue";
import Vue from 'vue';
import adjust from "../business/adjust.js";
import footmarkABI from '../sols/FootmarkABI';
export default {
    components: {
        foot
    },
    data: function() {
        return {
            account: '',
            messageTo: '',
            messageContent: '',
            lookupMessageTo: '',
            lookupMessageFrom: '',
            contractInstance: null,
            contractAddress: '0xc59565465f95Cd80E7317dd5a03929E6900090Ff'
        };
    },
    preFetch: function(store) {
        var header = {
            title: "合约",
            desc: "合约"
        }
        store.dispatch("header", header);
    },
    computed: {
        mobile: function() {
            return adjust.isMobile();
        }
    },
    mounted: function() {
        if(process.BROWSER) {
            if (typeof web3 === "undefined") {
                alert('未检测到Web3环境，请使用集成以太坊钱包的浏览器查看');
                return;
            }

            // 实例化合约
            if(!this.contractInstance) {
                var contract = web3.eth.contract(footmarkABI);
                this.contractInstance = contract.at(this.contractAddress);
            }

            // 获取当前账户
            this.getAccount();
        }
    },
    methods: {
        getAccount() {
            web3.eth.getAccounts((error, accounts) => {
                if (!error) {
                    this.account = accounts[0];
                }
            });
        },
       leaveMessageTo() {
           this.contractInstance.leaveMessage(this.messageContent, this.messageTo, {from: self.account}, (error, result) => {
               if (!error) {
                    var event = this.contractInstance.LeaveMessage((eerror, eresult) => {
                       event.stopWatching();
                       alert("留言成功！");
                    });
               }else {
                   alert("留言失败！");
               }
           });
           alert("交易签发，静等回复。。。");
       },
       getMessageFrom() {
           this.contractInstance.lookupFrom(this.lookupMessageFrom, {from: self.account}, (error, result) => {
               let time = result[0].toNumber() * 1000;
               let msg =  result[1];
               let date = new Date(time);
               if (time > 0) {
                   alert(date.toLocaleDateString() + ' ' + date.toLocaleTimeString() + '\n' + result[1]); 
               }else {
                   alert("未查询到留言！");
               }
           });
       },
       getMessageTo() {
           this.contractInstance.lookupTo(this.lookupMessageTo, {from: self.account}, (error, result) => {
               let time = result[0].toNumber() * 1000;
               let msg =  result[1];
               let date = new Date(time);
               if (time > 0) {
                   alert(date.toLocaleDateString() + ' ' + date.toLocaleTimeString() + '\n' + result[1]);
               }else {
                   alert("未查询到留言！");
               }
           });
       }
    }
};
</script>
<style lang="sass">
.contract {
    padding: 0px 40px;
    h2 {
        font-size: 40px;
    }
    input {
        -webkit-appearance: none;
        &:focus {
            outline-width: 0;
        }
        border-width: 0px;
        box-shadow: 0 0 0 1px #DFDFDF;
        border-radius: 4px;
    }
   
    .tips {
        display: block;
        font-size: 16px;
        color: #343434;
        margin-bottom: 10px;
    }
    .input {
        height: 30px;
        line-height: 30px;
        font-size: 14px;
        color: #343434;
        padding: 0px 10px;
        width: 360px;
    }
    .submit {
        height: 30px;
        line-height: 30px;
        background-color: #ff5a5f;
        box-shadow: 0 0 0 1px #ff5a5f;
        font-size: 14px;
        color: #fff;
        width: 80px;
        font-weight: bold;
    }
    .split {
        height: 1px;
        margin: 40px 0px;
        background-color: #fff;
    }
}
</style>
