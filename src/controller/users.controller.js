const usersCtrl = {};

const User = require('../models/User');
const passport = require('passport');

usersCtrl.renderSignUpForm = (req, res) => {
    res.render('users/signup');
}

usersCtrl.signup = async (req, res) => {
    const errors = [];//lista para acumular errores
    const { name, email, password, confirm_password } = req.body;
    if (password != confirm_password) {
        errors.push({ text: 'Las contraseñas no coinciden' });//"push" agrega un error a la lista
    }
    if (password.length < 4) {
        errors.push({ text: 'La contraseña debe tener mínimo 4 caracteres' });
    }
    if (errors.length > 0) {
        res.render('users/signup', {
            errors, //envía los errores
            name,
            email
        });
    } else {
        const emailUser = await User.findOne({ email: email }); //función asincrona
        if (emailUser) {
            req.flash('error_msg', 'El email ya está en uso.');
            res.redirect('/users/signup');
        } else {
            const newUser = new User({ name: name, email: email, password: password });
            newUser.password = await newUser.encryptPassword(password);
            await newUser.save();
            req.flash('success_msg', 'Registro exitoso.');
            res.redirect('/users/signin');
        }
    }
}

usersCtrl.renderSignInForm = (req, res) => {
    res.render('users/signin');
}

usersCtrl.signin = passport.authenticate("local", {
    successRedirect: "/notes",
    failureRedirect: "/users/signin",
    failureFlash: true
});

usersCtrl.logout = (req, res) => {
    req.logout();
    req.flash("success_msg", "Ha cerrado su sesión");
    res.redirect("/users/signin");
  };

module.exports = usersCtrl;