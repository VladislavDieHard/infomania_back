export type UploadType = {
  image?: Express.Multer.File[]
  zip?: Express.Multer.File[]
}

export const UploadFields = [
  { name: 'image', maxCount: 1 },
  { name: 'zip', maxCount: 1 },
]

export enum UploadFilesName {
  Image = 'image',
  Zip = 'zip'
}

export const ImageFormats = [
  'apng', 'bmp', 'gif',
  'ico', 'cur', 'jpg',
  'jpeg', 'jfif', 'pjpeg',
  'pjp', 'png', 'svg',
  'tif', 'tiff', 'webp'
]