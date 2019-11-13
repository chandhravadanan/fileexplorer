
var express = require('express');
var fileopn = require('./fileopn');

var router = express.Router();

router.post('/createfile', (req, res)=>{
    handleCreateFile(req, res, false)
})

router.post('/createfolder', (req, res)=>{
    handleCreateFile(req, res, true)
})

router.get('/searchfilesbyname', async (req, res)=>{
    let fileName = req.query.name
    try{
        let filesList = await fileopn.searchFilesByName(fileName, req.query.folderid)
        sendResponse( res, 200, 'success', filesList);
    }catch(e){
        sendResponse( res, 500, e.message)
    }
})

router.get('/searchfilesbyprefix', async (req, res)=>{
    let fileName = req.query.prefix
    try{
        let filesList = await fileopn.searchFileByStr(fileName)
        sendResponse( res, 200, 'success', filesList);
    }catch(e){
        sendResponse( res, 500, e.message)
    }
})

router.delete('/deletefolder', async (req, res)=>{
    let id = req.query.id;
    try{
        let info = await fileopn.deleteDirectory(id)
        sendResponse( res, 200, 'success');
    }catch(e){
        sendResponse( res, 500, e.message)
    }
})

router.delete('/deletefile', async (req, res)=>{
    let id = req.query.id;
    try{
        let info = await fileopn.deleteFile(id)
        sendResponse( res, 200, 'success');
    }catch(e){
        sendResponse( res, 500, e.message)
    }
})

router.put('/rename', async (req, res)=>{
    let id = req.query.id;
    let newName = req.query.newname
    try{
        let info = await fileopn.renameFile(id, newName)
        sendResponse( res, 200, 'success');
    }catch(e){
        sendResponse( res, 500, e.message)
    }
})

async function handleCreateFile(req, res, isDir){
    let name = req.query.name
    if(!name || name==''){
        sendResponse(res, 400, "invalid name")
        return;
    }
    try{
        fileInfo = await fileopn.checkAndCreateFile(name, req.query.folderid, isDir)
        sendResponse(res, 200, 'created successfully', fileInfo)
    }catch(e){
        sendResponse(res, 500, e.message)
    }
}

function sendResponse(res, resCode, message, data){
    res.statusCode = resCode
    let resData = {message : message}
    if(data){
        resData.data = data
    }
    res.end(JSON.stringify(resData))
}

module.exports = router;