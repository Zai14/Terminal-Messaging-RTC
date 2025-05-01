import WebSocket from 'ws';
import * as wrtc from 'wrtc';
import * as readline from 'readline';

const myId = process.argv[2];
const remoteId = process.argv[3];
const signalingUrl = 'ws://localhost:8080';

if (!myId || !remoteId) {
  console.log("Usage: ts-node src/webrtc-client.ts <your_eth_address> <receiver_eth_address>");
  process.exit(1);
}

const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
const ws = new WebSocket(signalingUrl);
const peer = new wrtc.RTCPeerConnection();
let dataChannel: any;

ws.on('open', () => {
  ws.send(JSON.stringify({ type: 'register', id: myId }));
});

ws.on('message', async (msg) => {
  const data = JSON.parse(msg.toString());

  if (data.signal.type === 'offer') {
    await peer.setRemoteDescription(new wrtc.RTCSessionDescription(data.signal));
    const answer = await peer.createAnswer();
    await peer.setLocalDescription(answer);
    ws.send(JSON.stringify({ type: 'signal', to: data.from, signal: peer.localDescription }));
  } else if (data.signal.type === 'answer') {
    await peer.setRemoteDescription(new wrtc.RTCSessionDescription(data.signal));
  } else if (data.signal.candidate) {
    await peer.addIceCandidate(new wrtc.RTCIceCandidate(data.signal));
  }
});

peer.onicecandidate = ({ candidate }) => {
  if (candidate) {
    ws.send(JSON.stringify({ type: 'signal', to: remoteId, signal: candidate }));
  }
};

peer.ondatachannel = (event) => {
  dataChannel = event.channel;

  dataChannel.onmessage = (e: any) => {
    console.log(`\n[${remoteId}]: ${e.data}`);
    rl.prompt();
  };

  rl.on('line', (input) => {
    dataChannel.send(input);
  });

  console.log("✅ Connected! Start chatting...");
  rl.prompt();
};

async function createConnection() {
  dataChannel = peer.createDataChannel("chat");

  dataChannel.onopen = () => {
    console.log("🔌 Data channel open!");
    rl.prompt();

    rl.on('line', (input) => {
      dataChannel.send(input);
    });
  };

  dataChannel.onmessage = (e: any) => {
    console.log(`\n[${remoteId}]: ${e.data}`);
    rl.prompt();
  };

  const offer = await peer.createOffer();
  await peer.setLocalDescription(offer);
  ws.send(JSON.stringify({ type: 'signal', to: remoteId, signal: peer.localDescription }));
}

setTimeout(createConnection, 2000);
