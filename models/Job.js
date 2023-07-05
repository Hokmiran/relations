
const { default: mongoose } = require("mongoose");

const JobSchema = mongoose.Schema({
    addDate: { type: Date, default: Date.now },
    title: String,
    summary: String,
    description: String,
    minSalary: Number,
    maxSalary: Number,
    locations: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Location' }]
})


const Job = mongoose.model('Job', JobSchema)


module.exports = {
    Job
}