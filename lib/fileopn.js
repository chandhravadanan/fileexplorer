
var ObjectId = require('mongoose').Types.ObjectId
var Files = require('./file');


function checkAndCreateFile(fileName, parentDirId, isDir){
    return new Promise(async (resolve, reject)=>{
        if(!parentDirId || parentDirId==''){
            createFile(fileName, '', isDir, resolve, reject)
            return;
        }
        var dirInfo = await isValidDir(parentDirId)
        if(!dirInfo){
            return reject(new Error('INVALID_DIR'))
        }else{
            createFile(fileName, parentDirId, isDir, resolve, reject)
        }
    })  
}

function createFile(fileName, parentDirId, isDir, resolve, reject){
    var fileInfo = {}
    fileInfo.name = fileName
    fileInfo.directoryid = parentDirId
    fileInfo.isdirectory = isDir
    var file = new Files(fileInfo)
    file.save((err, doc)=>{
        if(err) {
            return reject(err)
        }
        resolve(doc)
    })
}

function isValidDir(dirId){
    return Files.findOne({_id : dirId, isdirectory : true}).exec();
}

function deleteFile(fileId){
    return Files.deleteOne({_id : ObjectId(fileId)}).exec();
}

async function deleteDirectory(dirId){
    var filesRemoved = await Files.deleteMany({directoryid : dirId}).exec()
    if(filesRemoved){
        return deleteFile(dirId)
    }else{
        throw new Error('DELETE_DIR_ERR')
    }
}

function renameFile(fileId, newName){
    return Files.updateOne({_id : ObjectId(fileId)} , {$set : {name :newName}}, {new : true}).exec();
}

function searchFileByStr(searchTxt){
    var regexp = new RegExp("^"+ searchTxt);
    let query = {name : regexp, isdirectory : false}
    return Files.find(query).limit(10).exec();
}

function searchFilesByName(fileName, parentDirId){
    let query = {name : fileName, isdirectory : false}
    if(parentDirId){
        query.directoryid = parentDirId 
    }
    return Files.find(query).exec()
}


module.exports = {
    checkAndCreateFile,
    deleteFile,
    deleteDirectory,
    renameFile,
    searchFileByStr,
    searchFilesByName
}