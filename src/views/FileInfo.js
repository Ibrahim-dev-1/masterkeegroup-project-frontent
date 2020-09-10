import React from "react";
import { useParams } from "react-router-dom";
import SendFileModal from "../component/sendFileModal";
import "../loading.css";
import {
  useDispatchToProps,
  useStateToProps,
  fetchFiles,
} from "../contexts/filesProvider";
import { createNotification } from "../myFonctions";

const FileInfo = (props) => {
  const dispatch = useDispatchToProps();
  const state = useStateToProps();

  const [tabFichiers, setTabFichier] = React.useState([]);
  const { foldName } = useParams();

  React.useEffect(function () {
    fetchFiles(dispatch, foldName);
  }, []);

  const handleSendClick = () => {
    if (!tabFichiers.length) return console.log("Veuillez cochez une case ");
    let button = document.createElement("button");
    button.setAttribute("data-toggle", "modal");
    button.setAttribute("data-target", "#sendModal");
    document.getElementById("root").append(button);
    button.click();

    return button.remove();
  };
  const handlePublicClick = () => {
    if (!tabFichiers.length)
      return console.log(
        "Veuillez cochez les fichiers que vous voulez rendre publics "
      );
  };

  return (
    <React.Fragment>
      <SendFileModal foldName={foldName} files={tabFichiers} />
      {state.isLoading ? (
        <div className="d-flex justify-content-center align-items-center">
          <div className="lds-dual-ring"></div>
        </div>
      ) : (
        <div className="container">
          <h3 className="text-center font-wieght-bold mb-3">
            {" "}
            La listes des fichiers
          </h3>
          <div className="mb-3 border d-flex flex-wrap justify-content-around rounded p-2">
            <button
              onClick={handleSendClick}
              disabled={tabFichiers.length > 0 ? false : true}
              className="btn btn-success"
            >
              Envoyé à une adresse
            </button>

            <button
              onClick={handlePublicClick}
              className="btn btn-outline-info"
            >
              Rendre public
            </button>
          </div>

          <table
            style={{ width: "100%", margin: "0px auto" }}
            className=" text-center table table-bordered table-hover"
          >
            <thead>
              <tr>
                <th className="font-weight-bold" scope="col">
                  #
                </th>
                <th className="font-weight-bold" scope="col">
                  Nom
                </th>
                <th className="font-weight-bold" scope="col">
                  Taille
                </th>
                <th className="font-weight-bold" scope="col">
                  Type
                </th>
                <th className="font-weight-bold" scope="col">
                  date
                </th>
                <th className="font-weight-bold" scope="col">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {state.files.length > 0 ? (
                state.files.map(function (file) {
                  return (
                    <tr key={file.nom}>
                      <td>
                        <input
                          onChange={function (ev) {
                            if (!ev.target.checked) {
                              return setTabFichier(
                                tabFichiers.filter(function (element) {
                                  return element !== file;
                                })
                              );
                            }
                            return setTabFichier([...tabFichiers, file]);
                          }}
                          type="checkbox"
                        />
                      </td>
                      <td className="font-weight-bold text-primary">
                        {file.nom}
                      </td>
                      <td>{file.taille}</td>
                      <td className="text-danger">{file.type}</td>
                      <td className="text-muted">
                        {new Date(file.birthtime).toDateString()}
                      </td>
                      <td className="text-danger center">
                        <i
                          onClick={async () => {
                            try {
                              dispatch({ type: "LOADING", payload: true });
                              const result = await fetch("/fichier/remove", {
                                method: "post",
                                body: JSON.stringify({
                                  path: file.filePath,
                                  name: file.name,
                                }),
                                headers: {
                                  "Content-Type": "application/json",
                                  Authorization:
                                    "Bearer " + sessionStorage.getItem("token"),
                                },
                              });
                              const response = await result.json();
                              if (response.errors && !response.fold) {
                                throw new Error(response.errors);
                              }
                              return dispatch({
                                type: "LOADING",
                                payload: false,
                              });
                            } catch (error) {
                              dispatch({ type: "LOADING", payload: false });
                              return createNotification(
                                "Erreur",
                                "danger",
                                "Erreur de suppression ",
                                "top-right"
                              );
                            }
                          }}
                          style={{
                            cursor: "pointer",
                            fontSize: "1.2rem",
                            textShadow: "0px 1px 8px red",
                          }}
                          className="fa fa-trash"
                          aria-hidden="true"
                        ></i>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr className="list-group-item  text-danger">
                  <td colSpan="4"> List vide</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </React.Fragment>
  );
};

export default FileInfo;
