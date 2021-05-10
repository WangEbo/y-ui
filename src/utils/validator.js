const cardNumReg = /(^(\d{6})(18|19|20)?(\d{2})([01]\d)([0123]\d)(\d{3})(\d|X)$)/
const phoneReg = /(^(13[0-9]|14[579]|15[0-3,5-9]|17[0135678]|18[0-9]|19[0-9])\\d{8}$)/

const isCardNum = (val)=> {
    return val.match(cardNumReg)
}

const isPhoneNum = (val)=> {
    return phoneReg.test(val)
}

const isRequired = (val, rule)=>{
    if(typeof val === 'string'){
        let temp = val;
        if(rule.trim){
            temp.trim();
        }
        return temp.length
    }
    if(typeof val === 'object'){
        if(Array.isArray(val) && val instanceof Array){
            return val.length
        }else{
            return Object.keys(val).length
        }
    }
    return val !== undefined && val !== null
}

const maxLimit = (val, rule)=>{
    if(val){
        return val && val.length <= rule.max
    }
}

const minLimit = (val, rule)=>{
    if(val){
        return val && val.length >= rule.max
    }
}
export default {
    helpReg:{
        cardNumReg,
        phoneReg
    },
    isCardNum,
    isPhoneNum,
    isRequired,
}