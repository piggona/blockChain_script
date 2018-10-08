/**
 * Created by lwp on 2018/9/12.
 */
var Web3 = require('web3');
var abi = require('ethereumjs-abi')
// Tx = require('ethereumjs-tx');
abi = [
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"name": "lender",
				"type": "address"
			},
			{
				"indexed": false,
				"name": "require_repayment_time",
				"type": "uint256"
			}
		],
		"name": "Repayment_notify",
		"type": "event"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "set_time",
				"type": "uint256"
			},
			{
				"name": "set_repayment",
				"type": "uint256"
			}
		],
		"name": "add_loan",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "set_deadline",
				"type": "uint256"
			}
		],
		"name": "deadline_set",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [],
		"name": "repayment",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [],
		"name": "repayment_fail",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [],
		"name": "repayment_suc",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"name": "lender",
				"type": "address"
			},
			{
				"indexed": false,
				"name": "need_balance",
				"type": "uint256"
			}
		],
		"name": "Transaction_accomplished",
		"type": "event"
	},
	{
		"inputs": [
			{
				"name": "set_time_tactics_addr",
				"type": "address"
			},
			{
				"name": "set_repay_tactics_addr",
				"type": "address"
			},
			{
				"name": "set_fail_tactics_addr",
				"type": "address"
			},
			{
				"name": "set_lender_addr",
				"type": "address"
			},
			{
				"name": "set_pool_addr",
				"type": "address"
			},
			{
				"name": "set_controller_addr",
				"type": "address"
			},
			{
				"name": "set_balance",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"payable": true,
		"stateMutability": "payable",
		"type": "fallback"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "get_balance",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "get_deadline",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "get_lender_addr",
		"outputs": [
			{
				"name": "",
				"type": "address"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "get_require_payment",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "get_require_payment_time",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "get_state_accomplish",
		"outputs": [
			{
				"name": "",
				"type": "bool"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "get_state_failed",
		"outputs": [
			{
				"name": "",
				"type": "bool"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "get_state_repayment_ack",
		"outputs": [
			{
				"name": "",
				"type": "bool"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "get_state_transaction_accomplish",
		"outputs": [
			{
				"name": "",
				"type": "bool"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "get_total_balance",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	}
];
if (typeof web3 !== 'undefined') {
    web3 = new Web3(web3.currentProvider);
} else {
    // set the provider you want from Web3.providers
    var providers = 'https://ropsten.infura.io/v3/f44c78dae1d04a2593abc0e5f8ef528a';
    web3 = new Web3(new Web3.providers.HttpProvider(providers));
}
var privateKey = 'FFA07289FE8F57739521CC1FAFB082BFA1E5C3CDC16E4DAB0C7D95596FEDD9A4';
var controller_addr = '0xF7eDF7C6Bd28d9f0ea21c5e3e1dC15161ed8898E';
var contract_addr = '0x36dE9bfbf9fBB2b1831D710b1267C02bC2fac127';   //合约地址
// var contract_hash = '0x9d4438965a601b7e7d20f3653f45ab69ba2b74fc74657833def62cef58629992';
web3.eth.defaultAccount = controller_addr; 

function addPreZero(num){
	var t = (num+'').length,
	s = '';
	for(var i=0; i<64-t; i++){
	  s += '0';
	}
	return s+num;
}


var Tx = require('ethereumjs-tx');
var privateKey = new Buffer.from(privateKey, 'hex')




web3.eth.getTransactionCount(controller_addr, function(error, nonceNum){
	console.log(nonceNum);
	myContract = new web3.eth.Contract(abi, contract_addr);
	encodeABI = myContract.methods.repayment_suc().encodeABI();
	console.log(encodeABI);
	var rawTx = {
		// from: controller_addr,
		nonce: nonceNum+3,
		to: contract_addr,
		gasLimit: web3.utils.toHex(990000),   
		gasPrice: web3.utils.toHex(10e8),
		data: encodeABI
	}
	var tx = new Tx(rawTx);
	tx.sign(privateKey);
	var serializedTx = tx.serialize();
	web3.eth.sendSignedTransaction('0x' + serializedTx.toString('hex'))
	// web3.eth.sendTransaction(rawTx)
	// .catch(function(error) {
	// 	console.log(error);
	// })
	.on('transactionHash', function(hash){
		console.log('hash'+hash);
	})
	.on('receipt', function(receipt){
		console.log('receipt');
		console.log(receipt);
	})
	.on('confirmation', function(confirmationNumber, receipt){
		console.log('confirmation');
		console.log(confirmationNumber);
		console.log(receipt);
	})
	.on('error', console.error);
	
	// , function(err, data) {
	// 	if(err){
	// 		console.log('错误：'+err);
	// 	}else{
	// 		console.log(data);
	// 	}
	// });
});