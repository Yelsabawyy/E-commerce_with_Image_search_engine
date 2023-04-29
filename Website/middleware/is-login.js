module.exports= (req, res, next) => {
    if(localStorage.getItem('admin')=="true" || localStorage.getItem('admin')=="false"){
        res.redirect("../../");
    }
    next();
}