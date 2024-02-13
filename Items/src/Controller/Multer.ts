import { memoryStorage } from 'multer';

export const upload = {
  storage: memoryStorage(),
  limits: {
    fileSize: 15 * 1024 * 1024,
  },
};
