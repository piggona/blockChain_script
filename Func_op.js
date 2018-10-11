const ethers = require('ethers');
var fs = require('fs');
var argv = require('yargs')
.option('provider',{
	demand: true,
	default: "ropsten",
	describe: "使用的provider"
})
.option('func',{
	demand: true,
	default: "get_balance",
	describe: "function"
})
.option('ca',{
	alias: 'contractAddress',
	demand: true,
	default: "0x052c93427940ca9cde87920cd61bae31900bc64e",
	describe: "contractAddress"
})
.argv;

// 配置获取
var fetchResult;
let file="./config.json";
let contractAddress = argv.contractAddress;
let params = argv._;
let func_str = argv.func;
let jsonData = JSON.parse(fs.readFileSync(file));
let abi = jsonData.abi;

// 建立一个wallet对象
let provider = ethers.getDefaultProvider(argv.provider);
let secretKey = jsonData.privateKey;
let wallet = new ethers.Wallet(secretKey,provider);

//获取当前账户余额
let balancePromise = wallet.getBalance();
balancePromise.then((balance) => {
	console.log("当前账户余额:"+parseInt(balance));
});

// 使用钱包对象建立的Contract对象具有读写权限
let contract = new ethers.Contract(contractAddress, abi, provider);
let contractWithSigner =contract.connect(wallet);

// 构造操作语句
let op_str = "contractWithSigner."+func_str+"(";
console.log("输入的参数"+params);
if(params.length == 0){
	op_str = op_str+")";
}
else{
	for(let j = 0; j < arr.length-1; j++) {
		op_str = op_str + arr[j] + ",";
	} 
	op_str = op_str + arr[arr.length-1] + ")";
}
console.log("即将运行的操作语句"+op_str);


// 运行
let tx = eval(op_str);
tx.then((result) => {
	console.log(result);
	console.log("balance为："+parseInt(result));
	fetchResult = parseInt(result);
}).catch((err) => {
	console.log(err);
});

console.log("返回结果"+fetchResult);