import { ReleaseStatus } from "./release-status.model";

export interface Release {

  name: string;
  namespace: string;
  status: ReleaseStatus;
  revision: number;
  created: Date;
  updated: Date;

}
