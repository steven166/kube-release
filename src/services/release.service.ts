import { Release } from "../domain/release.model";
import { Revision } from "../domain/revision.model";
import { ReleaseStatus } from "../domain/release-status.model";

export class ReleaseService {

  public async getReleases(namespace?: string): Promise<Release[]> {
    return [{
      name: "prometheus",
      namespace: "kube-metrics",
      status: ReleaseStatus.SUCCEED,
      created: new Date(),
      updated: new Date(),
      revision: 1
    },{
      name: "grafana",
      namespace: "kube-public",
      status: ReleaseStatus.FAILED,
      created: new Date(),
      updated: new Date(),
      revision: 3
    }];
  }

  public async getRelease(namespace: string, name: string): Promise<Release> {
    return {
      name,
      namespace,
      status: ReleaseStatus.FAILED,
      created: new Date(3),
      updated: new Date(3),
      revision: 3
    };
  }

  public async getRevisions(namespace: string, name: string): Promise<Revision[]> {
    return [{
      revision: 1,
      status: ReleaseStatus.SUCCEED,
      created: new Date(),
      duration: 2000,
      manifest: "abcd"
    }];
  }

}
