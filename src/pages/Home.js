import React from 'react';
import './Home.css';
import logo from '../logo.png';  

const HomePage = () => {
    return (
        <div className="homepage">
            <section className="intro">
                <img src={logo} alt="Lrnr Logo" className="logo" />
                <h2>Your guided path to programming enlightenment</h2>
                <button className="begin-button">BEGIN JOURNEY</button>
            </section>

            <section className="features">
                <div className="feature">
                    <i className="fas fa-bolt"></i>
                    <h3>Personalized Quizzes</h3>
                    <p>
                        Greetings, young padawan. Are you ready to embark on a journey of personalized enlightenment through the art of coding?
                        Our app can create custom quizzes that align with your coding skills and interests. Whether you are a novice or a master, our
                        system can generate questions that will test your proficiency in programming languages, tools, and concepts.
                    </p>
                </div>
                <div className="feature">
                    <i className="fas fa-coins"></i>
                    <h3>Rewarding</h3>
                    <p>
                        Our app is designed to be both challenging and rewarding, so you can learn new concepts while enjoying the process. With our personalized
                        quiz app, you can track your progress, compete with your peers, and discover new areas of expertise. The journey of a thousand lines
                        of code begins with a single keystroke.
                    </p>
                </div>
                <div className="feature">
                    <i className="fas fa-user"></i>
                    <h3>Personal SME</h3>
                    <p>
                        Welcome to the path of knowledge. Our app is like having a personal subject matter expert at your side, guiding you on your journey
                        towards wisdom.
                    </p>
                </div>
            </section>
        </div>
    );
}

export default HomePage;
