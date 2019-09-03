const msgArr = [];
let id = 0;

module.exports = {
    create: (req, res) => {
        const {text, time} = req.body; //we're creating a new message from the BODY of whatever the req (request) was, and we're doing that by destructuring TEXT and TIME from the req's body.  
        msgArr.push({id, text, time});
        id++;
        res.status(200).send(msgArr);
    },

    read: (req, res) => {
        res.status(200).send(msgArr);
    }, 

    update: (req, res) => {
        const {text} = req.body;
        const updatedThisId = req.params.id; //we are able to look at the request's parameters (what they typed into the URL after the domain name) and since we labeled what they might type after that "id", it'll give us what they typed in that spot. 
        const msgIndex = msgArr.findIndex(msg => msg.id == updatedThisId); //I dont understand line 19. 
        let /*idk why they used LET here instead of CONST*/ msg = msgArr[msgIndex];
        //they have this next part as follows: 
        msgArr[msgIndex] = {
            id: msg.id,
            text: text || msg.text,
            time: msg.time
        };
        /*I get that you want the updated text to be what they type, not just what it says at "msg.text", but why wouldn't they just say "msg" on the left side of the assignment operator (=) instead of saying "msgArr[msgIndex]" like they did?*/
        res.status(200).send(msgArr);
    }, 

    delete: (req, res) => {
        const deleteThisId = req.params.id;
        const msgIndex = msgArr.findIndex(msg => msg.id == deleteThisId);
        msgArr.splice(msgIndex, 1);
        res.status(200).send(msgArr);
    }
}