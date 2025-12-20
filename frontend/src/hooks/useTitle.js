import { useEffect } from 'react';

const useTitle = (title) => {
  useEffect(() => {
    document.title = `${title} | Virtual Store`;
  }, [title]);
};

export default useTitle;
