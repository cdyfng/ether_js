const Web3 = require("web3");
const TOKEN_ABI = require("./Basic").abi;

function watchTokenTransfers() {
  // Instantiate web3 with WebSocketProvider
  const web3 = new Web3(
    new Web3.providers.WebsocketProvider(
      "wss://mainnet.infura.io/ws/v3/" + process.env.INFURA_API_KEY
    )
  );

  // Instantiate token contract object with JSON ABI and address
  console.log("Address:", process.env.TOKEN_CONTRACT_ADDRESS);
  const tokenContract = new web3.eth.Contract(
    TOKEN_ABI,
    process.env.TOKEN_CONTRACT_ADDRESS,
    (error, result) => {
      if (error) console.log(error);
    }
  );

  // Generate filter options
  const options = {
    fromBlock: "10000000",
  };

  // Subscribe to Transfer events matching filter criteria
  tokenContract.events.Transfer(options, async (error, event) => {
    if (error) {
      console.log(error);
      return;
    }

    console.log(
      "Found incoming transaction from " +
        event.returnValues.from +
        " to " +
        event.returnValues.to +
        " ",
      event.returnValues.value / 10 ** 18 + "\n"
    );
    console.log("Transaction event is: " + JSON.stringify(event) + "\n");
    return;
  });
}

watchTokenTransfers();
