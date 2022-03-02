import React, {Component, useState} from 'react';

/**
 *
 * @returns {JSX.Element}
 * @constructor
 */
export const AuthPage = () => {

    const [form, setForm] = useState({
        email: '', password: ''
    });

    /**
     *
     * @param event
     */
    const onChangeHandler = event => {
        setForm({...form, [event.target.name]: event.target.value});
        console.log({...form});
    }

    return (
        <div className={"row"}>
            <div className="col s6 offset-s3">
                <h3>Сократи ссылку</h3>
                <div className="card blue darken-1">
                    <div className="card-content white-text">
                        <span className="card-title">Автризация</span>
                        <div>

                            <div className="input-field">
                                <input
                                    placeholder="Введите email"
                                    id="email"
                                    name="email"
                                    type="text"
                                    className="yellow-input"
                                    onChange={onChangeHandler}
                                />
                                <label htmlFor="email">Email:</label>
                            </div>

                            <div className="input-field">
                                <input
                                    placeholder="Введите пароль"
                                    id="password"
                                    name="password"
                                    type="password"
                                    className="yellow-input"
                                    onChange={onChangeHandler}
                                />
                                <label htmlFor="password">Пароль:</label>
                            </div>

                        </div>
                    </div>
                    <div className="card-action">
                        <button className={"btn yellow darken-4"} style={{marginRight: 10}}>Войти</button>
                        <button className={"btn grey lighten-1 black-text"}>Регистрация</button>
                    </div>
                </div>
            </div>
        </div>
    );

}

// export default AuthPage;