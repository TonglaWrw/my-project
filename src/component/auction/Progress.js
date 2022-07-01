import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import storage from '../../hooks/Storage';

export const Progress = ({item, setItem}) => {
    const {progress,isCompleted} = storage(item);


    useEffect((isCompleted) => {
        setItem(null)
    }, [isCompleted, setItem] )

  return (
    <motion.div style={{ height: '5px' , background: 'black' }} 
    initial={{ width: 0}} animate= {{ width: `${progress}%`}}
    />
  )
}
