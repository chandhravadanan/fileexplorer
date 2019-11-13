
var mongo = require('./mongo')

const schema = {
    name : {
        type : String,
        required : true
    },
    directoryid : {
        type : String
    },
    isdirectory : {
        type : Boolean,
        required : true
    }
}

var fileSchema = new mongo.Schema(schema)
fileSchema.index({ name: 1, directoryid: 1}, { unique: true });
var Files = mongo.model('files', fileSchema);

module.exports = Files;