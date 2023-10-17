export type ListDTOType = {
  work_log: number;
  limit?: number;
  offset?: number;
};
export interface PauseLogItemType {
  id: number;
  startTime: string;
  endTime: string;
  pauseTime: string;
  workLog: {
    id: number;
  };
}

export type ListModelType = PauseLogItemType[];
