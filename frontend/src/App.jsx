import { useState, useEffect } from "react";
import { ethers } from "ethers";

const CONTRACT_ADDRESS = "0xYourDeployedContractAddress"; // Replace later

export default function App() {
  const [walletAddress, setWalletAddress] = useState("");
  const [isVerified, setIsVerified] = useState(false);
  const [ticketCount, setTicketCount] = useState(1);

  useEffect(() => {
    if (window.ethereum) {
      window.ethereum.request({ method: "eth_accounts" }).then(accounts => {
        if (accounts.length > 0) setWalletAddress(accounts[0]);
      });
    }
  }, []);

  const connectWallet = async () => {
    const [address] = await window.ethereum.request({ method: "eth_requestAccounts" });
    setWalletAddress(address);
  };

  const mockVerifyWorldcoin = () => {
    setIsVerified(true);
    setTicketCount(2);
  };

  const buyTicket = async () => {
    alert(`Buying ${ticketCount} ticket(s) as ${isVerified ? "verified" : "unverified"} user`);
    // This will be replaced by contract interaction later
  };

  return (
    <div style={{ padding: "2rem", fontFamily: "sans-serif" }}>
      <h1>Buy Tickets</h1>
      <p>Wallet: {walletAddress || "Not connected"}</p>
      <button onClick={connectWallet}>Connect Wallet</button>
      <div style={{ marginTop: "1rem" }}>
        <button onClick={mockVerifyWorldcoin}>Verify with Worldcoin (Mock)</button>
      </div>
      <div style={{ marginTop: "1rem" }}>
        <label>Ticket Count:</label>
        <input
          type="number"
          min="1"
          max={isVerified ? 2 : 1}
          value={ticketCount}
          onChange={(e) => setTicketCount(Number(e.target.value))}
          style={{ marginLeft: "0.5rem", width: "3rem" }}
        />
      </div>
      <div style={{ marginTop: "1rem" }}>
        <button onClick={buyTicket}>Buy Ticket(s)</button>
      </div>
    </div>
  );
}
