import { useEffect, useRef } from "react";

export function useCarouselDrag() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const wrapperRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    const wrapper = wrapperRef.current;
    if (!container || !wrapper) return;

    // State (en closure)
    let isDragging = false;
    let startX = 0;
    let currentTranslate = 0;
    let prevTranslate = 0;
    let animationID: number;

    // Drag handlers
    function dragStart(e: MouseEvent | TouchEvent) {
      if (!wrapper) return;
      isDragging = true;
      startX = getPositionX(e);
      animationID = requestAnimationFrame(animation);
      wrapper.style.cursor = "grabbing";
    }

    function dragMove(e: MouseEvent | TouchEvent) {
      if (!isDragging) return;
      const currentX = getPositionX(e);
      const deltaX = currentX - startX;
      currentTranslate = prevTranslate + deltaX;
      // Limit left
      if (currentTranslate > 0) currentTranslate = 0;
    }

    function dragEnd() {
      if (!wrapper || !container) return;
      cancelAnimationFrame(animationID);
      isDragging = false;
      const wrapperWidth = wrapper.scrollWidth;
      const containerWidth = container.offsetWidth;
      const maxTranslate = 0;
      const minTranslate = Math.min(0, containerWidth - wrapperWidth);
      // Lock within limits
      currentTranslate = Math.max(
        Math.min(currentTranslate, maxTranslate),
        minTranslate
      );
      prevTranslate = currentTranslate;
      setWrapperPosition();
      wrapper.style.cursor = "grab";
    }

    // Mouse events
    container.addEventListener("mousedown", dragStart);
    container.addEventListener("mouseup", dragEnd);
    container.addEventListener("mouseleave", dragEnd);
    container.addEventListener("mousemove", dragMove);

    // Touch events
    container.addEventListener("touchstart", dragStart, { passive: true });
    container.addEventListener("touchend", dragEnd);
    container.addEventListener("touchmove", dragMove, { passive: false });

    // Wheel scroll
    function handleWheel(e: WheelEvent) {
      e.preventDefault();
      if (!wrapper || !container) return;
      const delta = e.deltaY || e.deltaX;
      currentTranslate -= delta;
      const wrapperWidth = wrapper.scrollWidth;
      const containerWidth = container.offsetWidth;
      const maxTranslate = 0;
      const minTranslate = Math.min(0, containerWidth - wrapperWidth);
      currentTranslate = Math.max(
        Math.min(currentTranslate, maxTranslate),
        minTranslate
      );
      prevTranslate = currentTranslate;
      setWrapperPosition();
    }
    container.addEventListener("wheel", handleWheel, { passive: false });

    // Animation frame
    function animation() {
      setWrapperPosition();
      if (isDragging) requestAnimationFrame(animation);
    }

    function setWrapperPosition() {
      if (!wrapper) return;
      wrapper.style.transform = `translateX(${currentTranslate}px)`;
    }

    function getPositionX(e: MouseEvent | TouchEvent) {
      if ("touches" in e) {
        return e.touches[0].clientX;
      } else {
        return e.pageX;
      }
    }

    // Clean-up
    return () => {
      container.removeEventListener("mousedown", dragStart);
      container.removeEventListener("mouseup", dragEnd);
      container.removeEventListener("mouseleave", dragEnd);
      container.removeEventListener("mousemove", dragMove);

      container.removeEventListener("touchstart", dragStart);
      container.removeEventListener("touchend", dragEnd);
      container.removeEventListener("touchmove", dragMove);

      container.removeEventListener("wheel", handleWheel);
    };
  }, []);

  return { containerRef, wrapperRef };
}
