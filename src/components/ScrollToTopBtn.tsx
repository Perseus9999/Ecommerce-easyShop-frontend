"use client";
import React, { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { BiArrowToTop } from "react-icons/bi";

const ScrollToTopBtn = () => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    let prevScrollpos =
      window.scrollY ||
      document.body.scrollTop ||
      document.documentElement.scrollTop;
    const handleScroll = () => {
      let currentScrollPos =
        window.scrollY ||
        document.body.scrollTop ||
        document.documentElement.scrollTop;
      if (prevScrollpos > currentScrollPos) {
        currentScrollPos > 200 ? setShow(true) : setShow(false);
      } else {
        setShow(false);
      }
      prevScrollpos = currentScrollPos;
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  //   scroll to top
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div
      className={`${
        show
          ? "visible opacity-100 bottom-5"
          : "invisible opacity-0 bottom-full"
      } fixed bottom-5 right-5 z-[99] transition-all duration-300 ease-in-out`}
    >
      <Button
        className="text-2xl w-12 h-12 p-0"
        variant={"rounded"}
        onClick={scrollToTop}
      >
        <BiArrowToTop />
      </Button>
    </div>
  );
};

export default ScrollToTopBtn;
