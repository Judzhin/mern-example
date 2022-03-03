import React, {Component, useEffect, useState} from 'react';
import {useHttp} from "../hooks/http.hook";
import {useMessage} from "../hooks/message.hook";

/**
 *
 * @returns {JSX.Element}
 * @constructor
 */
export const AuthPage = () => {
    const message = useMessage()
    const {loading, error, request, clearError} = useHttp()
    const [form, setForm] = useState({
        email: '', password: ''
    });

    useEffect(() => {
        console.log('Use Effect Error:', error)
        message(error)
        clearError()
    }, [message, error, clearError])

    /**
     *
     * @param event
     */
    const onChangeHandler = event => {
        console.log('On Change:', {...form});
        setForm({...form, [event.target.name]: event.target.value});
    }

    const onRegistrationHandler = async () => {
        try {
            const data = await request('/api/auth/register', 'POST', {...form})
            console.log('Data', data)
            message(data.message)
        } catch (e) {}
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
                        <button
                            className={"btn yellow darken-4"}
                            style={{marginRight: 10}}
                            disabled={loading}>
                            Войти
                        </button>
                        <button
                            onClick={onRegistrationHandler}
                            className={"btn grey lighten-1 black-text"}
                            disabled={loading}>
                            Регистрация
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );

}

// export default AuthPage;