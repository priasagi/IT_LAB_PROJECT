import { useState } from "react";

function App() {

    const [message, setMessage] = useState("Welcome to my website");

    return (
        <div className="container">

            <h1>My First React Website</h1>

            <p>{message}</p>

            <button onClick={() => setMessage("Button clicked!")}>
                Click Me
            </button>

        </div>
    );
}

export default App;
