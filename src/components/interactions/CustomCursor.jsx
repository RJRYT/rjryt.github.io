import React, { useEffect, useRef, useState } from "react";

const interactiveSelector = "a, button, [role='button'], .cursor-interactive";

const CustomCursor = () => {
  const [enabled, setEnabled] = useState(false);
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const spotlightRef = useRef(null);

  useEffect(() => {
    const pointerMedia = window.matchMedia("(pointer: fine) and (min-width: 768px)");
    const motionMedia = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setEnabled(pointerMedia.matches && !motionMedia.matches);

    update();
    pointerMedia.addEventListener?.("change", update);
    motionMedia.addEventListener?.("change", update);
    return () => {
      pointerMedia.removeEventListener?.("change", update);
      motionMedia.removeEventListener?.("change", update);
    };
  }, []);

  useEffect(() => {
    if (!enabled) return undefined;

    let frameId = 0;
    let pointerX = -100;
    let pointerY = -100;
    let ringX = pointerX;
    let ringY = pointerY;
    let lastFrameTime = 0;

    document.body.classList.add("has-custom-cursor");

    const move = (event) => {
      pointerX = event.clientX;
      pointerY = event.clientY;

      if (!frameId) {
        frameId = window.requestAnimationFrame(renderCursor);
      }
    };

    const renderCursor = (time) => {
      frameId = 0;
      const elapsed = lastFrameTime ? Math.min(time - lastFrameTime, 32) : 16;
      lastFrameTime = time;
      const follow = 1 - Math.exp(-elapsed / 55);
      ringX += (pointerX - ringX) * follow;
      ringY += (pointerY - ringY) * follow;

      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${pointerX}px, ${pointerY}px, 0)`;
      }
      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ringX}px, ${ringY}px, 0)`;
      }
      if (spotlightRef.current) {
        spotlightRef.current.style.transform = `translate3d(${pointerX}px, ${pointerY}px, 0)`;
      }

      if (ringX !== pointerX || ringY !== pointerY) {
        frameId = window.requestAnimationFrame(renderCursor);
      }
    };

    const setHoverState = (event, hovering) => {
      if (!(event.target instanceof Element) || !event.target.closest(interactiveSelector)) return;
      ringRef.current?.classList.toggle("is-hovering", hovering);
    };
    const handlePointerOver = (event) => setHoverState(event, true);
    const handlePointerOut = (event) => {
      if (event.relatedTarget instanceof Element && event.relatedTarget.closest(interactiveSelector)) return;
      setHoverState(event, false);
    };

    window.addEventListener("pointermove", move, { passive: true });
    document.addEventListener("pointerover", handlePointerOver);
    document.addEventListener("pointerout", handlePointerOut);

    return () => {
      if (frameId) window.cancelAnimationFrame(frameId);
      document.body.classList.remove("has-custom-cursor");
      window.removeEventListener("pointermove", move);
      document.removeEventListener("pointerover", handlePointerOver);
      document.removeEventListener("pointerout", handlePointerOut);
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <>
      <div ref={spotlightRef} className="cursor-spotlight" aria-hidden="true" />
      <div ref={dotRef} className="cursor-dot" aria-hidden="true" />
      <div ref={ringRef} className="cursor-ring" aria-hidden="true" />
    </>
  );
};

export default CustomCursor;
