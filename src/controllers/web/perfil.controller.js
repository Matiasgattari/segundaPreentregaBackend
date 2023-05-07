export function profileView(req,res){
  res.render('profile', {
        // pageTitle: 'Perfil', user: JSON.stringify(req.session['user'])
        pageTitle: 'Perfil', user: req['user']
    })
}