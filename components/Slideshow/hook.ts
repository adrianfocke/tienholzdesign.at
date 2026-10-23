import { useEffect, useRef, useState } from "react";

export const useSlideshow = (slideshowSettings?: {
  numberOfSlides?: number;
  numberOfSlidesShown?: number;
  nextSlideTimeout: number | null;
}) => {
  const slideshow = useRef<HTMLElement>(null);
  const activeSlideRef = useRef<number>(1);
  const [activeSlide, setActiveSlide] = useState<number>(1);
  const timeoutRef = useRef<NodeJS.Timeout | undefined>(undefined);
  const isScrollingProgrammaticallyRef = useRef<boolean>(false);

  const nextSlide = () => {
    if (!slideshowSettings?.numberOfSlides) return;

    const next =
      activeSlideRef.current === slideshowSettings.numberOfSlides
        ? 1
        : activeSlideRef.current + 1;

    scrollToSlide(next);
  };

  const scrollToSlide = (number: number) => {
    if (!slideshow.current || !slideshow.current?.offsetWidth) return;

    const numberOfSlidesShown = slideshowSettings?.numberOfSlidesShown || 1;
    const slideWidth = slideshow.current.offsetWidth / numberOfSlidesShown;

    activeSlideRef.current = number;
    setActiveSlide(number);
    isScrollingProgrammaticallyRef.current = true;

    slideshow.current.scroll({
      left: slideWidth * number - slideWidth,
      behavior: "smooth",
    });

    setTimeout(() => {
      isScrollingProgrammaticallyRef.current = false;
    }, 500);
  };

  const handleScroll = () => {
    if (!slideshow.current || isScrollingProgrammaticallyRef.current) return;

    const numberOfSlidesShown = slideshowSettings?.numberOfSlidesShown || 1;
    const slideWidth = slideshow.current.offsetWidth / numberOfSlidesShown;
    const scrollLeft = slideshow.current.scrollLeft;
    const currentSlide = Math.round(scrollLeft / slideWidth) + 1;

    if (currentSlide !== activeSlideRef.current) {
      activeSlideRef.current = currentSlide;
      setActiveSlide(currentSlide);
    }
  };

  useEffect(() => {
    const element = slideshow.current;
    if (!element) return;

    element.addEventListener("scroll", handleScroll);
    return () => element.removeEventListener("scroll", handleScroll);
  }, [slideshowSettings?.numberOfSlidesShown]);

  useEffect(() => {
    if (!slideshowSettings?.nextSlideTimeout) return;

    const scheduleNextSlide = () => {
      timeoutRef.current = setTimeout(() => {
        nextSlide();
        scheduleNextSlide();
      }, (slideshowSettings.nextSlideTimeout ?? 0) * 1000);
    };

    scheduleNextSlide();

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [
    slideshowSettings?.nextSlideTimeout,
    slideshowSettings?.numberOfSlides,
    slideshowSettings?.numberOfSlidesShown,
    slideshow.current?.offsetWidth,
  ]);

  return {
    slideshow,
    scrollToSlide,
    activeSlideRef,
    activeSlide,
  };
};

export default useSlideshow;
