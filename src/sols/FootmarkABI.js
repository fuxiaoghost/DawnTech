let footmarkABI = [
	{
		"constant": false,
		"inputs": [
			{
				"name": "text",
				"type": "string"
			}
		],
		"name": "enter",
		"outputs": [
			{
				"name": "time",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "text",
				"type": "string"
			},
			{
				"name": "to",
				"type": "address"
			}
		],
		"name": "leaveMessage",
		"outputs": [
			{
				"name": "time",
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
				"indexed": true,
				"name": "from",
				"type": "address"
			},
			{
				"indexed": true,
				"name": "to",
				"type": "address"
			},
			{
				"indexed": false,
				"name": "text",
				"type": "string"
			}
		],
		"name": "LeaveMessage",
		"type": "event"
	},
	{
		"inputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "from",
				"type": "address"
			}
		],
		"name": "lookupFrom",
		"outputs": [
			{
				"name": "time",
				"type": "uint256"
			},
			{
				"name": "text",
				"type": "string"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "to",
				"type": "address"
			}
		],
		"name": "lookupTo",
		"outputs": [
			{
				"name": "time",
				"type": "uint256"
			},
			{
				"name": "text",
				"type": "string"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	}
];
export default footmarkABI;