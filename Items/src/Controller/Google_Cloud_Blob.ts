import { Storage } from '@google-cloud/storage';
import { Readable } from 'stream';
import path from 'path';

const storage = new Storage({
  keyFilename: path.join(__dirname, 'service_file.json'),
});

const bucketName = 'rohansbucke';
const bucket = storage.bucket(bucketName);

export const uploadFile = async (
  fileStream: Readable,
  fileName: string
): Promise<void> => {
  const file = bucket.file(fileName);
  const stream = file.createWriteStream({
    metadata: {
      contentType: 'image/jpeg',
    },
  });

  return new Promise((resolve, reject) => {
    fileStream
      .pipe(stream)
      .on('finish', () => {
        resolve();
      })
      .on('error', (error) =>
        reject(new Error(`Error uploading file: ${error.message}`))
      );
  });
};
