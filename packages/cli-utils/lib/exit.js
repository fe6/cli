/** @format */

exports.exitProcess = false;

exports.exit = code => {
  if (exports.exitProcess) {
    process.exit(code);
  } else if (code > 0) {
    throw new Error(`Process exited with code ${code}`);
  }
};
