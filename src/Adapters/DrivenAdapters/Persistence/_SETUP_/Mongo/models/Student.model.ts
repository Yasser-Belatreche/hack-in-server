import { model, Schema } from "mongoose";
import { IStudent } from "../../../../../../Domain/Student";

const StudentSchema = new Schema<ReturnType<IStudent["info"]>>({
  userId: {
    type: String,
    unique: true,
  },
  email: String,
  name: String,
  password: String,
  sex: String,
});

const StudentModel = model("Students", StudentSchema);

export { StudentModel };
