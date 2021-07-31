module.exports.signUpErrors = (err) => {
    const messages = err.errors.map(e => e.message)

    let errors = { pseudo: '', email: '', password: 'mauvais password' }

    if(messages.includes('pseudo'))
    errors.pseudo = "Pseudo incorrect ou déjà pris";

    if(messages.includes('email'))
    errors.email = 'Email incorrect';

    if(messages.includes('password'))
    errors.password = 'Le mot de passe doit faire 6 caractères minimum';

    if(messages.includes('pseudo must be unique'))
    errors.pseudo = 'Ce pseudo existe déjà';

    if(messages.includes('email must be unique'))
    errors.email = 'Cet email existe déjà';

    return errors
};

module.exports.signInErrors = (err) => {
    let errors = { email:'', password:'' }

    if (err.message === 'incorrect email') 
    errors.email = 'Email inconnu';

    if (err.message === 'incorrect password') 
    errors.password = 'Mot de passe incorrect';

    return errors
};

module.exports.uploadErrors = (err) => {
    let errors = { format: '', maxSize:''};

    if (err.message.includes('invalid file'))
        errors.format = "Format non valide";

    if (err.message.includes('max size'))
        errors.maxSize = "Le fichier dépasse 500ko";

    return errors
};