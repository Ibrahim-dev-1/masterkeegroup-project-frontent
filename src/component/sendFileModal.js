import React from 'react';


const SendFileModal = (props) => {
  // console.log(props.files)
  const [emails, setEmails ] = React.useState([]);
  const [newEmail, setNewEmail ] = React.useState('');
  
  const handleClick = () => {
    if(emails.length > 0 && props.files.length > 0 ){
        const xmlRequest = new XMLHttpRequest();
        xmlRequest.
        const form = new FormData();
        form.append({files: props.files, emails: emails });

        return form.
    }

    return console.log("la listes des emails ou la listes des files sont vides")
  }

    return <div  style={{ overflowY: "scroll", height:"400px"}} data-keyboard="true" data-backdrop="static" className="modal fade" id="sendModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div className="modal-dialog modal-lg" role="document">
      <div className="modal-content">
        <div className="modal-header">
          <h3 className="modal-title text-center">Les fichiers par email</h3>
          <button type="button" className="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div className="modal-body">
          <div className="container">
            <div className="row">
                  <div className="col-md-4 p-3">
                    <h5 className="font-weight-bold">Listes des fichiers cochés</h5>
                    <ul className="list-group">
                        {props.files.length > 0 ? props.files.map(function(file){
                            return <li key={Math.random() * 10000} className="list-group-item list-group-item-action">
                                <i className="fa fa-file text-info mr-3" aria-hidden="true"></i>
                                {file.nom}
                            </li>
                        }): (<li className="list-group-item ">la Listes est vide </li>)}
                    </ul>
                  </div>
                  <div className="col-md-4 p-3">
                      <h5 className="font-weight-bold">les des adresses email</h5>
                      <ul className="list-group">
                        {emails.length ? emails.map(function(email){
                          return <li key={Math.random() * 10000} className="list-group-item list-group-item-action position-relative ">
                            <i 
                              style={{position: "absolute", top:"5px" , right: "5px" , '&:hover':{ color: "red"} }} 
                              className="fa fa-window-close" 
                              value={email}
                              onClick={function(ev){
                                console.log(email);
                                return setEmails(emails.filter(function(e) {
                                  return e !== email;
                                } ))
                              }}
                              aria-hidden="true"></i>
                                {email}
                            </li>
                        }): (<li className="list-group-item ">la Listes est vide </li>)}
                    </ul>
                  </div>
                  <div className="col-md-4 p-2">
                      <h5 className="font-weight-bold">Ajoutez une adresse email</h5>
                      <hr />
                      <button 
                        type="button" 
                        data-target="#emailCollapse"  
                        data-toggle="collapse" 
                        className="btn btn-outline-success"
                        >
                        <i className="fa fa-plus mr-3" aria-hidden="true"></i>
                          Ajouter
                      </button>
                      <div className="collapse" id="emailCollapse">
                        <div className="container mt-3" >
                          <div className="input-group">
                            <input type="email" value={newEmail} onChange={function(ev){  return setNewEmail(ev.target.value)}} className="bg-light border form-control" placeholder="coolkratos1@gmail.com" />
                            <button type="button" onClick={function(ev){ if(newEmail !== ""){ setNewEmail(''); return setEmails([...emails,newEmail])} }} className="btn-success btn-sm" >Ok</button>
                          </div>
                        </div>
                        
                      </div>
                  </div>
              </div>
          </div>
        </div>
        <div className="modal-footer">
          <button type="button" className="btn btn-danger" data-dismiss="modal">Fermé</button>
          <button type="button" onClick={ handleClick } className="btn btn-outline-success">Envoyés</button>
        </div>
      </div>
    </div>
  </div>
}

export default SendFileModal;