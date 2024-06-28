import { SignInParams } from '@/utils/ValidationSchema';
import cloudinary from '@/config/cloudinary';
import { ResponseAPI, statusMessage } from '@/utils/types';
export const uploadImageToCloudiary = async (image: File): Promise<ResponseAPI<string>> => {
  try {
    const singleImage = image;
    const imageBuffer = await singleImage.arrayBuffer();
    const imageArray = Array.from(new Uint8Array(imageBuffer));
    const imageData = Buffer.from(imageArray);

    const imageBase64 = imageData.toString('base64');
    const result = await cloudinary.uploader.upload(
      `data:image/png;base64,${imageBase64}`,
      {
        folder: 'dailymanagement'
      });
    return {
      status: statusMessage.OK,
      data: result.secure_url
    }
  } catch (error) {
    throw error;
  }
}