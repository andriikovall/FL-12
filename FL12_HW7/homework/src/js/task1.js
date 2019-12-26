const userPassword = 'UserPass', userEmail = 'user@gmail.com';
const adminPassword = 'AdminPass', adminEmail = 'admin@gmail.com';

const minEmailLength = 5;
const minPassLength = 6;

const email = prompt('Enter email');
if (email === null || !email.trim()) {
    alert('Canceled');
} else if (email.length < minEmailLength) {
    alert('I don\'t know any emails having name length less than 5 symbols');
} else if (email === userEmail || email === adminEmail) {

    const isUser = email === userEmail;
    const isAdmin = email === adminEmail; 

    const password = prompt('Enter password');
    if (password === null || !password.trim()) {
        alert('Canceled');
    } else if (isUser && password === userPassword || isAdmin && password === adminPassword) {
        if (confirm('Do you want to change the password?')) {
            const oldPassword = prompt('Enter old password');
            if (oldPassword === null || !oldPassword.trim()) {
                alert('Canceled');
            } else if (isUser && oldPassword === userPassword || isAdmin && oldPassword === adminPassword) {
                const newPassword = prompt('Enter new password');
                if (newPassword === null || !newPassword.trim()) {
                    alert('Canceled');
                } else if (newPassword.length < minPassLength) {
                    alert('It\'s too short password. Sorry');
                } else {
                    const newPasswordRepeated = prompt('Enter new password again');
                    if (newPassword !== newPasswordRepeated) {
                        alert('You wrote the wrong password');
                    } else {
                        alert('You have successfully changed your password');
                    }
                }
            } else {
                alert('Wrong password');
            }
        } else {
            alert('You have failed the change');
        }
    } else {
        alert('Wrong password');
    }
} else {
    alert('I don’t know you');
}
