import { Auth } from 'aws-amplify';


async function SignIn(username, password) {
    try {
        const user = await Auth.signIn(username, password);
        if (user.challengeName === 'SMS_MFA' ||
            user.challengeName === 'SOFTWARE_TOKEN_MFA') {
            const code = getCodeFromUserInput();
            const loggedUser = await Auth.confirmSignIn(user, code, "SMS_MFA"
            );
        } else if (user.challengeName === 'NEW_PASSWORD_REQUIRED') {
            const {requiredAttributes} = user.challengeParam;
            const {username, email, phone_number} = [];
            const loggedUser = await Auth.completeNewPassword(user, newPassword, {});
        } else if (user.challengeName === 'MFA_SETUP') {
            await Auth.setupTOTP(user);
        } else {
            console.log(user);
        }
    } catch (err) {
        if (err.code === 'UserNotConfirmedException') {

        } else if (err.code === 'PasswordResetRequiredException') {

        } else if (err.code === 'NotAuthorizedException') {

        } else if (err.code === 'UserNotFoundException') {

        } else {
            console.log(err);
        }
    }
}