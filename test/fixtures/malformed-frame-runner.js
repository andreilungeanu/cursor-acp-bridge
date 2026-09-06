// A separate process makes an uncaught stream callback failure observable as an exit code.
import { fileURLToPath } from "node:url";
import { AcpClient } from "../../src/acp-client.js";
import { runDelegate } from "../../src/delegate.js";

const out = await runDelegate({
  spec: "task",
  workspace: process.cwd(),
  hardCapMs: 5000,
  clientFactory: () => new AcpClient({
    spawnSpec: {
      command: process.execPath,
      args: [fileURLToPath(new URL("./malformed-content-acp.js", import.meta.url)), process.argv[2]],
      options: { shell: false },
    },
  }),
});
console.log(JSON.stringify(out));
