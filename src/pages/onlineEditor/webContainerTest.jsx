import { WebContainer } from "@webcontainer/api";
import React, { useState, useEffect, useRef } from "react";
import { Play, Code2, Server, Monitor } from "lucide-react";

export default function FullStackEditor() {
  const [frontendCode, setFrontendCode] = useState(`
<!DOCTYPE html>
<html>
  <head>
    <title>My App</title>
  </head>
  <body>
    <h1>Hello from WebContainers</h1>
    <button onclick="fetch('/api/message').then(res => res.text()).then(alert)">Call Backend</button>
  </body>
</html>
  `);

  const [backendCode, setBackendCode] = useState(`
import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const app = express();
const __dirname = path.dirname(fileURLToPath(import.meta.url));

app.use(express.static(__dirname));

app.get('/api/message', (req, res) => {
  res.send('Hello from backend running inside browser!');
});

app.listen(3000, () => console.log('Server running on port 3000'));
  `);

  const [previewUrl, setPreviewUrl] = useState(null);
  const [logs, setLogs] = useState([]);
  const [isRunning, setIsRunning] = useState(false);
  const webContainerRef = useRef(null);
  const processRef = useRef(null);
  const installedRef = useRef(false);

  const addLog = (msg) => setLogs((prev) => [...prev, { time: new Date().toLocaleTimeString(), msg }]);

  const runProject = async () => {
    setLogs([]);
    setIsRunning(true);
    addLog("Starting...");

    try {
      let wc = webContainerRef.current;

      // Boot only first time
      if (!wc) {
        addLog("Booting WebContainer...");
        wc = await WebContainer.boot();
        webContainerRef.current = wc;

        await wc.fs.writeFile(
          "package.json",
          JSON.stringify({ type: "module", dependencies: { express: "^4.18.2" } }, null, 2)
        );
      }

      // Write/update code files
      await wc.fs.writeFile("index.js", backendCode);
      await wc.fs.writeFile("index.html", frontendCode);
      addLog("Files updated.");

      // Install dependencies only once
      if (!installedRef.current) {
        addLog("Installing dependencies...");
        const install = await wc.spawn("npm", ["install"]);

        install.output.pipeTo(
          new WritableStream({
            write(data) {
              addLog(`[npm] ${data}`);
            },
          })
        );

        await install.exit;
        installedRef.current = true;
        addLog("Dependencies installed.");
      }

      // Stop old server if running
      if (processRef.current) {
        addLog("Stopping previous server...");
        processRef.current.kill();
        processRef.current = null;
      }

      // Start backend again
      addLog("Starting backend server...");
      const process = await wc.spawn("node", ["index.js"]);
      processRef.current = process;

      process.output.pipeTo(
        new WritableStream({
          write(data) {
            addLog(`[Node] ${data}`);
          },
        })
      );

      wc.on("server-ready", (port, url) => {
        addLog(`Server running → ${url}`);
        setPreviewUrl(url);
      });
    } catch (err) {
      addLog("ERROR: " + err.message);
    } finally {
      setIsRunning(false);
    }
  };

  useEffect(() => {
    return () => {
      if (previewUrl) URL.revokeObjectURL(previewUrl);
    };
  }, [previewUrl]);

  return (
    <div className="text-white bg-slate-900 min-h-screen p-6">
      <header className="flex justify-between items-center border-b border-slate-700 pb-4 mb-6">
        <div className="flex items-center gap-2">
          <Code2 className="text-blue-400" />
          <h1 className="text-xl font-bold">Full Stack Playground</h1>
        </div>
        <button
          onClick={runProject}
          disabled={isRunning}
          className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg flex gap-2 items-center disabled:opacity-50"
        >
          <Play size={16} /> Run Project
        </button>
      </header>

      <div className="grid grid-cols-2 gap-6">
        {/* Frontend */}
        <div className="border border-slate-700 rounded-lg p-2">
          <div className="flex items-center gap-2 border-b border-slate-700 pb-2 mb-2">
            <Monitor className="text-green-400" />
            <span>Frontend</span>
          </div>
          <textarea
            value={frontendCode}
            onChange={(e) => setFrontendCode(e.target.value)}
            className="w-full h-96 bg-slate-800 p-3 font-mono text-sm focus:outline-none"
          />
        </div>

        {/* Backend */}
        <div className="border border-slate-700 rounded-lg p-2">
          <div className="flex items-center gap-2 border-b border-slate-700 pb-2 mb-2">
            <Server className="text-purple-400" />
            <span>Backend</span>
          </div>
          <textarea
            value={backendCode}
            onChange={(e) => setBackendCode(e.target.value)}
            className="w-full h-96 bg-slate-800 p-3 font-mono text-sm focus:outline-none"
          />
        </div>
      </div>

      {/* Logs */}
      <div className="mt-6 border border-slate-700 rounded-lg p-4 bg-slate-800/50 max-h-48 overflow-y-auto">
        <h2 className="font-semibold mb-2">Console Output</h2>
        {logs.map((l, i) => (
          <div key={i} className="text-xs">
            <span className="text-slate-500">[{l.time}]</span> {l.msg}
          </div>
        ))}
      </div>

      {/* Preview */}
      {previewUrl && (
        <div className="mt-6 border border-slate-700 rounded-lg">
          <iframe src={previewUrl} className="w-full h-[500px] bg-white" />
        </div>
      )}
    </div>
  );
}
