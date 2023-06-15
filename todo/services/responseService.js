
module.exports.response = (req, err, records, res) => {
    if (err) {
        res.status(400).json({fail: {data: err }});
    } else {
        res.status(200).json({success: {data: records}});
    } 
};