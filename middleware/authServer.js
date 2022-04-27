// midleware. authentication
import express from 'express';
const app = express();


app.post("/login", (req, res)=>{
    const username=req.body.name
    const user={ name: username}
    const accessToken=jwt.sign(user,process.env.ACCESS_TOKEN_SECRET)
    const refreshToken=jwt.sign(user,process.env.ACCESS_TOKEN_SECRET)
    res.json({accessToken:accessToken, refreshToken:refreshToken})

})
    
    function  generateAccessToken(user) {
        return jwt.sign(user,process.env.ACCESS_TOKEN_SECRET,{expiresIn:"10minutes"})
}
    

function authenticateToken (req, res, next) {
    const authHeader=req.headers['Authorization']
    const token = authHeader && authHeader.split(' ')[1];
    if(token==null) return res.send(401)

    jwt.verify(token,process.env.ACCESS_TOKEN_SECRET,(err,user)=>{if(err) return res.sendStatus(403)
    req.user=user
    next()
    }
    );
}

export default {
    generateAccessToken,
    authenticateToken
};
    