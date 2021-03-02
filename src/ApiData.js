import React, { useEffect, useState } from "react";

function ApiData(){
    const [apiResponse, setApiResponse] = useState(null);
    const [defaultApiResponse, setDefaultApiResponse] = useState(null);

    function callAPI() {
        fetch("http://localhost:9000/testAPI")
            .then(res => res.text())
            .then(res => setDefaultApiResponse(res));
    }
    
    useEffect( () => {
        callAPI();
    }, [defaultApiResponse]);
    

    function handleSubmit(e) {
        e.preventDefault();
        let form = e.target;
        let formData = new FormData(form);
        console.log(Object.fromEntries(formData.entries()));
        fetch("http://localhost:9000/gsheet", {
            method: 'POST',
            body: formData
        })
        .then(response => response.text())
        .then(setApiResponse);
    }

    return (
        <div className="container">
            <form onSubmit={handleSubmit} encType="multipart/form-data">
                <label for="name">Text: </label>
                <input type="text" name="name" id="name"/>
                <label for="files">Files: </label>
                <input type="file" name="files" id="files" multiple/>
                <input type="submit" value="submit"></input>
            </form>
            <p className="App-intro">{defaultApiResponse}</p>
            <p className="App-intro">{apiResponse}</p>
        </div>
    )
}

export default ApiData;