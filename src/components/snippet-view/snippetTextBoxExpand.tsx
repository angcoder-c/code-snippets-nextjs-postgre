'use client'

import clsx from "clsx";
import { useState, useRef, useEffect } from "react";

export default function SnippetTextBoxExpand({ text }: { text: string }) {
  const paragraphRef = useRef<HTMLParagraphElement>(null);
  const [isOverflowing, setIsOverflowing] = useState(false);
  const [completeContent, setCompleteContent] = useState(false);

  useEffect(() => {
    const el = paragraphRef.current;
    if (el) {
      const isOverflow = el.scrollHeight > el.clientHeight;
      setIsOverflowing(isOverflow);
    }
  }, []);

  return (
    <div
      className={clsx(
        "overflow-hidden shadow-[inset_0px_-10px_20px_-10px_black] bg-gray-900 p-3 rounded-lg border border-gray-700",
        completeContent ? "h-auto" : "max-h-30"
      )}
    >
      <p
        ref={paragraphRef}
        className={clsx(
          "text-sm text-gray-300 leading-relaxed",
          completeContent ? "" : "line-clamp-3"
        )}
      >
        {text}
      </p>
      {isOverflowing && (
          <span
          onClick={() => setCompleteContent(!completeContent)}
          className="text-blue-400 cursor-pointer"
          >
          {completeContent ? "Show less" : "See more"}
          </span>
      )}
    </div>
  );
}
