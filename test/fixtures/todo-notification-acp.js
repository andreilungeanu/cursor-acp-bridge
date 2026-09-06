import readline from "node:readline";

const out = (value) => process.stdout.write(JSON.stringify(value) + "\n");
let promptId;
readline.createInterface({ input: process.stdin }).on("line", (line) => {
  const message = JSON.parse(line);
  if (!message.method) {
    // Only the request with id 0 needs a reply. An acknowledgement of the notification is invalid.
    if (message.id !== 0 || !message.result) process.exit(2);
    out({ jsonrpc: "2.0", method: "session/update", params: { sessionId: "sess-todos", update: {
      sessionUpdate: "agent_message_chunk", content: { type: "text", text: "done" },
    } } });
    return out({ jsonrpc: "2.0", id: promptId, result: { stopReason: "end_turn" } });
  }
  if (message.method === "session/new") {
    return out({ jsonrpc: "2.0", id: message.id, result: { sessionId: "sess-todos" } });
  }
  if (message.method === "session/prompt") {
    promptId = message.id;
    out({ jsonrpc: "2.0", method: "cursor/update_todos", params: { merge: false, todos: [
      { id: "1", content: "inspect", status: "in_progress" },
      { id: "2", content: "implement", status: "pending" },
    ] } });
    return out({ jsonrpc: "2.0", id: 0, method: "cursor/update_todos", params: { merge: true, todos: [
      { id: "1", content: "inspect", status: "completed" },
    ] } });
  }
  out({ jsonrpc: "2.0", id: message.id, result: {} });
});
