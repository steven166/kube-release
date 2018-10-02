import { ReleaseStatus } from "./release-status.model";

export interface Revision {

  revision: number;
  status: ReleaseStatus;
  created: Date;
  duration: number;
  manifest: string;

}
