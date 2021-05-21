# Curve Gas Analysis

This contract analyses the gas costs for the curve VoteEscrow contract

## How to run

1. Start a local ganache server, with gas limit to 15,000,000 `ganache-cli -f https://eth-mainnet.alchemyapi.io/v2/<Alchemy_API> -l 15000000`
2. Run the `gasLimits.js` scripts `npx hardhat run scripts/gasLimits.js --network local`

