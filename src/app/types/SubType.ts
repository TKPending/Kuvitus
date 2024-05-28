export interface SubType {
  subUID: string;
  subTitle: string;
  subDetails: string;
  subStatus: number | 0 |  1 | 2; //(Uncomplete, Complete, Pending);
  subTags: String[];
  subDueDate: string;
};
