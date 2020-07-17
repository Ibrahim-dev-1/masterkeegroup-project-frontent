import React from "react";

import Navbar from "../component/Navbar";
import Footer from "../component/Footer";
import UploadModal from "../component/UploadModal";
// import { Link } from 'react-router-dom';
import kratosLoader from '../assets/img/kratosLoading.gif';

export default function(prop) {
const [files , setFiles ] = React.useState([])
const [loading, isLoading] = React.useState(true);


const fetchData = () => {
      if(loading){
      fetch('http://localhost:9001/files', {
            method: "GET",
            headers: {
                  "Content-Type":"application/json"
            }
      }).then(response => {return response.json()})
      .then(datas => {
            setFiles(datas)
      })
      .catch(err => console.log(err) )
      setTimeout(function(){
            isLoading(false)
      } , 2000)
}
}

const handleDownloadBtnClick = (ev) =>{
      // get file path
      const filePath = ev.target.value;
      // create blob
      const blob = new Blob([filePath], {type: "multipart/form-data"});
      console.log(blob);
      // create link tag
      const a = document.createElement("a");
      const url = window.URL.createObjectURL(blob);
      console.log(url);
      a.href = url;
      a.download = url
      a.click();
      a.remove();

      document.onfocus = (ev) =>{
            console.log(ev)
            return window.URL.revokeObjectURL(blob)
      }
}

React.useEffect( function() {
    isLoading(true);
},[])

return (
<div>{fetchData()}
      <UploadModal isLoading={isLoading} />
      <Navbar />
      <div className="container mt-5">
                  <h2 className="display-4 text-center p-3 font-weight-bold">
                        Listes des fichiers du cloud
                  </h2>
      <div className="row">
            <div className="col-md-10 mt-3">
                        <h2 className="font-weight-bold bg-info border text-center">
                            Fichiers  
                        </h2>
     
{loading ? ( <div className="text-center"><img width="40" height="40" alt="cool" src={kratosLoader} /></div>): (<table className="table m-none bg-white table-hover">
                        <thead>
                              <tr>
                                    <th className="text-danger" scope="col"># ID</th>
                                    <th className="text-info" scope="col">Nom</th>
                                    <th scope="col">Taille</th>
                                    <th scope="col">date</th>
                                    <th className="text-success" scope="col">Action</th>
                              </tr>
                        </thead>
                        <tbody>
                              { files.length ? files.map(file =>{
                              return (
                                    <tr key={file.id}>
                                          <td>{file.id}</td>
                                          <td className="font-weight-bold text-info">{file.name}</td>
                                          <td className="font-weight-bold">{file.size} Mo</td>
                                          <td className="text-muted">{file.birthtime}</td>
                                          <td className="text-success">
                                          {/* <Link id="downloadURL" to="#" hidden></Link> */}
                                          <button 
                                                onClick={handleDownloadBtnClick} 
                                                className="btn btn-outline-success"
                                                value={file.chemin}
                                          >Télécharger</button></td>
                                          
                                    </tr>
                                    )
                              }):(<tr><td>Fichier vide</td></tr>)}
                        </tbody>
                  </table>)}
            </div>
            <div className="col-md-2 mt-3 ">
                  <div className="border d-flex flex-column align-items-center p-3" style={{background: "#fff"}}>
                        <h3 className="text-success font-weight-bold">Uploads</h3>
                        <p className="text-muted">Envoyez tous vos fichiers à travers cet cloud</p>
                        <p>Cet cloud vous permet d'envoyé n'importe qu'elle taille de fichiers</p>
                        <button 
                              data-toggle="modal"
                              data-target="#kratosModal"
                              className="btn btn-success" >Envoyé un fichier</button>
                  </div>
            </div>
            
      </div>
      </div>
          <Footer />
</div>
)}
