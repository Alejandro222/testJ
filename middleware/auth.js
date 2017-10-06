module.exports = {

    isLogged : function (req, res , next){
        if(req.isAuthenticated()){
            // console.log('sdf');
            next();
        }
        else{
            res.redirect('/user/signin');
        }
    }

};