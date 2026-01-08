/**
 * WASI Environment Polyfill for Browser Compatibility
 *
 * Starting from curlconverter v4.10+, the tree-sitter-bash.wasm module is compiled
 * with WASI (WebAssembly System Interface) imports that expect an `env.exit` function.
 * This function exists in Node.js environments but not in browsers, causing the error:
 *
 *   "LinkError: WebAssembly.instantiate(): Import #0 "env" "exit": function import requires a callable"
 *
 * This polyfill provides a no-op `exit` function on `globalThis.env` to satisfy the
 * WASM import requirements. It must be imported BEFORE any curlconverter usage.
 *
 * @see https://webassembly.org/
 * @see https://wasi.dev/
 */
console.info("spa", "Loading emscripten WASM polyfill");

const g = globalThis as any;

// Emscripten uses a global `Module` object
g.Module ??= {};
g.Module.env ??= {};

// tree-sitter expects env.exit to be callable
g.Module.env.exit ??= (code?: number) => {
  // no-op in browser
  console.info("spa", "env.exit called with code:", code);
};
