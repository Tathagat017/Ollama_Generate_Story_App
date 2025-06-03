const { spawn } = require("child_process");

class LocalLLM {
  constructor(modelPath) {
    this.modelPath = modelPath;
  }

  async generate(prompt, temperature = 0.7) {
    // This is a placeholder for the actual local LLM integration
    // You'll need to implement the specific command-line interface
    // for the deepseek r1:1.5b model

    return new Promise((resolve, reject) => {
      try {
        // Example of how to spawn a process for the local model
        // Update the command and arguments based on your model's CLI
        const process = spawn("your_model_command", [
          "--model",
          this.modelPath,
          "--temperature",
          temperature,
          "--prompt",
          prompt,
        ]);

        let output = "";

        process.stdout.on("data", (data) => {
          output += data.toString();
        });

        process.stderr.on("data", (data) => {
          console.error(`Model Error: ${data}`);
        });

        process.on("close", (code) => {
          if (code === 0) {
            resolve(output.trim());
          } else {
            reject(new Error(`Model process exited with code ${code}`));
          }
        });
      } catch (error) {
        reject(error);
      }
    });
  }
}

module.exports = LocalLLM;
