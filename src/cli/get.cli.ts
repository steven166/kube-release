import { Command } from "command-script";
import * as YAML from "js-yaml";
import { printTable } from "../helpers/cli.helper";
import { ReleaseService } from "../services/release.service";

const command = new Command("get")
  .description("Get release")
  .arg("RELEASE", {optional: false, rest: true})
  .option("-n, --namespace <namespace>", { desc: "Filter on namespace", value: "all" })
  .option("-o, --output <format>", { desc: "Output format. One of: json|yaml|wide|name" })
  .action(
    (args: { args?: any[], options?: any, flags?: any }, resolve: (result?: any) => void, reject: (err?: any) => void) => {
      // validate output options
      let output = args.options.output || "wide";
      let supportedOutputs = ["json", "yaml", "yml", "wide", "name"];
      if (supportedOutputs.indexOf(output.toLowerCase()) === -1) {
        console.info(`Invalid output format: '${output}'`);
        command.showHelp(command, 1);
      }

      let releaseService = new ReleaseService();
      Promise.all(args.args.map(arg => releaseService.getRelease(args.options.namespace, arg))).then(releases => {
        switch (output.toLowerCase()) {
          case "json":
            console.info(JSON.stringify(releases));
            break;
          case "yaml":
            console.info(YAML.safeDump(releases));
            break;
          case "name":
            releases.forEach(release => console.info(release.name));
            break;
          default:
            if (releases.length === 0) {
              return reject("No releases found.");
            }
            printTable(["namespace", "name", "status", "revision", "updated"], releases);
            break;
        }
        resolve(releases);
      }).catch(e => reject(e));
    });
export default command;
