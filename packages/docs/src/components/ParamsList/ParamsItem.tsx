import React, { useState } from 'react';
import clsx from 'clsx';
import { FiChevronRight } from 'react-icons/fi';
import { Link } from '@docusaurus/router';
import ParamsList from './ParamsList';
import styles from './ParamsList.module.css';

interface ParamsItemProps {
  name: string;
  type: string;
  required?: boolean;
  description?: string | React.ReactNode;
  children?: React.ReactNode;
  typeHref?: string;
  isHidden?: boolean;
}

const ParamsItem = ({
  name,
  type,
  description,
  children,
  required = false,
  typeHref,
  isHidden: isHiddenByDefault = false,
}: ParamsItemProps) => {
  const [isHidden, setIsHidden] = useState(isHiddenByDefault);
  return (
    <div
      role="button"
      onKeyDown={(e) => {
        if (e.code === 'Enter') {
          setIsHidden((prev) => !prev);
        }
      }}
      tabIndex={0}
      className={clsx(styles['params-item'])}
      onClick={(e) => {
        e.stopPropagation();
        setIsHidden((prev) => !prev);
      }}
      style={{ cursor: children ? 'pointer' : 'initial' }}
    >
      <div className={styles['params-item-details']}>
        <div className={styles.header}>
          <p className={styles.name}>
            {name} {required ? <span className={styles.red}>*</span> : null}
          </p>

          {typeHref ? (
            <Link to={typeHref} className={styles.type}>
              {type}
            </Link>
          ) : (
            <span className={styles.type}> {type}</span>
          )}

          {children && (
            <FiChevronRight
              size={14}
              className={clsx(styles.chevron, !isHidden && styles['rotate-chevron'])}
            />
          )}
        </div>
        <div className={styles.description}>{description}</div>
      </div>
      <ParamsList isHidden={isHidden}>{children}</ParamsList>
    </div>
  );
};

export default ParamsItem;
