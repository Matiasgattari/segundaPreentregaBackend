// export function autenticacion(req, res, next) {
//   if (req.session.user) {
//     next()
//   } else {
//     res.redirect('/api/sessions/register')
//   //   res.redirect('/login')
//   }
// }
export function autenticacion(req, res, next) {
  if (req.user) {
    next()
  } else {
    res.redirect('/api/sessions/register')
  //   res.redirect('/login')
  }
}