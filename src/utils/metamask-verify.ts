import { ethers } from 'ethers';

export async function verifySignature(address: string, signature: string): Promise<boolean> {
  const message = "Sign this message to authenticate";
  try {
    const signerAddr = ethers.utils.verifyMessage(message, signature);
    return signerAddr.toLowerCase() === address.toLowerCase();
  } catch (err) {
    console.error("Signature verification failed:", err);
    return false;
  }
}
