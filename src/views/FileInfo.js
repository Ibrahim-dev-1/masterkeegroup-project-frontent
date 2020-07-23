import React from 'react';
// import { Link } from 'react-router-dom';
import { useAuthState } from '../contexts/authenticationProvider';

const FileInfo = (props) => {
    const [files, setFiles] = React.useState([]);
    const [loading, setLoading] = React.useState(false);
    const [errors, setErrors] = React.useState([]);
    const context = useAuthState();

    const fetchDatas = () => {
        console.log(props.match.params.foldName )
            setLoading(true);
            return fetch("/dossier/" + props.match.params.foldName,{
                method: "GET",
                headers:{'Content-Type': 'application/json' , 'Authorization': 'Bearer ' + sessionStorage.getItem("token") }
            })
            .then(function(result){
                return result.json();
            })
            .then(function(data){
                setTimeout(function(){setLoading(false)}, 1000)
                return setFiles(data);
            })
            .catch(function(error){
                console.log(error);
                console.log(errors);
                return setLoading(false);
            });
    }

    React.useEffect(function(){
        fetchDatas();        
    },[]);

    return (
        <React.Fragment>
           {loading ? (<h3 className="text-success">loading...</h3>):(
            <div className="container">
                <h3 className="text-center font-wieght-bold mb-3"> La listes des fichiers </h3>
                <div className="mb-3 border d-flex flex-wrap justify-content-around rounded p-2">
                    <button className="btn btn-success"> Envoyé à une adresse </button>
                    <button className="btn btn-outline-info">Somethings else</button>
                </div>
                <table style={{width:"100%" , margin: "0px auto"}} className=" text-center table table-bordered table-responsive table-hover">
                <thead>
                    <tr >
                        <th className="font-weight-bold" scope="col">#</th>
                        <th className="font-weight-bold" scope="col">Nom</th>
                        <th className="font-weight-bold" scope="col">Taille</th>
                        <th className="font-weight-bold" scope="col">Type</th>
                        <th className="font-weight-bold" scope="col">date</th>
                        <th className="font-weight-bold" scope="col">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {files.length > 0 ? files.map(function(file){
                        return <tr key={file.nom}>
                                    <td>
                                        <input onClick={function(){ console.log("click sur " + file.nom )}} className="" type="checkbox" />
                                    </td>
                                    <td className="font-weight-bold text-primary"> {file.nom} </td>
                                    <td>{file.taille}</td>
                                    <td className="text-danger">{file.type}</td>
                                    <td className="text-muted">{new Date(file.birthtime).toDateString()}</td>
                                    <td className="text-danger center">
                                        <i 
                                            onClick={async function(){
                                               try{
                                                const result =await fetch("/fichier/remove",{
                                                    method: "post",
                                                    body: JSON.stringify({path: file.filePath }),
                                                    headers: {
                                                        'Content-Type':'application/json'
                                                    }
                                                })

                                                const response = await result.json();
                                                console.log(response);
                                                return fetchDatas();

                                               }catch(error){
                                                   console.log(error);
                                                   return setErrors(error);
                                               }
                                            }} 
                                            style={{fontSize: "1.2rem",textShadow: "0px 1px 8px red"}}
                                            className="fa fa-trash" 
                                            aria-hidden="true"
                                        ></i>
                                    </td>
                                </tr>
                        }):(
                            <tr className="list-group-item  text-danger"><td colSpan="4" > List vide</td></tr>
                        )}
                </tbody>
                   
                </table>
            </div>
           )}
            
        </React.Fragment>

    )
}

export default FileInfo;