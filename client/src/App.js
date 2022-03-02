import React from 'react';
// import {
//     BrowserRouter as Router,
//     Routes,
//     Route,
// } from "react-router-dom";
import 'materialize-css';
import {useRoutes} from "./routes";

function App() {
    const routes = useRoutes(false);
    return (

        <div className="container">
            {/*<h1>Hello World!</h1>*/}
            {/*<Routes>*/}
            {/*<Route exact path="/" element={<Home />}/>*/}
            {/*<Route path="/about" element={<About />}/>*/}
            {/*<Route path="/dashboard" element={<Dashboard />}/>*/}
            {/*</Routes>*/}
            {routes}
        </div>
    );
}

// function Home() {
//     return (
//         <div>
//             <h2>Home</h2>
//         </div>
//     );
// }
//
// function About() {
//     return (
//         <div>
//             <h2>About</h2>
//         </div>
//     );
// }
//
// function Dashboard() {
//     return (
//         <div>
//             <h2>Dashboard</h2>
//         </div>
//     );
// }


export default App;