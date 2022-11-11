export enum DBS {
  directory = 'directory',
  files = 'files',
}

export interface IDirectory {
  id: string;
  path: string;
}

export type Preview = {
  xs?: string;
  md?: string;
};

export type FileData = {
  duration?: number;
  bitrate?: number;
  width?: number;
  height?: number;
};

export interface IFile {
  id: string;
  path: string;
  size: number;
  processed: 'no' | 'v1';
  addedISO: string; // iso date
  lastSeenISO: string; // iso date
  preview?: Preview;
  data?: FileData;
  tags: string[];
}
