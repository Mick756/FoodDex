import { Auth } from 'aws-amplify';

console.log("Loaded");

Auth.configure({
    Auth: {
        identityPoolId: process.env.IDENTITY_POOL_ID,
        region: process.env.AUTH_REGION,
        userPoolId: process.env.USER_POOL_ID
    }
});

async function signIn(username, password) {
    try {
        return await Auth.signIn(username, password);
    } catch (err) {
        return console.log(err);
    }
}

async function signUp(email, password, phone_number, birthday, gender) {
    return await Auth.signUp({
        email,
        password,
        attributes: {
            phone_number,
            birthday,
            gender
        },
    }).then(data => {
        console.log(data);
    }).catch(err => {
        return false;
    });
}

async function signOut() {
    return await Auth.signOut().then(data => {
        return data;
    }).catch(err => {
        return false;
    });
}

