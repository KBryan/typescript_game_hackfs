const HDWalletProvider = require('@truffle/hdwallet-provider')
const infuraKey = '6be8c39a38ef47a98841f7fed4e61fcb'
// 0x5F3313814F7FB3E11C4a240141689BA9933c5607
module.exports = {
  networks: {
    rinkeby: {
      provider: () =>
          new HDWalletProvider({
            mnemonic: {
              phrase: process.env.MNEMONIC_2
            },
            providerOrUrl: "https://rinkeby.infura.io/v3/" + infuraKey,
            numberOfAddresses: 1,
            shareNonce: true,
          }),
      network_id: '4',
    },
    mainnet: {
      provider: () => {
        return new HDWalletProvider(process.env.MAINNET_MNEMONIC, process.env.MAINNET_RPC_URL)
      },
      network_id: '1',
      skipDryRun: true,
    },
  },
  compilers: {
    solc: {
      version: '0.6.6',
    },
  },
  api_keys: {
    etherscan: process.env.ETHERSCAN_API_KEY
  },
  plugins: [
    'truffle-plugin-verify'
  ]
}
