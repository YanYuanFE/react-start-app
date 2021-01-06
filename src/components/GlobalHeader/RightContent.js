import React from "react";
import Avatar from "./AvatarDropdown";
import styles from "./index.less";


const GlobalHeaderRight = ({ theme, layout }) => {
  let className = styles.right;

  if (theme === "dark" && layout === "top") {
    className = `${styles.right}  ${styles.dark}`;
  }

  return (
    <div className={className}>
      <Avatar menu />
    </div>
  );
};

export default GlobalHeaderRight;
