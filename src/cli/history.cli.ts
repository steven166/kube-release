import { Command } from "command-script";
import * as YAML from "js-yaml";
import { formatBytes, formatDuraton, printTable } from "../helpers/cli.helper";
import { ReleaseService } from "../services/release.service";

const command = new Command("history")
  .description("Show revision history of a release")
  .arg("RELEASE", {optional: false, rest: false})
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
      releaseService.getRevisions(args.options.namespace, args.args[0]).then(revisions => {
        switch (output.toLowerCase()) {
          case "json":
            console.info(JSON.stringify(revisions));
            break;
          case "yaml":
            console.info(YAML.safeDump(revisions));
            break;
          case "name":
            revisions.forEach(release => console.info(release.revision));
            break;
          default:
            if (revisions.length === 0) {
              return reject("No revisions found.");
            }
            let formattedValues = revisions.map(revision => {
              return {
                revision: revision.revision,
                status: revision.status,
                created: revision.created,
                duration: formatDuraton(revision.duration),
                size: formatBytes(revision.manifest.length)
              };
            });
            printTable(["revision", "status", "created", "duration", "size"], formattedValues);
            break;
        }
        resolve(revisions);
      }).catch(e => reject(e));
    });
export default command;
