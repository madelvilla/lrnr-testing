// client/src/components/AccountPage.js
import React from 'react';

const AccountPage = () => {
    const userInfo = {
        username: 'JohnDoe',
        email: 'johndoe@example.com',
        createdAt: '2023-01-15',
        quizzesTaken: 5,
    };

    return (
        <div className="account-page">
            <h2>Account Information</h2>
            <div className="account-details">
                <p><strong>Username:</strong> {userInfo.username}</p>
                <p><strong>Email:</strong> {userInfo.email}</p>
                <p><strong>Account Created:</strong> {userInfo.createdAt}</p>
                <p><strong>Quizzes Taken:</strong> {userInfo.quizzesTaken}</p>
            </div>
            <div className="account-actions">
                <button>Edit Profile</button>
                <button>Logout</button>
            </div>
        </div>
    );
};

export default AccountPage;
