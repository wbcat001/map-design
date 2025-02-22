import { z } from 'zod';

export const ImageScalarFieldEnumSchema = z.enum(['id','userId','fileName','originalUrl','generatedUrl','expiration','latitude','longitude','description','prompt','tag','created_at','updated_at']);

export default ImageScalarFieldEnumSchema;
