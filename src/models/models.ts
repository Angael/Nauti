export enum DBS {
  directory = 'directory',
  files = 'files',
}

export interface IDirectory {
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
  path: string;
  dirId: number; // lokiId
  size?: number;
  lastSeen?: number; // Date.now()
  preview?: Preview;
  data?: FileData;
  tags?: string[];
}
