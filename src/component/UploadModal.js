import React from 'react';
import { create } from '../assets/js/filepond';

export default function(prop) {

const filesRef = React.createRef();
const [error, setError] =  React.useState("");
let pond;

const handleClick = () => {

        if(!filesRef.length < 0){
            return  setError(["Vous devez selectionnez le fichier à uploader avant de cliquez sur uploder"])
        }

        let xhr = new XMLHttpRequest();
        xhr.open("post", "http://localhost:9001/upload");
        let inputFile = document.querySelector("#kratosFile");
        console.log(pond);
        
        var formData = new FormData(inputFile);
               

        xhr.upload.addEventListener('progress', (chunk) => {
        //    console.log(chunk.total);
        });

        return xhr.send(formData);
}
React.useEffect(function(){
    let inputFile = document.querySelector("input[type='file']");
        pond = create(inputFile,{
        multiple: true ,
        labelIdle: "Cliquez ou Glisser déposer vos fichiers à uploader ",
        styleLoadIndicatorPosition: 'center bottom',
        styleProgressIndicatorPosition: 'right bottom',
        styleButtonRemoveItemPosition: 'left bottom',
        styleButtonProcessItemPosition: 'right bottom',
    });
})

return (
    <div className="modal fade" data-keyboard="true" data-backdrop="static" id="kratosModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
    <div className="modal-dialog modal-dialog-centered" role="document">
        <div className="modal-content">
        <div className="modal-header">
            <h5 className="modal-title" id="exampleModalCenterTitle">Uploadé</h5>
            <button type="button" id="myCloseButton" className="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
            </button>
        </div>
        <div className="modal-body">
        {error && <div className="alert alert-danger" role="alert">{error}</div>}
            <form className="demo" id="kratosFile" encType="multipart/form-data">
                <div className="filepond-ripple filepond-ripple-one"></div>
                <div className="filepond-ripple filepond-ripple-two"></div>
                <div className="filepond-ripple filepond-ripple-three"></div>
                <div className="filepond-wrapper">
                    <input 
                        type="file"
                        name="filepond"
                        className="filepond"
                        data-allow-reorder="true"
                        data-max-file-size="3MB"
                        data-max-files="5"
                        multiple
                        />
                </div>
            </form>
            <div className="progress" style={{ height: "35px"}}>
                <div className="progress-bar" role="progressbar" style={{width: 0}}  aria-valuenow="30" aria-valuemin="0" aria-valuemax="100">0%</div>
            </div>
        </div>
        <div className="modal-footer">
            <button type="button" className="btn btn-danger" data-dismiss="modal">Fermé</button>
            <button 
                type="button" 
                className="btn btn-outline-primary" 
                onClick={handleClick}
            ><i className="fa fa-upload p-1" aria-hidden="true"></i>Envoyé</button>
        </div>
        </div>
    </div>
</div>
)

}
