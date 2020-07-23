import React from 'react';
import Navbar from '../component/Navbar';
import FilesContents from '../views/FilesContents';
import FileInfo from '../views/FileInfo';
import Profil from '../assets/img/profil.jpg'
import UploadModal from '../component/UploadModal';
import {Route } from 'react-router-dom';

const Dashboard = (prop) =>{
    
    return (
        <div> 
            <UploadModal />                       
            <Navbar />
            <div style={{ marginTop: "5rem"}} className="container"> 
                <div style={{width:"500px",marginBottom: "3rem", marginLeft:"auto", marginRight: "auto", background: "#f8f9fa"}} className="border text-center rounded"> 
                    <h4 className="display-4"><span className="text-primary">Master</span>Cloud</h4>
                    <p className="text-muted">Master cloud vous permet de gérer tous vos fichiers.</p>
                    <p className="text-muted">Envoyer à vos partenaires des fichiers de grande taille ce cloud.</p>
                </div> 
                    <hr />
                <div className="row"> 
                    <section className="col-md-2">
                        <div style={{marginTop: "2.5rem"}} className="text-center border rounded">
                            <img className="img-circle p-2" width="100px" src={Profil} alt="profile" />
                            <h3 className="font-weight-bold">Vous</h3>
                            <p className="text-primary">email</p>
                            <p className="text-muted">date de création</p>
                        </div>
                    </section>
                    <section className="col-md-7"> 
                       <Route exact path="/dashboard/" component={FilesContents} />
                       <Route  exact path="/dashboard/:foldName" component={FileInfo} />
                    </section>
                    <section className="col-md-3 text-center"> 
                        <h3 className="font-weight-bold">Ajouter un Fichier</h3>
                       <div className="border rounded p-2">
                            <p className="text-muted">Voulez-vous uplodé un nouveau fichier?</p>
                            <p className="text-muted">cliquez sur le bouton Ajouter un fichier pour uplodé un fichier</p>
                            <button className="btn btn-success" data-toggle="modal" data-target="#kratosModal">Ajouter nouveau fichier</button> 
                       </div>
                    </section>
                </div>
            </div>
            
        </div>
    )
}


export default Dashboard;