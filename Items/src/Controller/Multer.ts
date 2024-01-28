import { memoryStorage } from 'multer';

export const upload = {
  storage: memoryStorage(),
  limits: {
    fileSize: 5 * 1024 * 1024,
  },
};
