<template>
    <div class="wallet">
        <h2>以太坊钱包</h2>
        <input type="submit" class="submit" value="创建" @click="call()">
        <br>
        <foot></foot>
    </div>
</template>
<script>
import foot from "../components/foot.vue";
import Vue from 'vue';
import adjust from "../business/adjust.js";
import Web3 from 'web3';
import ABI from 'ethereumjs-abi';
import EthereumTx from 'ethereumjs-tx';
import footmarkABI from '../sols/FootmarkABI';
import util from 'ethjs-util';

export default {
    components: {
        foot
    },
    data: function() {
        return {
            
        };
    },
    preFetch: function(store) {
        var header = {
            title: "以太坊钱包",
            desc: "以太坊钱包"
        }
        store.dispatch("header", header);
    },
    computed: {
        mobile: function() {
            return adjust.isMobile();
        }
    },
    mounted: function() {
        
    },
    methods: {
        bufferFrom: function(v) {
            if (!Buffer.isBuffer(v)) {
                if (Array.isArray(v)) {
                    v = Buffer.from(v)
                } else if (typeof v === 'string') {
                    if (util.isHexString(v)) {
                        v = Buffer.from(util.padToEven(util.stripHexPrefix(v)), 'hex')
                    } else {
                        v = Buffer.from(v)
                    }
                } else if (typeof v === 'number') {
                    v = util.intToBuffer(v)
                } else if (v === null || v === undefined) {
                    v = Buffer.allocUnsafe(0)
                } else if (BN.isBN(v)) {
                    v = v.toArrayLike(Buffer)
                } else if (v.toArray) {
                    // converts a BN to a Buffer
                    v = Buffer.from(v.toArray())
                } else {
                    throw new Error('invalid type')
                }
            }
            return v
        },
        call: function() {
            if (typeof web3 !== 'undefined') {
                //web3 = new Web3(web3.currentProvider);
            } else {
                web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
            }
            var from = "0x262bAB6a90Aa1741390c4A3Ec58855C81d9728E1";
            var to = "0xc59565465f95Cd80E7317dd5a03929E6900090Ff";

            var encodedData = ABI.simpleEncode("lookupTo(address):(uint256,string)", '0x5902598Fc6c9C85BeC8452f9BA3fca2F8b226a1b');

            var txObj = {
                from : from,
                to : to,
                data : '0x' + encodedData.toString('hex')
            }

            console.log(txObj);
            web3.eth.call(txObj, (error, data) => {
                if(error) {
                    console.log(error);
                }else {
                    var decodeData = ABI.rawDecode(['uint256', 'string'],this.bufferFrom(data));
                    console.log(data);
                    console.log(decodeData);
                }
            });
        }
    }
};
</script>
<style lang="sass">
.wallet {
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
    .lbl {
        display: block;
        font-size: 12px;
        color: #2aa198;
        height: 30px;
        line-height: 30px;
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
