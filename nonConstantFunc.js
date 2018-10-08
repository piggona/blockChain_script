const ethers = require('ethers');

// 设定abi接口
let abi = [
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

// 建立一个wallet对象
let provider = ethers.getDefaultProvider('ropsten');
let secretKey = "81871A13B79CF60BF8D1D263BAD6B4B6951DC7BCA60ABF09270D2DB2BD6FA60C";
let wallet = new wallet(secretKey,provider);

// 合约部署的地址
let contractAddress = "0x570632c529416764f5e622c90f89c36d5963d702";

// 使用钱包对象建立的Contract对象具有读写权限
let contract = new ethers.Contract(contractAddress, abi, wallet);

// 进行对nonConstantFunc的操作
let tx = await contract.repayment_suc();

console.log(tx.hash);

await tx.wait();

let currentBalance = await contract.getBalance();

console.log(currentBalance);