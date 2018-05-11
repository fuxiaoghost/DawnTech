<template>
    <div class="key">
        <h2>以太坊钱包签名</h2>
        <br>
        <span class="tips">生成账户</span>
        <span class="lbl">私钥：{{account.privateKey}}</span>
        <span class="lbl">公钥：{{account.publicKey}}</span>
        <span class="lbl">地址：{{account.address}}</span>
        <input type="submit" class="submit" value="创建" @click="createAccount()">
        <div class="split"></div>
        <input class="input" v-model="import_privateKey" placeholder="私钥">
        <input type="submit" class="submit" value="导入" @click="importAccount()">
        <span class="lbl">公钥：{{import_publicKey}}</span>
        <span class="lbl">地址：{{import_address}}</span>
        <div class="split"></div>
        <input class="input" v-model="sign_privateKey" placeholder="私钥">
        <input class="input" v-model="sign_data" placeholder="待签名数据">
        <input type="submit" class="submit" value="签名" @click="signData()">
        <span class="lbl">r：{{signature.r}}</span>
        <span class="lbl">s：{{signature.s}}</span>
        <span class="lbl">v：{{signature.v}}</span>
        <div class="split"></div>
        <input class="input" v-model="recovery_r" placeholder="r">
        <input class="input" v-model="recovery_s" placeholder="s">
        <input class="input" v-model="recovery_v" placeholder="v">
        <input class="input" v-model="recovery_data" placeholder="待签名数据">
        <input type="submit" class="submit" value="恢复公钥" @click="recoverPublicKey()">
        <span class="lbl">公钥：{{recovery_pubkey}}</span>
        <foot></foot>
    </div>
</template>
<script>
import foot from "../components/foot.vue";
import Vue from 'vue';
import adjust from "../business/adjust.js";
import { randomBytes } from 'crypto';
import secp256k1 from 'secp256k1';
import createKeccakHash from 'keccak';
import util from 'ethjs-util';
import BN from 'bn.js';
import EthereumTx from 'ethereumjs-tx';

export default {
    components: {
        foot
    },
    data: function() {
        return {
            account: {
                privateKey: "", 
                publicKey: "",
                address: ""
            },
            import_privateKey: "",
            import_publicKey: "",
            import_address: "",
            sign_privateKey: "",
            sign_data:"",
            signature: {
                r: "",
                s: "",
                v: ""
            },
            recovery_r: "",
            recovery_s: "",
            recovery_v: "",
            recovery_data: "",
            recovery_pubkey: ""
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
        if(process.BROWSER) {
            this.createAccount();
        }
    },
    methods: {
        /**
         * 私钥：secp256k1(ECDSA)生成私钥(256 bits 随机数/32位)
         */
        generatePrivateKey:function() {
            var privateKey = null;
            do {
                privateKey = randomBytes(32)

            } while (!secp256k1.privateKeyVerify(privateKey));
            return privateKey;
        },

        /**
         * secp256k1(ECDSA)通过私钥生成公钥
         * @param {string} privateKey 私钥
         * @param {boolean} compressed 是否为压缩格式
         */
        generatePublicKey:function(privateKey, compressed = false) {
            let publicKey = secp256k1.publicKeyCreate(privateKey, compressed);
            return publicKey;
        },

        /**
         * 地址：公钥的keccak256编码的后20字节，16进制编码的字符串
         * @param {string} publicKey 公钥
         */
        generateAddress:function(publicKey) {
            return createKeccakHash('keccak256').update(publicKey.slice(1)).digest('hex').slice(-40);
        },

        /**
         * 导入16进制编码的私钥 
         * @param {string} hexString 16进制编码的私钥
         */
        loadPrivateKeyFromHexString:function(hexString) {
            if(!hexString) {
                return null;
            }
            if (hexString.length != 64) {
                return null;
            }
            
            if (hexString.slice(0, 2) == '0x') {
                hexString = hexString.slice(2);
            }
            
            return new Buffer(hexString, 'hex')
        },

        /**
         * 各种类型数据转buffer
         * @param {*} v 数据
         */
        bufferFrom:function(v) {
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

        /**
         * secp256k1数据签名
         * @param {*} msg 需要签名的数据
         * @param {Buffer} privateKeyBuffer 私钥Buffer
         */
        sign:function(msg, privateKeyBuffer) {
            if (!secp256k1.privateKeyVerify(privateKeyBuffer)) {
                console.log("Invalid private key！");
                return null;
            }
            // 生成需要签名数据的keccak256哈希
            let hash = createKeccakHash('keccak256').update(msg).digest();
            let sig = secp256k1.sign(hash, privateKeyBuffer);
            console.log(hash);
            let ret = {};
            // 分离签名得到r,s,v
            ret.r = sig.signature.slice(0, 32);
            ret.s = sig.signature.slice(32, 64);
            ret.v = sig.recovery;
            return ret;
        },
        /**
         * 通过签名和原始数据恢复公钥
         * @param {*} r signature[0-32)
         * @param {*} s signature(32,64]
         * @param {*} v recovery(0 or 1)
         * @param {*} msg 原始数据
         */
        recovery:function(r, s, v, msg) {
            let signature = Buffer.concat([this.bufferFrom(r), this.bufferFrom(s)], 64)
            let recovery = v;
            if (recovery !== 0 && recovery !== 1) {
                throw new Error('Invalid signature v value')
            }
            
            let hash = createKeccakHash('keccak256').update(msg).digest();
            console.log(hash);
            let senderPubKey = secp256k1.recover(hash, signature, recovery);
            return secp256k1.publicKeyConvert(senderPubKey, false);
        },

        /**
         * 
         * @param {*} msg 原始数据
         * @param {*} r signature[0-32)
         * @param {*} s signature(32,64]
         * @param {*} pubKeyBuffer 公钥
         */
        verify:function(msg, r, s, pubKeyBuffer) {
            let signature = Buffer.concat([bufferFrom(r), bufferFrom(s)], 64)
            let hash = createKeccakHash('keccak256').update(msg).digest();
            return secp256k1.verify(hash, signature, pubKeyBuffer);
        },

        /**
         * 拼接签名
         * @param {Object} ret 
         */
        signBuffer: function(ret) {
            return Buffer.concat([
                bufferFrom(ret.r),
                bufferFrom(ret.s),
                bufferFrom(ret.v)
            ]);
        },

        /**
         * 交易签名并序列化
         * @param {Buffer} privateKeyBuffer 私钥
         * @param {Object} txParams 交易结构体
         */
        signTx: function(privateKeyBuffer, txParams) {
            const tx = new EthereumTx(txParams);
            tx.sign(privateKey);
            const serializedTx = tx.serialize();
            return serializedTx;
        },
        createAccount: function() {
            let privateKey = this.generatePrivateKey();
            let publicKey = this.generatePublicKey(privateKey);
            this.account.privateKey = privateKey.toString('hex');
            this.account.publicKey = publicKey.toString('hex');
            this.account.address = this.generateAddress(publicKey);
        },
        importAccount: function() {
            let privateKey = this.loadPrivateKeyFromHexString(this.import_privateKey);
            if(privateKey && secp256k1.privateKeyVerify(privateKey)) {
                let publicKey = this.generatePublicKey(privateKey);
                this.import_publicKey = publicKey.toString('hex');
                this.import_address = this.generateAddress(publicKey);
            }else {
                alert("无效私钥！！！");
            }
        },
        signData: function() {
            let privateKey = this.loadPrivateKeyFromHexString(this.sign_privateKey);
            if(privateKey && secp256k1.privateKeyVerify(privateKey)) {
                let msg = this.sign_data;
                if(msg.length) {
                    let signRet = this.sign(msg, privateKey);
                    this.signature.r = '0x' + signRet.r.toString('hex');
                    this.signature.s = '0x' + signRet.s.toString('hex');
                    this.signature.v = signRet.v.toString();
                }else {
                    alert("无效数据！！！");
                }
            }else {
                alert("无效私钥！！！");
            }
        },
        recoverPublicKey: function() {
            if(this.recovery_data.length && this.recovery_r.length && this.recovery_s.length && this.recovery_v.length) {
                this.recovery_pubkey = this.recovery(this.recovery_r, this.recovery_s, parseInt(this.recovery_v), this.recovery_data).toString('hex');
            }else {
                alert("无效数据！！！");
            }
        }
    }
};
</script>
<style lang="sass">
.key {
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
