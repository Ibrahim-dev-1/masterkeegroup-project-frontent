import React from "react";
import { Link } from "react-router-dom";
import "../loading.css";
import Notification from "react-notifications-component";
import {
  useDispatchToProps,
  fetchFolds,
  useStateToProps,
} from "../contexts/foldesProvider";

const FilesContents = () => {
  const dispatch = useDispatchToProps();
  const state = useStateToProps();

  React.useEffect(function () {
    fetchFolds(dispatch);
  }, []);

  return (
    <React.Fragment>
      <Notification />
      <h3 className="font-weight-bold">Tous les fichiers </h3>
      {state.loading ? (
        <div className="d-flex justify-content-center align-items-center">
          <div className="lds-dual-ring"></div>
        </div>
      ) : (
        <div className="d-flex flex-wrap justify-content-between">
          {state.folders.length > 0 ? (
            state.folders.map(function (fold) {
              return (
                <div
                  key={fold.nom}
                  style={{ width: "48%" }}
                  className="border rounded p-2 mb-2"
                >
                  <h3 className="text-primary text-center">{fold.nom}</h3>
                  <p className="text-muted">
                    Dossier {fold.nom} contenant tous les fichiers du type{" "}
                    {fold.type}{" "}
                  </p>
                  <div className="d-flex justify-content-between align-items-center flex-wrap">
                    <p className="font-weight-bold text-muted">
                      Totals:{" "}
                      <span className="text-danger"> {fold.length}</span>{" "}
                      éléments
                    </p>
                    <Link
                      className="text-center p-1 bg-light border rounded text-primary"
                      to={"/dashboard/admin/cloud/" + fold.nom}
                    >
                      <i className="fa fa-eye p-1" aria-hidden="true"></i>
                      voire détails
                    </Link>
                  </div>
                </div>
              );
            })
          ) : (
            <h3 className="text-danger"> La Listes est vide </h3>
          )}
        </div>
      )}
    </React.Fragment>
  );
};

export default FilesContents;
