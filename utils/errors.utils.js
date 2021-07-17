module.exports.signUpErrors = (err) => {
    let errors = {pseudo: '', email: '', password: 'mauvais password'}

    if(err.message.includes('pseudo'))
    errors.pseudo = "Pseudo incorrect ou déjà pris";

    if(err.message.includes('email'))
    errors.email = 'Email incorrect';

    if(err.message.includes('password'))
    errors.password = 'Le mot de passe de faire 6 caractères minimum';

    if(err.code === 11000 && Object.keys(err.keyValue)[0].includes('pseudo')) // si le code erreur est 11000 et que la clé de l'objet contient "pseudo"
    errors.pseudo = 'Ce pseudo existe déjà';

    if(err.code === 11000 && Object.keys(err.keyValue)[0].includes('email'))
    errors.email = 'Cet email existe déjà';

    return errors
};

module.exports.signInErrors = (err) => {
    let errors = { email:'', password:'' }

    if (err.message.includes('email')) 
    errors.email = 'Email inconnu';

    if (err.message.includes('password')) 
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