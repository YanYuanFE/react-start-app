import {useEffect} from "react";

export const DocumentTitle = ({title, children}) => {
  useEffect(() => {
    document.title = title;
  }, [title]);

  return children;
}
