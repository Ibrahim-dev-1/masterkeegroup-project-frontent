import React from 'react';
// import { Link } from 'react-router-dom';

const FileInfo = (props) => {
    return (
        <React.Fragment>
            <div className="border rounded p-2" style={{ maxWidth: "300px" , margin: "0px auto" }}>
                <h3 className="font-weight-bold">title du fichier</h3>
                <p className="text-muted">Un petit description sur le fichier </p>
                <p>type: <span className="text-danger">Mp4</span></p>
                <p>taille: <span className="font-weight-bold">400Mo</span></p>
                <p className="text-muted">createdAt:  23-09-2020 </p>
            </div>
            <div className="mt-3 border d-flex flex-wrap justify-content-around rounded p-2" >
                <button className="btn btn-success"> Envoyé à une adresse </button>
                <button className="btn btn-outline-info">Somethings else</button>
            </div>
            
        </React.Fragment>

    )
}

export default FileInfo;