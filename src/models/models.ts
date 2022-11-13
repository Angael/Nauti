import { Types } from 'mongoose';

export interface IDirectory {
  path: string;
  lastUpdated: Date;
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
  dirId: Types.ObjectId; // lokiId
  size?: number;
  lastSeen?: number; // Date.now()
  preview?: Preview;
  data?: FileData;
  tags?: string[];
  rating?: number;
}
