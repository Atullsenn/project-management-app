import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Project } from './project.schema';

@Schema({ timestamps: true })
export class Task {
  @Prop({ required: true })
  title: string;

  @Prop()
  description?: string;

  @Prop({ enum: ['todo', 'in-progress', 'done'], default: 'todo' })
  status: 'todo' | 'in-progress' | 'done';

  @Prop({ required: true })
  dueDate: Date;

  @Prop({ type: Types.ObjectId, ref: 'User'})
  userId: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: Project.name, required: true })
  project: Types.ObjectId; // This will reference the Project that this task belongs to
}

export const TaskSchema = SchemaFactory.createForClass(Task);

export type TaskDocument = Task & Document;
