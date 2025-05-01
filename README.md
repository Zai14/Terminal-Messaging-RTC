# 📡 WebRTC Messaging with MetaMask Authentication

A TypeScript-based, peer-to-peer messaging system using WebRTC and Ethereum MetaMask addresses for identity verification.  
This project allows two users to chat securely over WebRTC, using MetaMask signatures to verify Ethereum addresses.

---

## 🚀 Features

- 🔐 **MetaMask Authentication** – Sign a message to prove address ownership
- 💬 **Peer-to-Peer Messaging** – Uses WebRTC DataChannels for fast, direct communication
- 📡 **Custom Signaling Server** – WebSocket-based server for exchanging offers/answers and ICE candidates
- 🔁 **Auto-Reconnect Logic** – Resilient signaling client for stable connections
- 🔧 **TypeScript + ESM Support** – Modern, clean codebase with strict typing and module support
- 📟 **CLI Interface** – Simple command-line chat experience with status logs

---

## 📦 Installation

1. **Clone the Repository**

```bash
git clone https://github.com/your-username/webrtc-messaging.git
cd webrtc-messaging
```
## Install Dependencies

```bash
npm install
```
## 🛠️ Usage
1. Start the Signaling Server
```bash
npm run start-server
```
**This will launch the WebSocket-based signaling server on ws://localhost:8080.**

## 2. Start the WebRTC Client (in two terminals)
```bash

npm run start-client
```
**Each user must sign in with MetaMask to generate a valid Ethereum signature.**

**Enter the peer’s Ethereum address when prompted to connect.**

## 📝 MetaMask Authentication
**On startup, the client will prompt for MetaMask signature to authenticate.**

**This helps verify the user's identity via their Ethereum address.**

**No transaction is sent – only a signed message is used for verification.**
## 🔐 Security Notes
**No messages or private keys are stored.**

**This is a prototype and not production-ready for handling private communication.**

## 🧪 Tested On
****Node.js v20+****

****MetaMask Extension****

****Windows 10 / WSL2****

## 📃 License
**MIT License. Feel free to use, modify, and contribute!**

## ✨ Acknowledgments
**Inspired by WebRTC and Ethereum ecosystem projects. Built by Zaid Shabir.**
