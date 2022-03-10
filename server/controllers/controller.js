const Image = require('./../models/image');
const { v4: uuidv4 } = require('uuid');

const uploadImage = async (req, res) => {
    const image = req.file.buffer;

    const data = new Image({
        id: uuidv4(),
        image: Buffer.from(image).toString('base64'),
        title: req.body.title,
        description: req.body.description
    })

    data.save().then(result => {
        res.send(result);
        console.log('File successfully uploaded!');
    });
}

const getImage = (req, res) => {
    const id = req.params.id;
    Image.find({id}).then(doc => {
        res.send(doc.image);
    })
}

const getImageInfo = (req, res) => {
    const id = req.params.id;
    Image.find({id}).then(doc => {
        res.json(doc);
    });
}

const getImages = (req, res) => {
    Image.find().then(docs => {
        const response = {
            data: docs.map(doc => ({
                id: doc.id,
                image: doc.image,
                title: doc.title,
                description: doc.description
            }))
        }

        res.json(response.data);
    })
}

module.exports = {
    uploadImage,
    getImage,
    getImageInfo,
    getImages,
}