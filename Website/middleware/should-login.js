
module.exports= (req, res, next) => {
    console.log(localStorage.getItem('token'))
    if(!localStorage.getItem('token')){
        console.log(localStorage.getItem('token'))
        res.redirect("../auth/login");
    }
    if(localStorage.getItem('token')===null || localStorage.getItem('admin')==="null"){
        console.log(localStorage.getItem('token'))
        res.redirect("../auth/login");
    }
    next();
}