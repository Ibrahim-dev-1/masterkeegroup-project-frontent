import React from 'react';
import { Link } from 'react-router-dom';
import '../loading.css';
import Notification from 'react-notifications-component';


const FilesContents = () => {
    const [errors, setError ] = React.useState([]);
    const [loading, setLoading ] = React.useState(false);
    const [folders, setFolders] = React.useState([]);
    console.log(errors)
    const fetchData = () => {
            setLoading(true)
            fetch("/dossier/",{
                method: "GET",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer '+ sessionStorage.getItem("token")
                }
            }).then(function(result){
                return result.json();
            })
            .then(function(data){
                setTimeout(function(){setLoading(false);}, 2000);
                if(data.errors)
                    throw new Error(data.message); 
                
                return setFolders(data.folders);
            })
            .catch(error => {
                console.log(error);
                setLoading(false);
                return setError(error);
            })
    }

    React.useEffect(function(){
        fetchData();
    },[])

    return (
        <React.Fragment>
            
            <Notification />
            <h3 className="font-weight-bold">Tous les fichiers </h3>
            {loading ? (<div className="d-flex justify-content-center align-items-center"><div className="lds-dual-ring"></div></div>):(
                <div className="d-flex flex-wrap justify-content-between">
                    { folders.length > 0 ? folders.map(function(fold){
                    return <div key={fold.nom} style={{ width:"48%"}} className="border rounded p-2 mb-2" >
                                <h3 className="text-primary text-center">{fold.nom}</h3>
                                <p className="text-muted">Dossier {fold.nom} contenant tous les fichiers du type {fold.type} </p>
                                <div className="d-flex justify-content-between align-items-center flex-wrap">
                                    <p className="font-weight-bold text-muted">Totals: <span className="text-danger"> {fold.length}</span> éléments</p>
                                    <Link className="text-center p-1 bg-light border rounded text-primary" to={"/dashboard/" + fold.nom }>
                                    <i className="fa fa-eye p-1" aria-hidden="true"></i>   
                                    voire détails</Link>
                                </div>
                            </div>
                    }): (<h3 className="text-danger"> La Listes est vide </h3>)}
                </div>
               
            )}
        </React.Fragment>

    )
}

export default FilesContents;