const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = mongoose.Types.ObjectId;
const userSchema = new Schema({
    userName: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true,trim: true,lowercase: true },
    password: { type: String, required: true },
    createdAt: { type: Date, default: Date.now }
});

const learningPathSchema = new Schema({
    userId: { type: ObjectId, required: true },
    path: { type: String, required: true, enum: ['web_development', 'dsa'] },
    level: { type: String, required: true, enum: ['beginner', 'intermediate', 'advanced'] },
    startedAt: { type: Date, default: Date.now },
    lastUpdated: { type: Date, default: Date.now }
});

const courseSchema = new Schema({
    userId: { type: ObjectId, required: true },
    pathId: { type: ObjectId, required: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    roadmapImage: { type: String, required: true},
    resources: [[{ title: String, url: String, description: String }]],
    prerequisites: {type: String }
});

const userModel = mongoose.model("user", userSchema);
const learningPathModel = mongoose.model("learningPaths", learningPathSchema);
const courseModel = mongoose.model("courses", courseSchema);

module.exports = {
    userModel: userModel,
    learningPathModel: learningPathModel,
    courseModel: courseModel
};