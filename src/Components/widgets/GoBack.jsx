import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
export default function GoBack() {
  const history = useHistory();
  const [homePath, setHomePath] = useState(true);
  useEffect(() => {
    setInterval(() => {
      if (document.location.pathname === "/") {
        setHomePath(true);
      } else {
        setHomePath(false);
      }
    },1);
  }, []);

  const goBackHandle = async () => {
    await history.goBack();
  };
  return (
    !homePath && (
      <i onClick={() => goBackHandle()} className="fas fa-arrow-left go-back"></i>
    )

    // history.length > 2 && <i onClick={() =>  mmd()} class="fas fa-arrow-left go-back"></i>
  );
}
