module.exports= (req, res, next) => {
    if(!localStorage.getItem('admin')){
        res.redirect("../auth/login");
    }
    if(localStorage.getItem('admin')===null || localStorage.getItem('admin')==="null"){
        res.redirect("../auth/login");
    }
    next();
}