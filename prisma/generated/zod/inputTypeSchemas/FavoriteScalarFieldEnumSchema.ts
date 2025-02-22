import { z } from 'zod';

export const FavoriteScalarFieldEnumSchema = z.enum(['id','userId','imageId','createdAt']);

export default FavoriteScalarFieldEnumSchema;
