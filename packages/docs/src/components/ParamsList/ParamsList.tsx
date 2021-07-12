import clsx from 'clsx';
import { motion, Variants } from 'framer-motion';
import React from 'react';
import styles from './ParamsList.module.css';

interface ParamsListProps {
  children: React.ReactNode;
  isHidden?: boolean;
}

const ParamsListVariants: Variants = {
  hidden: {
    height: 0,
  },
  shown: {
    height: 'auto',
  },
};

function ParamsList({ children, isHidden }: ParamsListProps) {
  return (
    <div className={styles['params-list']}>
      <motion.div
        className={clsx(styles['params-list-children'])}
        variants={ParamsListVariants}
        transition={{ ease: 'easeInOut' }}
        initial="shown"
        animate={isHidden ? 'hidden' : 'shown'}
      >
        {children}
      </motion.div>
    </div>
  );
}

export default ParamsList;
