import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3'
import { getSignedUrl } from '@aws-sdk/s3-request-presigner'

const S3_REGION = process.env.S3_REGION ?? 'ap-southeast-1'
const S3_BUCKET = process.env.S3_BUCKET ?? 'tu-lam-things'

export const createPresignedUrlWithClient = async (key: string) => {
  const client = new S3Client({
    region: S3_REGION,
    credentials: {
      accessKeyId: process.env.S3_ACCESS_KEY ?? '',
      secretAccessKey: process.env.S3_SECRET_KEY ?? '',
    },
  })
  const command = new PutObjectCommand({ Bucket: S3_BUCKET, Key: key })
  return getSignedUrl(client, command, { expiresIn: 3600 })
}
