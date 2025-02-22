import { z } from 'zod';

export const UserScalarFieldEnumSchema = z.enum(['id','name','email','hashedpassword','createdAt','updatedAt']);

export default UserScalarFieldEnumSchema;
