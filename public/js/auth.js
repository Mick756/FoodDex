import { Auth } from 'aws-amplify';

Auth.configure({
    Auth: {
        identityPoolId: process.env.COGNITO_POOL_ID,
        region: 'us-east-2',
    }
});

async function SignIn(username, password) {
    try {
        return await Auth.signIn(username, password);
    } catch (err) {
        return console.log(err);
    }
}

function signUp(email, password, phone_number, birthday, gender) {
    Auth.signUp({
        email,
        password,
        attributes: {phone_number, birthday, gender},
    }).then(data => {
        console.log(data);
    }).catch(err => {
        return false;
    });
}

function signOut() {
    Auth.signOut()
        .then(data => {
            return data;
        })
        .catch(err => {
            return false;
        });
}

