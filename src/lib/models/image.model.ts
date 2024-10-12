import { Document, model, models, Schema } from "mongoose";

export interface IImage extends Document {
    transformationType: string;
    publicId: string;
    width?: number;
    height?: number;
    aspectRatio?: string;
    author?: {
        _id:string,
        firstName:string,
        lastName:string,
    };
    createdAt?: Date;
    updatedAt?: Date;
  }
  

const ImageSchema = new Schema({
    transformationType: {type:String, requiered:true},
    publicId:{type:String, required: true},
    width:{type:Number},
    height:{type:Number},
    aspectRatio:{type:String},
    author:{type: Schema.Types.ObjectId, ref:"User"},
    createdAt: {type:Date, default:Date.now()},
    updatedAt: {type:Date, default:Date.now()},
});

const Image = models?.Image || model('Image',ImageSchema);
export default Image;