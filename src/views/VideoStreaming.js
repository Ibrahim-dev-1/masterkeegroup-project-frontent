import React from "react";
import socket from "socket.io-client";
import peer from "simple-peer";

const VideoStreaming = () => {
  const userVideoRef = React.useRef();
  const socketRef = React.useRef();

  // creation des states

  React.useEffect(function () {
    navigator.mediaDevices
      .getUserMedia({ video: true, audio: true })
      .then((stream) => {
        userVideoRef.current.srcObject = stream;
      });
  });

  return (
    <div className="container ">
      <h3 className="text-primary m-4 text-center display-3">
        Bienvenu sur video streaming
      </h3>
      <h5 className="p-3 border rounded text-center text-muted">
        La plateforme de video de conférence
        <span className="text-danger">Master stream </span>
        est toute prète pour vous. Vous pouvez streaming en invitant d'autre
        personnes à vous rejoindre !
      </h5>
      <div className="d-flex">
        <div className="mt-4 border rounded ">
          <h3 className="font-weight-bold text-center"> Vous </h3>
          <video
            width="300px"
            height="300px"
            id="userVideo"
            autoPlay
            playsInline
            muted
            ref={userVideoRef}
          ></video>
        </div>
      </div>
    </div>
  );
};

export default VideoStreaming;
