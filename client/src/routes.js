import React from 'react';
import {Routes, Route} from 'react-router-dom';
import { Redirect } from 'react-router';
import {LinksPage} from "./pages/LinksPage";
import {CreatePage} from "./pages/CreatePage";
import {DetailPage} from "./pages/DetailPage";
import {AuthPage} from "./pages/AuthPage";

export const useRoutes = isAuthenticated => {
    if (isAuthenticated) {
        return (
            <Routes>
                <Route path="/links" exact element={<LinksPage/>}/>
                <Route path="/create" exact element={<CreatePage/>}/>
                <Route path="/detail/:id" element={<DetailPage/>}/>
                <Route
                    path="*"
                    element={<LinksPage />}
                />
            </Routes>
        )
    }

    return (
        <Routes>
            <Route
                exact
                path="/"
                element={<AuthPage />} />
            <Route
                path="*"
                element={
                    <main style={{ padding: "1rem" }}>
                        <p>There's nothing here!</p>
                    </main>
                }
            />
        </Routes>
    )
}