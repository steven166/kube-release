#!/usr/bin/env node

import { Cli } from "command-script";
import * as fs from "fs";
import * as path from "path";

// Load package json
let packageJson: any;
if (fs.existsSync(path.join(__dirname, "../package.json"))) {
  // tslint:disable-next-line
  packageJson = require('../package.json');
} else {
  // tslint:disable-next-line
  packageJson = require('../../package.json');
}

let cli = new Cli({
  packageJson
});

// tslint:disable-next-line
cli.command(require("./ls.cli"));
cli.command(require("./get.cli"));
cli.command(require("./history.cli"));

cli.command("help")
  .description("Show help")
  .order(2000)
  .action(() => {
    cli.showHelp();
  });

cli.run(process.argv.splice(2));
