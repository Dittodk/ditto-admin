import MyContext, { MyContextType } from '@/app/contexts/MyContext';
import React, { useContext } from 'react';

const ContextUsage = () => {
  const context = useContext(MyContext);

  // --------  you can use to add data like this  -----------
  // const context = useContext(MyContext);
  // const { state, setState } = context as MyContextType;

  // --------  you can use to get data like this  -----------
  const { state } = context as MyContextType;
  return <div>ContextUsage with {state}</div>;
};

export default ContextUsage;
