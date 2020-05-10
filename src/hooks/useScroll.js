import { useEffect, useState } from "react";

const useScroll = loading => {
  const [scrollPos, setScrollPos] = useState();
  const handleScroll = () => {
    // when component re-renders, it causes window.scrollY to be 0. We don't want
    // to update state if scrollY is 0. because scroll restoration breaks.
    if (!loading && window.scrollY !== 0) {
      setScrollPos(window.scrollY);
    }
  };

  // add event listener to window when component mounts
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // restore scroll whenever loading changes
  useEffect(
    () => {
        console.log('scrollPos', scrollPos);
      window.scrollTo(0, scrollPos);
    },
    [loading]
  );
};

export default useScroll;
