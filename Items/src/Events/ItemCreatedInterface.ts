import { Subjects } from '@codishrohan/common';

export interface ItemCreatedInterface {
  subject: Subjects.ItemCreated;
  data: {
    email: string;
  };
}
