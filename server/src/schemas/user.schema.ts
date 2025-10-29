import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

// Define the User schema class
@Schema({ timestamps: true })
export class User extends Document { 
  @Prop({ unique: true, required: true })
  email: string;

  @Prop({ required: true })
  passwordHash: string;
}

// Create the schema for the User class
export const UserSchema = SchemaFactory.createForClass(User);

// Define the UserDocument type which will include _id
export type UserDocument = User & Document;

