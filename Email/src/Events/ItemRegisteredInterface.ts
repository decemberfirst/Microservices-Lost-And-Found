import { Subjects } from '@codishrohan/common';

export interface ItemRegisteredInterface {
  subject: Subjects.ItemCreated;
  data: {
    itemCategory: string;
    nearByUsers: [{ email: string }];
    type: string;
    itemLink: string;
  };
}
