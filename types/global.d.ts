// global.d.ts

import mongoose from 'mongoose';

declare global {
  var mongoose: {
    conn: mongoose.Mongoose | null;
    promise: Promise<mongoose.Mongoose> | null;
  };
}

// This is necessary to make TypeScript treat this file as a module
export {};
