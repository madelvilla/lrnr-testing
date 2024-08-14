import React from 'react';
import { LuFlame } from "react-icons/lu";
import { FaThList } from "react-icons/fa";
import { IoPerson } from "react-icons/io5";
import './AccountPage.css';

const AccountPage = () => {
    return (
        <div className="account-page">
            <h1>Account</h1>
            <div className="account-details">
                <div className='streak'>
                <div className='account-icons'><LuFlame /></div>
                    <h3>Streak</h3>
                    <p>You have a streak of 5 days!</p>
                </div>
                <div className='platinum'>
                <div className='account-icons'><FaThList /></div>
                    <h3>Platinum Quizzes</h3>
                    <p>golang - Intermediate</p>
                    <p>JavaScript - beginner</p>
                    <p>AWS - beginner</p>
                </div>
                <div className='level'>
                <div className='account-icons'><IoPerson /></div>
                    <h3>lrnr Level: 2</h3>
                    <p>150/200 xp</p>
                </div>
            </div>
        </div>
    );
};

export default AccountPage;
