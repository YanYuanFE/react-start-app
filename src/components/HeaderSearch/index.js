import { SearchOutlined } from '@ant-design/icons';
import { AutoComplete, Input } from 'antd';
import React, { useRef, useState } from 'react';

import classNames from 'classnames';
import styles from './index.less';

const HeaderSearch = (props) => {
  const {
    className,
    defaultValue,
    onVisibleChange,
    placeholder,
    open,
    defaultOpen,
    value: val,
    ...restProps
  } = props;

  const inputRef = useRef(null);

  const [value, setValue] = useState(val || defaultValue);

  const [searchMode, setSearchMode] = useState(open || defaultOpen || false);

  const inputClass = classNames(styles.input, {
    [styles.show]: searchMode,
  });

  return (
    <div
      className={classNames(className, styles.headerSearch)}
      onClick={() => {
        setSearchMode(true);
        if (searchMode && inputRef.current) {
          inputRef.current.focus();
        }
      }}
      onTransitionEnd={({ propertyName }) => {
        if (propertyName === 'width' && !searchMode) {
          if (onVisibleChange) {
            onVisibleChange(searchMode);
          }
        }
      }}
    >
      <SearchOutlined
        key="Icon"
        style={{
          cursor: 'pointer',
        }}
      />
      <AutoComplete
        key="AutoComplete"
        className={inputClass}
        value={value}
        style={{
          height: 28,
          marginTop: -6,
        }}
        options={restProps.options}
        onChange={setValue}
      >
        <Input
          ref={inputRef}
          defaultValue={defaultValue}
          aria-label={placeholder}
          placeholder={placeholder}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              if (restProps.onSearch) {
                restProps.onSearch(value);
              }
            }
          }}
          onBlur={() => {
            setSearchMode(false);
          }}
        />
      </AutoComplete>
    </div>
  );
};

export default HeaderSearch;
