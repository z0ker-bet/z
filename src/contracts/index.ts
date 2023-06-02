import BlackJack from "./blackjack/blackjack.json";

export const CHAINS_TYPE = import.meta.env.VITE_CHAINS_TYPE || "TESTNET";

type AddressTypes = {
  BLACKJACK_ADDRESS: `0x${string}`;
  CHAIN_ID: number;
  EXPLORER_TX_URL: string;
  SYMBOL: string;
};
export const ADDRESS_DATA: Record<string, AddressTypes> = {
  MAINNET: {
    // BLACKJACK_ADDRESS: "0x76e01e343b28bd7342a395e23bc5b2a095466760", // old
    BLACKJACK_ADDRESS: "0x625a32b990cb4cc623bac6beda97f0f5a161bb9f",
    CHAIN_ID: 361,
    EXPLORER_TX_URL: "https://explorer.thetatoken.org",
    SYMBOL: "TFUEL"
  },
  TESTNET: {
    // BLACKJACK_ADDRESS: "0x76e01e343b28bd7342a395e23bc5b2a095466760", // old
    BLACKJACK_ADDRESS: "0x625a32b990cb4cc623bac6beda97f0f5a161bb9f",
    CHAIN_ID: 365,
    EXPLORER_TX_URL: "https://testnet-explorer.thetatoken.org",
    SYMBOL: "TFUEL",
  },
};

export const {
  BLACKJACK_ADDRESS,
  CHAIN_ID,
  EXPLORER_TX_URL,
  SYMBOL,
}: AddressTypes = ADDRESS_DATA[CHAINS_TYPE] || ADDRESS_DATA.TESTNET;

export const BLACKJACK_ABI = [...BlackJack.abi]  as const;
